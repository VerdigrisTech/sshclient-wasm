package sshclient

import (
	"fmt"
	"sync"
	"time"

	"golang.org/x/crypto/ssh"
)

type ConnectionOptions struct {
	Host       string
	Port       int
	User       string
	Password   string
	PrivateKey string
	Timeout    int
}

type PacketCallback func(data []byte, metadata map[string]interface{})
type StateCallback func(state string)

type Client struct {
	options          ConnectionOptions
	conn             *ssh.Client
	session          *ssh.Session
	sessionID        string
	mu               sync.RWMutex
	onPacketReceive  PacketCallback
	onPacketSend     PacketCallback
	onStateChange    StateCallback
	transport        Transport
	stdin            chan []byte
	stdout           chan []byte
	shellStarted     bool
}

var (
	sessions = make(map[string]*Client)
	sessionsMu sync.RWMutex
)

func New(options ConnectionOptions) *Client {
	return &Client{
		options:   options,
		sessionID: generateSessionID(),
		stdin:     make(chan []byte, 100),
		stdout:    make(chan []byte, 100),
	}
}

// SetTransport sets the transport for the client
func (c *Client) SetTransport(transport Transport) {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.transport = transport
}

func (c *Client) OnPacketReceive(callback PacketCallback) {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.onPacketReceive = callback
}

func (c *Client) OnPacketSend(callback PacketCallback) {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.onPacketSend = callback
}

func (c *Client) OnStateChange(callback StateCallback) {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.onStateChange = callback
}

func (c *Client) Connect() (string, error) {
	c.notifyStateChange("connecting")
	
	config := &ssh.ClientConfig{
		User:            c.options.User,
		HostKeyCallback: ssh.InsecureIgnoreHostKey(),
		Timeout:         time.Duration(c.options.Timeout) * time.Second,
	}
	
	if c.options.Password != "" {
		config.Auth = append(config.Auth, ssh.Password(c.options.Password))
	}
	
	if c.options.PrivateKey != "" {
		signer, err := ssh.ParsePrivateKey([]byte(c.options.PrivateKey))
		if err != nil {
			c.notifyStateChange("error")
			return "", fmt.Errorf("failed to parse private key: %v", err)
		}
		config.Auth = append(config.Auth, ssh.PublicKeys(signer))
	}
	
	// The transport should already be set before calling Connect
	if c.transport == nil {
		c.notifyStateChange("error")
		return "", fmt.Errorf("no transport configured")
	}
	
	// Create SSH connection over the transport
	addr := fmt.Sprintf("%s:%d", c.options.Host, c.options.Port)
	
	// Wrap transport with packet interceptor
	wrappedTransport := NewInterceptedTransport(c.transport, c.onPacketSend, c.onPacketReceive)
	
	// Create SSH client connection using the transport
	sshConn, chans, reqs, err := ssh.NewClientConn(wrappedTransport, addr, config)
	if err != nil {
		c.notifyStateChange("error")
		return "", fmt.Errorf("failed to establish SSH connection: %v", err)
	}
	
	c.conn = ssh.NewClient(sshConn, chans, reqs)
	
	sessionsMu.Lock()
	sessions[c.sessionID] = c
	sessionsMu.Unlock()
	
	c.notifyStateChange("connected")
	
	return c.sessionID, nil
}

