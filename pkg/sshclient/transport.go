package sshclient

import (
	"errors"
	"io"
	"net"
	"sync"
	"time"
)

// Transport defines the interface for different transport mechanisms
// This allows the SSH client to work over WebSocket, TCP, or any other transport
type Transport interface {
	io.ReadWriteCloser
	// LocalAddr returns the local network address
	LocalAddr() net.Addr
	// RemoteAddr returns the remote network address
	RemoteAddr() net.Addr
	// SetDeadline sets the read and write deadlines
	SetDeadline(t time.Time) error
	// SetReadDeadline sets the read deadline
	SetReadDeadline(t time.Time) error
	// SetWriteDeadline sets the write deadline
	SetWriteDeadline(t time.Time) error
}

// JSTransport wraps JavaScript transport callbacks to implement Transport interface
type JSTransport struct {
	id          string
	onWrite     func([]byte) error
	onClose     func() error
	readBuffer  []byte
	readChan    chan []byte
	closeChan   chan struct{}
	closed      bool
	mu          sync.Mutex
	localAddr   net.Addr
	remoteAddr  net.Addr
}

// TransportAddr implements net.Addr for JS transports
type TransportAddr struct {
	network string
	address string
}

func (a *TransportAddr) Network() string {
	return a.network
}

func (a *TransportAddr) String() string {
	return a.address
}

// NewJSTransport creates a new JavaScript-backed transport
func NewJSTransport(id string, onWrite func([]byte) error, onClose func() error) *JSTransport {
	return &JSTransport{
		id:       id,
		onWrite:  onWrite,
		onClose:  onClose,
		readChan: make(chan []byte, 100),
		closeChan: make(chan struct{}),
		localAddr: &TransportAddr{
			network: "js",
			address: "browser",
		},
		remoteAddr: &TransportAddr{
			network: "js",
			address: id,
		},
	}
}

// Read reads data from the transport
func (t *JSTransport) Read(p []byte) (n int, err error) {
	t.mu.Lock()
	if t.closed {
		t.mu.Unlock()
		return 0, io.EOF
	}
	t.mu.Unlock()

	// If we have buffered data, return it first
	if len(t.readBuffer) > 0 {
		n = copy(p, t.readBuffer)
		t.readBuffer = t.readBuffer[n:]
		return n, nil
	}

	// Wait for new data or close
	select {
	case data := <-t.readChan:
		n = copy(p, data)
		if n < len(data) {
			// Buffer remaining data
			t.readBuffer = data[n:]
		}
		return n, nil
	case <-t.closeChan:
		return 0, io.EOF
	}
}

// Write writes data to the transport
func (t *JSTransport) Write(p []byte) (n int, err error) {
	t.mu.Lock()
	if t.closed {
		t.mu.Unlock()
		return 0, errors.New("transport closed")
	}
	t.mu.Unlock()

	if t.onWrite != nil {
		err = t.onWrite(p)
		if err != nil {
			return 0, err
		}
	}
	return len(p), nil
}

// Close closes the transport
func (t *JSTransport) Close() error {
	t.mu.Lock()
	if t.closed {
		t.mu.Unlock()
		return nil
	}
	t.closed = true
	t.mu.Unlock()

	close(t.closeChan)
	if t.onClose != nil {
		return t.onClose()
	}
	return nil
}

// InjectData injects data received from JavaScript into the transport
func (t *JSTransport) InjectData(data []byte) error {
	t.mu.Lock()
	if t.closed {
		t.mu.Unlock()
		return errors.New("transport closed")
	}
	t.mu.Unlock()

	select {
	case t.readChan <- data:
		return nil
	default:
		return errors.New("read buffer full")
	}
}

// LocalAddr returns the local network address
func (t *JSTransport) LocalAddr() net.Addr {
	return t.localAddr
}

// RemoteAddr returns the remote network address
func (t *JSTransport) RemoteAddr() net.Addr {
	return t.remoteAddr
}

// SetDeadline sets the read and write deadlines
func (t *JSTransport) SetDeadline(time time.Time) error {
	// Not implemented for JS transport
	return nil
}

// SetReadDeadline sets the read deadline
func (t *JSTransport) SetReadDeadline(time time.Time) error {
	// Not implemented for JS transport
	return nil
}

// SetWriteDeadline sets the write deadline
func (t *JSTransport) SetWriteDeadline(time time.Time) error {
	// Not implemented for JS transport
	return nil
}

// TransportManager manages active transports
type TransportManager struct {
	transports map[string]*JSTransport
	mu         sync.RWMutex
}

var transportManager = &TransportManager{
	transports: make(map[string]*JSTransport),
}

// RegisterTransport registers a new transport
func RegisterTransport(id string, transport *JSTransport) {
	transportManager.mu.Lock()
	defer transportManager.mu.Unlock()
	transportManager.transports[id] = transport
}

// GetTransport retrieves a transport by ID
func GetTransport(id string) (*JSTransport, bool) {
	transportManager.mu.RLock()
	defer transportManager.mu.RUnlock()
	transport, ok := transportManager.transports[id]
	return transport, ok
}

// RemoveTransport removes a transport
func RemoveTransport(id string) {
	transportManager.mu.Lock()
	defer transportManager.mu.Unlock()
	delete(transportManager.transports, id)
}