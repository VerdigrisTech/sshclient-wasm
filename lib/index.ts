import {
  Transport,
  TransportManager,
  WebSocketTransport,
  CustomTransport,
} from "./transport";

export type { Transport } from "./transport";
export { WebSocketTransport, CustomTransport } from "./transport";
export { SecureTunnelTransport, TunnelMessageType } from "./aws-iot-tunnel";
export type { SecureTunnelConfig, TunnelMessage } from "./aws-iot-tunnel";

export interface ConnectionOptions {
  host: string;
  port: number;
  user: string;
  password?: string;
  privateKey?: string;
  timeout?: number;
}

export interface PacketMetadata {
  timestamp: number;
  direction: "send" | "receive";
  size: number;
  type?: string;
}

export interface SSHClientCallbacks {
  onPacketSend?: (data: Uint8Array, metadata: PacketMetadata) => void;
  onPacketReceive?: (data: Uint8Array, metadata: PacketMetadata) => void;
  onStateChange?: (state: SSHConnectionState) => void;
}

export interface InitializationOptions {
  wasmPath?: string;
  wasmExecPath?: string;
  autoDetect?: boolean;
  publicDir?: string;
  cacheBusting?: boolean;
  timeout?: number;
}

export type SSHConnectionState =
  | "connecting"
  | "connected"
  | "disconnecting"
  | "disconnected"
  | "error";

export interface SSHSession {
  sessionId: string;
  send: (data: Uint8Array) => Promise<void>;
  disconnect: () => Promise<void>;
  resizeTerminal: (cols: number, rows: number) => Promise<void>;
}

// Asset path detection utilities
function detectFramework(): 'nextjs' | 'vite' | 'webpack' | 'generic' {
  if (typeof window === 'undefined') return 'generic';
  
  // Check for Next.js
  if ((window as any).__NEXT_DATA__ || (window as any).next) {
    return 'nextjs';
  }
  
  // Check for Vite
  if ((window as any).__vite_plugin_react_preamble_installed__) {
    return 'vite';
  }
  
  // Check for Webpack
  if ((window as any).__webpack_require__) {
    return 'webpack';
  }
  
  return 'generic';
}

function getAssetPaths(options: InitializationOptions): { wasmPath: string; wasmExecPath: string } {
  const framework = detectFramework();
  const publicDir = options.publicDir || '/';
  
  // Use explicit paths if provided
  if (options.wasmPath && options.wasmExecPath) {
    return {
      wasmPath: options.wasmPath,
      wasmExecPath: options.wasmExecPath
    };
  }
  
  // Auto-detect based on framework
  switch (framework) {
    case 'nextjs':
      return {
        wasmPath: options.wasmPath || `${publicDir}sshclient.wasm`,
        wasmExecPath: options.wasmExecPath || `${publicDir}wasm_exec.js`
      };
    case 'vite':
      return {
        wasmPath: options.wasmPath || `${publicDir}sshclient.wasm`,
        wasmExecPath: options.wasmExecPath || `${publicDir}wasm_exec.js`
      };
    default:
      return {
        wasmPath: options.wasmPath || `${publicDir}sshclient.wasm`,
        wasmExecPath: options.wasmExecPath || `${publicDir}wasm_exec.js`
      };
  }
}