func (c *Client) StartShell() error {
	c.mu.Lock()
	defer c.mu.Unlock()
	
	if c.shellStarted {
		return nil // Shell already started
	}
	
	if c.conn == nil {
		return fmt.Errorf("not connected")
	}
	
	// Create a new session
	session, err := c.conn.NewSession()
	if err != nil {
		return fmt.Errorf("failed to create session: %v", err)
	}
	c.session = session
	
	// Set up stdin pipe
	stdin, err := session.StdinPipe()
	if err != nil {
		return fmt.Errorf("failed to create stdin pipe: %v", err)
	}
	
	// Set up stdout pipe
	stdout, err := session.StdoutPipe()
	if err != nil {
		return fmt.Errorf("failed to create stdout pipe: %v", err)
	}
	
	// Set up stderr pipe (combine with stdout)
	stderr, err := session.StderrPipe()
	if err != nil {
		return fmt.Errorf("failed to create stderr pipe: %v", err)
	}
	
	// Request pseudo terminal
	modes := ssh.TerminalModes{
		ssh.ECHO:          1,     // enable echoing
		ssh.TTY_OP_ISPEED: 14400, // input speed = 14.4kbaud
		ssh.TTY_OP_OSPEED: 14400, // output speed = 14.4kbaud
	}
	
	if err := session.RequestPty("xterm-256color", 24, 80, modes); err != nil {
		return fmt.Errorf("request for pseudo terminal failed: %v", err)
	}
	
	// Start the remote shell
	if err := session.Shell(); err != nil {
		return fmt.Errorf("failed to start shell: %v", err)
	}
	
	c.shellStarted = true
	
	// Start goroutine to handle stdin
	go func() {
		for data := range c.stdin {
			stdin.Write(data)
		}
	}()
	
	// Start goroutine to handle stdout
	go func() {
		buf := make([]byte, 1024)
		for {
			n, err := stdout.Read(buf)
			if err != nil {
				break
			}
			if n > 0 && c.onPacketReceive != nil {
				data := make([]byte, n)
				copy(data, buf[:n])
				metadata := map[string]interface{}{
					"timestamp": time.Now().Unix(),
					"type":      "data",
					"direction": "receive",
					"size":      n,
				}
				c.onPacketReceive(data, metadata)
			}
		}
	}()
	
	// Start goroutine to handle stderr
	go func() {
		buf := make([]byte, 1024)
		for {
			n, err := stderr.Read(buf)
			if err != nil {
				break
			}
			if n > 0 && c.onPacketReceive != nil {
				data := make([]byte, n)
				copy(data, buf[:n])
				metadata := map[string]interface{}{
					"timestamp": time.Now().Unix(),
					"type":      "data",
					"direction": "receive",
					"size":      n,
				}
				c.onPacketReceive(data, metadata)
			}
		}
	}()
	
	return nil
}

func (c *Client) Send(data []byte) error {
	c.mu.RLock()
	defer c.mu.RUnlock()
	
	if !c.shellStarted {
		// Start shell on first send
		c.mu.RUnlock()
		err := c.StartShell()
		c.mu.RLock()
		if err != nil {
			return err
		}
	}
	
	// Send data to stdin channel
	select {
	case c.stdin <- data:
		if c.onPacketSend != nil {
			metadata := map[string]interface{}{
				"timestamp": time.Now().Unix(),
				"type":      "data",
				"direction": "send",
				"size":      len(data),
			}
			c.onPacketSend(data, metadata)
		}
		return nil
	default:
		return fmt.Errorf("stdin buffer full")
	}
}

func (c *Client) ResizeTerminal(cols, rows int) error {
	c.mu.RLock()
	defer c.mu.RUnlock()
	
	if c.session == nil {
		return fmt.Errorf("no active session")
	}
	
	return c.session.WindowChange(rows, cols)
}

func (c *Client) Disconnect() error {
	c.notifyStateChange("disconnecting")
	
	c.mu.Lock()
	defer c.mu.Unlock()
	
	// Close stdin channel to stop goroutine
	if c.stdin != nil {
		close(c.stdin)
		c.stdin = nil
	}
	
	if c.session != nil {
		c.session.Close()
		c.session = nil
	}
	
	if c.conn != nil {
		c.conn.Close()
		c.conn = nil
	}
	
	c.shellStarted = false
	
	sessionsMu.Lock()
	delete(sessions, c.sessionID)
	sessionsMu.Unlock()
	
	c.notifyStateChange("disconnected")
	
	return nil
}

func (c *Client) notifyStateChange(state string) {
	if c.onStateChange != nil {
		c.onStateChange(state)
	}
}

func DisconnectSession(sessionID string) error {
	sessionsMu.RLock()
	client, exists := sessions[sessionID]
	sessionsMu.RUnlock()
	
	if !exists {
		return fmt.Errorf("session not found: %s", sessionID)
	}
	
	return client.Disconnect()
}

func SendToSession(sessionID string, data []byte) error {
	sessionsMu.RLock()
	client, exists := sessions[sessionID]
	sessionsMu.RUnlock()
	
	if !exists {
		return fmt.Errorf("session not found: %s", sessionID)
	}
	
	return client.Send(data)
}

func generateSessionID() string {
	return fmt.Sprintf("ssh-%d", time.Now().UnixNano())
}