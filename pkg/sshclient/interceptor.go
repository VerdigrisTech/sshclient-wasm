package sshclient

import (
	"io"
	"time"
)

// InterceptedTransport wraps a Transport to intercept packets
type InterceptedTransport struct {
	Transport
	onSend    PacketCallback
	onReceive PacketCallback
	reader    *interceptReader
	writer    *interceptWriter
}

type interceptReader struct {
	io.Reader
	onReceive PacketCallback
}

type interceptWriter struct {
	io.Writer
	onSend PacketCallback
}

// NewInterceptedTransport creates a new intercepted transport
func NewInterceptedTransport(transport Transport, onSend, onReceive PacketCallback) *InterceptedTransport {
	it := &InterceptedTransport{
		Transport: transport,
		onSend:    onSend,
		onReceive: onReceive,
	}
	it.reader = &interceptReader{
		Reader:    transport,
		onReceive: onReceive,
	}
	it.writer = &interceptWriter{
		Writer: transport,
		onSend: onSend,
	}
	return it
}

func (it *InterceptedTransport) Read(b []byte) (n int, err error) {
	n, err = it.reader.Read(b)
	return n, err
}

func (it *InterceptedTransport) Write(b []byte) (n int, err error) {
	n, err = it.writer.Write(b)
	return n, err
}

func (ir *interceptReader) Read(p []byte) (n int, err error) {
	n, err = ir.Reader.Read(p)
	if n > 0 && ir.onReceive != nil {
		data := make([]byte, n)
		copy(data, p[:n])
		
		metadata := map[string]interface{}{
			"timestamp": time.Now().Unix(),
			"direction": "receive",
			"size":      n,
		}
		
		go ir.onReceive(data, metadata)
	}
	return n, err
}

func (iw *interceptWriter) Write(p []byte) (n int, err error) {
	if iw.onSend != nil {
		data := make([]byte, len(p))
		copy(data, p)
		
		metadata := map[string]interface{}{
			"timestamp": time.Now().Unix(),
			"direction": "send",
			"size":      len(p),
		}
		
		go iw.onSend(data, metadata)
	}
	
	n, err = iw.Writer.Write(p)
	return n, err
}