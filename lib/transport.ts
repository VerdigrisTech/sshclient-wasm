export interface Transport {
  id: string;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  send(data: Uint8Array): Promise<void>;
  onData?: (data: Uint8Array) => void;
  onError?: (error: Error) => void;
  onClose?: () => void;
}

export interface TransportCallbacks {
  onWrite?: (data: Uint8Array) => void;
  onClose?: () => void;
}

/**
 * WebSocketTransport implements Transport over WebSocket
 */
export class WebSocketTransport implements Transport {
  public id: string;
  private ws: WebSocket | null = null;
  private url: string;
  private protocols?: string | string[];
  private callbacks: TransportCallbacks = {};
  
  // Callbacks for transport events
  public onData?: (data: Uint8Array) => void;
  public onError?: (error: Error) => void;
  public onClose?: () => void;

  constructor(id: string, url: string, protocols?: string | string[]) {
    this.id = id;
    this.url = url;
    this.protocols = protocols;
  }

  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.url, this.protocols);
        this.ws.binaryType = 'arraybuffer';

        this.ws.onopen = () => {
          resolve();
        };

        this.ws.onerror = (event) => {
          const error = new Error('WebSocket error');
          if (this.onError) {
            this.onError(error);
          }
          reject(error);
        };

        this.ws.onmessage = (event) => {
          if (event.data instanceof ArrayBuffer) {
            const data = new Uint8Array(event.data);
            if (this.onData) {
              this.onData(data);
            }
          }
        };

        this.ws.onclose = () => {
          if (this.onClose) {
            this.onClose();
          }
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  async disconnect(): Promise<void> {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  async send(data: Uint8Array): Promise<void> {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket is not connected');
    }
    this.ws.send(data.buffer);
  }

  setCallbacks(callbacks: TransportCallbacks): void {
    this.callbacks = callbacks;
  }
}

/**
 * CustomTransport allows implementing custom transport mechanisms
 */
export class CustomTransport implements Transport {
  public id: string;
  private isConnected = false;
  
  // Callbacks for transport events
  public onData?: (data: Uint8Array) => void;
  public onError?: (error: Error) => void;
  public onClose?: () => void;
  
  // Custom implementation callbacks
  private connectImpl?: () => Promise<void>;
  private disconnectImpl?: () => Promise<void>;
  private sendImpl?: (data: Uint8Array) => Promise<void>;

  constructor(
    id: string,
    connectImpl?: () => Promise<void>,
    disconnectImpl?: () => Promise<void>,
    sendImpl?: (data: Uint8Array) => Promise<void>
  ) {
    this.id = id;
    this.connectImpl = connectImpl;
    this.disconnectImpl = disconnectImpl;
    this.sendImpl = sendImpl;
  }

  async connect(): Promise<void> {
    if (this.connectImpl) {
      await this.connectImpl();
    }
    this.isConnected = true;
  }

  async disconnect(): Promise<void> {
    if (this.disconnectImpl) {
      await this.disconnectImpl();
    }
    this.isConnected = false;
    if (this.onClose) {
      this.onClose();
    }
  }

  async send(data: Uint8Array): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Transport is not connected');
    }
    if (this.sendImpl) {
      await this.sendImpl(data);
    }
  }

  // Method to inject received data
  injectData(data: Uint8Array): void {
    if (this.onData) {
      this.onData(data);
    }
  }
}

/**
 * TransportManager manages the bridge between JavaScript transports and WASM
 */
export class TransportManager {
  private static instance: TransportManager;
  private transports = new Map<string, Transport>();
  private wasmInstance: any;

  private constructor() {}

  static getInstance(): TransportManager {
    if (!TransportManager.instance) {
      TransportManager.instance = new TransportManager();
    }
    return TransportManager.instance;
  }

  setWasmInstance(wasmInstance: any): void {
    this.wasmInstance = wasmInstance;
  }

  async createTransport(transport: Transport): Promise<void> {
    if (!this.wasmInstance) {
      throw new Error('WASM instance not set');
    }

    console.log('Creating transport with ID:', transport.id);
    console.log('WASM instance available:', !!this.wasmInstance);
    console.log('WASM createTransport function:', typeof this.wasmInstance.createTransport);

    // Register the transport with WASM
    const callbacks = {
      onWrite: (data: Uint8Array) => {
        // Data from WASM to be sent over transport
        transport.send(data).catch(error => {
          if (transport.onError) {
            transport.onError(error);
          }
        });
      },
      onClose: () => {
        transport.disconnect().catch(console.error);
      }
    };

    try {
      const result = this.wasmInstance.createTransport(transport.id, callbacks);
      console.log('WASM createTransport result:', result);
    } catch (error) {
      console.error('Error calling WASM createTransport:', error);
      throw error;
    }
    
    // Set up data reception callback
    transport.onData = (data: Uint8Array) => {
      // Data received from transport, inject into WASM
      this.wasmInstance.injectTransportData(transport.id, data);
    };

    this.transports.set(transport.id, transport);
  }

  async closeTransport(id: string): Promise<void> {
    const transport = this.transports.get(id);
    if (transport) {
      await transport.disconnect();
      if (this.wasmInstance) {
        this.wasmInstance.closeTransport(id);
      }
      this.transports.delete(id);
    }
  }

  getTransport(id: string): Transport | undefined {
    return this.transports.get(id);
  }
}