// Helper function to dynamically load wasm_exec.js
async function loadWasmExecutor(wasmExecPath: string, timeout: number = 10000): Promise<void> {
  if (typeof window === 'undefined') return; // Server-side check
  
  if ((window as any).Go) return; // Already loaded
  
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = wasmExecPath;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load wasm_exec.js from ${wasmExecPath}`));
    
    // Add timeout
    const timeoutId = setTimeout(() => {
      reject(new Error(`Timeout loading wasm_exec.js from ${wasmExecPath}`));
    }, timeout);
    
    script.onload = () => {
      clearTimeout(timeoutId);
      resolve();
    };
    
    document.head.appendChild(script);
  });
}

// Helper function to test if assets are available
async function testAssetAvailability(wasmPath: string, wasmExecPath: string): Promise<{ wasmAvailable: boolean; wasmExecAvailable: boolean }> {
  const testFetch = async (url: string): Promise<boolean> => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  };
  
  const [wasmAvailable, wasmExecAvailable] = await Promise.all([
    testFetch(wasmPath),
    testFetch(wasmExecPath)
  ]);
  
  return { wasmAvailable, wasmExecAvailable };
}

export class SSHClient {
  private static wasmInstance: any;
  private static initialized = false;
  private static transportManager = TransportManager.getInstance();

  static async initialize(options: InitializationOptions | string = {}): Promise<void> {
    if (this.initialized) {
      return;
    }

    // Handle legacy string parameter
    const initOptions: InitializationOptions = typeof options === 'string' 
      ? { wasmPath: options, autoDetect: false }
      : { autoDetect: true, cacheBusting: true, timeout: 10000, ...options };

    try {
      // Get asset paths using auto-detection or explicit options
      const { wasmPath, wasmExecPath } = getAssetPaths(initOptions);

      // Test asset availability if auto-detection is enabled
      if (initOptions.autoDetect) {
        const { wasmAvailable, wasmExecAvailable } = await testAssetAvailability(wasmPath, wasmExecPath);
        
        if (!wasmAvailable) {
          throw new Error(`WASM file not found at ${wasmPath}. Please ensure sshclient.wasm is in your public directory.`);
        }
        
        if (!wasmExecAvailable) {
          throw new Error(`wasm_exec.js not found at ${wasmExecPath}. Please ensure wasm_exec.js is in your public directory.`);
        }
      }

      // Load wasm_exec.js dynamically
      await loadWasmExecutor(wasmExecPath, initOptions.timeout);

      // Check if Go runtime is available
      if (typeof (window as any).Go === "undefined") {
        throw new Error(
          `Go runtime not loaded. Failed to load wasm_exec.js from ${wasmExecPath}.`
        );
      }

      const go = new (window as any).Go();
      
      // Prepare fetch URL with optional cache busting
      let fetchUrl = wasmPath;
      if (initOptions.cacheBusting) {
        const cacheBuster = `?v=${Date.now()}&t=${new Date().getTime()}`;
        fetchUrl += cacheBuster;
      }

      const fetchOptions: RequestInit = initOptions.cacheBusting 
        ? {
            cache: "no-cache",
            headers: {
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
            },
          }
        : {};

      const response = await fetch(fetchUrl, fetchOptions);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch WASM file: ${response.status} ${response.statusText}`);
      }
      
      const buffer = await response.arrayBuffer();
      const result = await WebAssembly.instantiate(buffer, go.importObject);

      go.run(result.instance);

      // Wait a bit for WASM to initialize
      await new Promise((resolve) => setTimeout(resolve, 100));

      this.wasmInstance = (window as any).SSHClient;

      if (!this.wasmInstance) {
        throw new Error(
          "Failed to initialize WASM module - SSHClient not found on window. The WASM module may not have loaded correctly."
        );
      }

      this.transportManager.setWasmInstance(this.wasmInstance);
      this.initialized = true;

      // Optional: Log version in development mode
      if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
        console.log(`SSHClient WASM initialized successfully`);
        if (this.wasmInstance.version) {
          console.log(`Version: ${this.wasmInstance.version()}`);
        }
      }

    } catch (error) {
      this.initialized = false;
      
      // Provide helpful error messages
      if (error instanceof Error) {
        throw new Error(`SSHClient initialization failed: ${error.message}`);
      } else {
        throw new Error('SSHClient initialization failed with unknown error');
      }
    }
  }

  static async connect(
    options: ConnectionOptions,
    transport: Transport,
    callbacks?: SSHClientCallbacks
  ): Promise<SSHSession> {
    if (!this.initialized) {
      throw new Error("SSHClient not initialized. Call initialize() first.");
    }

    // Set up the transport
    await this.transportManager.createTransport(transport);

    // Connect the transport
    await transport.connect();

    const jsCallbacks = callbacks
      ? {
          onPacketSend: (data: any, metadata: any) => {
            if (callbacks.onPacketSend) {
              // Data is already a Uint8Array from WASM
              callbacks.onPacketSend(data, metadata);
            }
          },
          onPacketReceive: (data: any, metadata: any) => {
            if (callbacks.onPacketReceive) {
              // Data is already a Uint8Array from WASM
              callbacks.onPacketReceive(data, metadata);
            }
          },
          onStateChange: callbacks.onStateChange,
        }
      : undefined;

    // Pass transport ID to WASM
    const session = await this.wasmInstance.connect(
      options,
      transport.id,
      jsCallbacks
    );

    return {
      sessionId: session.sessionId,
      send: async (data: Uint8Array) => {
        await session.send(data);
      },
      disconnect: async () => {
        await session.disconnect();
        await this.transportManager.closeTransport(transport.id);
      },
      resizeTerminal: async (cols: number, rows: number) => {
        await session.resizeTerminal(cols, rows);
      },
    };
  }

  static async disconnect(sessionId: string): Promise<void> {
    if (!this.initialized) {
      throw new Error("SSHClient not initialized");
    }

    await this.wasmInstance.disconnect(sessionId);
  }

  static async send(sessionId: string, data: Uint8Array): Promise<void> {
    if (!this.initialized) {
      throw new Error("SSHClient not initialized");
    }

    await this.wasmInstance.send(sessionId, data);
  }

  static getVersion(): string {
    if (!this.initialized) {
      throw new Error("SSHClient not initialized");
    }

    return this.wasmInstance.version();
  }
}

