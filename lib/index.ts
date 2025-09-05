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
}

export class SSHClient {
  private static wasmInstance: any;
  private static initialized = false;
  private static transportManager = TransportManager.getInstance();

  static async initialize(wasmPath: string = "/sshclient.wasm"): Promise<void> {
    if (this.initialized) {
      return;
    }

    // Check if Go runtime is available
    if (typeof (window as any).Go === "undefined") {
      throw new Error(
        "Go runtime not loaded. Make sure wasm_exec.js is loaded before initializing SSHClient."
      );
    }

    const go = new (window as any).Go();
    // Add cache-busting parameter to force reload during development
    // Use a timestamp to ensure we always get the latest version
    const cacheBuster = `?v=${Date.now()}&t=${new Date().getTime()}`;
    const response = await fetch(wasmPath + cacheBuster, {
      cache: "no-cache",
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    });
    const buffer = await response.arrayBuffer();
    const result = await WebAssembly.instantiate(buffer, go.importObject);

    go.run(result.instance);

    // Wait a bit for WASM to initialize
    await new Promise((resolve) => setTimeout(resolve, 100));

    this.wasmInstance = (window as any).SSHClient;
    console.log("WASM instance after initialization:", this.wasmInstance);
    console.log("WASM functions:", Object.keys(this.wasmInstance || {}));

    // Log version to verify we have the right WASM
    if (this.wasmInstance && this.wasmInstance.version) {
      console.log("WASM version check:", this.wasmInstance.version());
    }

    if (!this.wasmInstance) {
      throw new Error(
        "Failed to initialize WASM module - SSHClient not found on window"
      );
    }

    this.transportManager.setWasmInstance(this.wasmInstance);
    this.initialized = true;
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

export default SSHClient;