export class PacketTransformer {
  static toProtobuf(data: Uint8Array, schema?: any): Uint8Array {
    // Placeholder for protobuf encoding
    // Users can implement their own transformation logic
    return data;
  }

  static fromProtobuf(data: Uint8Array, schema?: any): Uint8Array {
    // Placeholder for protobuf decoding
    // Users can implement their own transformation logic
    return data;
  }

  static toBase64(data: Uint8Array): string {
    return btoa(String.fromCharCode(...data));
  }

  static fromBase64(base64: string): Uint8Array {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }
}

// Framework-specific helpers
export const SSHClientHelpers = {
  /**
   * Get recommended asset paths for the detected framework
   */
  getAssetPaths: (publicDir = '/') => getAssetPaths({ publicDir }),

  /**
   * Detect the current framework
   */
  detectFramework,

  /**
   * Test if WASM assets are available at the given paths
   */
  testAssetAvailability,

  /**
   * Next.js specific initialization helper
   */
  initializeForNextJS: async (options: Partial<InitializationOptions> = {}) => {
    return SSHClient.initialize({
      publicDir: '/',
      autoDetect: true,
      cacheBusting: process.env.NODE_ENV === 'development',
      ...options
    });
  },

  /**
   * Vite specific initialization helper
   */
  initializeForVite: async (options: Partial<InitializationOptions> = {}) => {
    // Safe import.meta.env access - avoid TypeScript errors by using try/catch
    let isDev = false;
    try {
      // This will work in Vite environments where import.meta.env is available
      isDev = (globalThis as any).import?.meta?.env?.DEV === true;
    } catch {
      // Fallback or in non-Vite environments
      isDev = false;
    }

    return SSHClient.initialize({
      publicDir: '/',
      autoDetect: true,
      cacheBusting: isDev,
      ...options
    });
  },

  /**
   * Generic initialization with sensible defaults
   */
  initializeWithDefaults: async (customOptions: Partial<InitializationOptions> = {}) => {
    const defaultOptions: InitializationOptions = {
      autoDetect: true,
      cacheBusting: true,
      timeout: 10000,
      publicDir: '/'
    };

    return SSHClient.initialize({ ...defaultOptions, ...customOptions });
  }
};

export default SSHClient;
