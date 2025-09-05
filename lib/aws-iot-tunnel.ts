import { Transport } from './transport';
import * as protobuf from './aws-iot-tunnel/protobuf-messages';

// Get the message classes from the protobuf namespace
const ProtocolV1Message = protobuf.com.amazonaws.iot.securedtunneling.ProtocolV1Message;
const ProtocolV2Message = protobuf.com.amazonaws.iot.securedtunneling.ProtocolV2Message;
const ProtocolV3Message = protobuf.com.amazonaws.iot.securedtunneling.ProtocolV3Message;

// Type definitions for the tunnel messages
export type TunnelMessage = protobuf.com.amazonaws.iot.securedtunneling.IProtocolV1Message | 
                            protobuf.com.amazonaws.iot.securedtunneling.IProtocolV2Message | 
                            protobuf.com.amazonaws.iot.securedtunneling.IProtocolV3Message;

// Re-export message types for external use
export const TunnelMessageType = {
  UNKNOWN: 0,
  DATA: 1,
  STREAM_START: 2,
  STREAM_RESET: 3,
  SESSION_RESET: 4,
  SERVICE_IDS: 5,
  CONNECTION_START: 6,
  CONNECTION_RESET: 7,
} as const;

export type TunnelMessageTypeEnum = typeof TunnelMessageType[keyof typeof TunnelMessageType];

// AWS IoT Secure Tunnel configuration
export interface SecureTunnelConfig {
  region: string;
  accessToken: string;
  clientMode: 'source' | 'destination';
  serviceId?: string;  // Optional service identifier for multiplexed tunnels
  protocol?: 'V1' | 'V2' | 'V3';  // Protocol version
}

/**
 * AWS IoT Secure Tunnel Transport implementation
 * Handles the WebSocket connection to AWS IoT Secure Tunneling service
 * and manages the protocol-specific message framing
 */
export class SecureTunnelTransport implements Transport {
  private ws: WebSocket | null = null;
  private config: SecureTunnelConfig;
  private streamId: number = 1;
  private connectionId: number = 1;
  private isConnected: boolean = false;
  private tunnelReady: boolean = false;  // Track if tunnel handshake is complete
  private messageQueue: Uint8Array[] = [];
  private receiveBuffer: Uint8Array = new Uint8Array(0);
  private messageClass: typeof ProtocolV1Message | typeof ProtocolV2Message | typeof ProtocolV3Message;

  public id: string;
  public onData?: (data: Uint8Array) => void;
  public onError?: (error: Error) => void;
  public onClose?: () => void;

  constructor(id: string, config: SecureTunnelConfig) {
    this.id = id;
    this.config = {
      protocol: 'V2',
      ...config
    };

    // Set the appropriate message class based on protocol version
    switch (this.config.protocol) {
      case 'V1':
        this.messageClass = ProtocolV1Message;
        break;
      case 'V2':
        this.messageClass = ProtocolV2Message;
        break;
      case 'V3':
        this.messageClass = ProtocolV3Message;
        break;
      default:
        this.messageClass = ProtocolV2Message;
    }
  }

  /**
   * Connect to AWS IoT Secure Tunnel WebSocket endpoint
   */
  async connect(): Promise<void> {
    const wsUrl = this.buildWebSocketUrl();

    // Format protocol version as AWS IoT subprotocol string
    const protocolVersion = this.config.protocol || 'V2';
    const versionNumber = protocolVersion.replace('V', '');
    const subprotocol = `aws.iot.securetunneling-${versionNumber}.0`;
    console.log(`Connecting with WebSocket subprotocol: ${subprotocol}`);

    return new Promise((resolve, reject) => {
      try {
        // Pass protocol version as second argument to WebSocket constructor
        this.ws = new WebSocket(wsUrl, subprotocol);
        this.ws.binaryType = 'arraybuffer';

        this.ws.onopen = () => {
          console.log('AWS IoT Secure Tunnel WebSocket connected');
          this.isConnected = true;

          // Different message flow based on client mode
          if (this.config.clientMode === 'destination') {
            // Destination mode: Send SERVICE_IDS first if serviceId is configured
            if (this.config.serviceId) {
              console.log('Sending SERVICE_IDS message with serviceId:', this.config.serviceId);
              this.sendControlMessage(TunnelMessageType.SERVICE_IDS, {
                availableServiceIds: [this.config.serviceId]
              });
            }
            // Destination waits for STREAM_START from source
          } else {
            // Source mode: Send STREAM_START to initiate the stream
            console.log('Source mode: Sending STREAM_START with streamId:', this.streamId);
            this.sendControlMessage(TunnelMessageType.STREAM_START, {
              streamId: this.streamId,
              serviceId: this.config.serviceId
            });
          }

          // Don't process queued messages yet - wait for tunnel to be ready
          console.log('Waiting for tunnel handshake to complete...');

          resolve();
        };

        this.ws.onerror = (event) => {
          const error = new Error('WebSocket error connecting to AWS IoT Secure Tunnel');
          if (this.onError) {
            this.onError(error);
          }
          reject(error);
        };

        this.ws.onmessage = (event) => {
          if (event.data instanceof ArrayBuffer) {
            this.handleIncomingData(new Uint8Array(event.data));
          }
        };

        this.ws.onclose = (event) => {
          console.log('AWS IoT Secure Tunnel WebSocket closed', {
            code: event.code,
            reason: event.reason,
            wasClean: event.wasClean
          });
          this.isConnected = false;
          this.tunnelReady = false;
          if (this.onClose) {
            this.onClose();
          }
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Disconnect from the tunnel
   */
  async disconnect(): Promise<void> {
    if (this.ws) {
      // Send STREAM_RESET before closing
      this.sendControlMessage(TunnelMessageType.STREAM_RESET, {
        streamId: this.streamId
      });

      this.ws.close();
      this.ws = null;
    }
    this.isConnected = false;
    this.tunnelReady = false;
  }

  /**
   * Send data through the tunnel
   */
  async send(data: Uint8Array): Promise<void> {
    if (!this.isConnected || !this.ws || !this.tunnelReady) {
      // Queue the message if tunnel is not ready yet
      console.log('Queueing message, tunnel not ready. Connected:', this.isConnected, 'Ready:', this.tunnelReady);
      this.messageQueue.push(data);
      return;
    }

    this.sendDataFrame(data);
  }

  /**
   * Process queued messages once tunnel is ready
   */
  private processQueuedMessages(): void {
    console.log(`Processing ${this.messageQueue.length} queued messages`);
    while (this.messageQueue.length > 0) {
      const msg = this.messageQueue.shift();
      if (msg) {
        this.sendDataFrame(msg);
      }
    }
  }

  /**
   * Build the WebSocket URL for AWS IoT Secure Tunneling
   */
  private buildWebSocketUrl(): string {
    // AWS IoT Secure Tunneling WebSocket endpoint format
    const endpoint = `wss://data.tunneling.iot.${this.config.region}.amazonaws.com/tunnel`;

    // Check if access token exists
    if (!this.config.accessToken) {
      console.error('AWS IoT Secure Tunnel: Access token is missing or empty');
      throw new Error('Access token is required for AWS IoT Secure Tunnel connection');
    }

    // URL encode the access token
    const encodedToken = encodeURIComponent(this.config.accessToken);

    // Build the URL with query parameters
    // local-proxy-mode parameter indicates the client mode (source or destination)
    const url = `${endpoint}?local-proxy-mode=${this.config.clientMode}&access-token=${encodedToken}`;

    console.log('AWS IoT Secure Tunnel URL:', url.substring(0, 100) + '...');
    console.log('Protocol version:', this.config.protocol || 'V2');
    return url;
  }

  /**
   * Send a control message through the tunnel
   */
  private sendControlMessage(type: number, options: any = {}): void {
    const message: any = {
      type,
      ...options
    };

    console.log('Sending control message:', {
      type: this.getMessageTypeName(type),
      ...options
    });

    const encoded = this.encodeMessage(message);
    console.log('Encoded message bytes:', Array.from(encoded).map(b => b.toString(16).padStart(2, '0')).join(' '));

    this.sendFrame(encoded);
  }

  /**
   * Send a data frame through the tunnel
   */
  private sendDataFrame(data: Uint8Array): void {
    // Split data into chunks if needed (max 63KB payload)
    const maxPayloadSize = 63 * 1024;

    for (let i = 0; i < data.length; i += maxPayloadSize) {
      const chunk = data.slice(i, Math.min(i + maxPayloadSize, data.length));

      const message: any = {
        type: TunnelMessageType.DATA,
        streamId: this.streamId,
        payload: chunk
      };

      // Add serviceId for multiplexed tunnels (V2 and V3 only)
      if (this.config.serviceId && this.config.protocol !== 'V1') {
        message.serviceId = this.config.serviceId;
      }

      // Add connectionId for V3 protocol
      if (this.config.protocol === 'V3') {
        message.connectionId = this.connectionId;
      }

      console.log('Sending DATA message with:', {
        type: 'DATA',
        streamId: this.streamId,
        serviceId: this.config.serviceId,
        connectionId: this.config.protocol === 'V3' ? this.connectionId : undefined,
        payloadSize: chunk.length
      });

      const encoded = this.encodeMessage(message);
      this.sendFrame(encoded);
    }
  }

  /**
   * Send a frame with length prefix
   */
  private sendFrame(data: Uint8Array): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.warn('Cannot send frame: WebSocket not open');
      return;
    }

    // Create frame with 2-byte length prefix (big-endian)
    const frame = new Uint8Array(2 + data.length);
    const view = new DataView(frame.buffer);
    view.setUint16(0, data.length, false); // false = big-endian
    frame.set(data, 2);

    console.log('Sending frame with length:', data.length, 'Total frame size:', frame.length);
    console.log('Frame bytes (first 20):', Array.from(frame.slice(0, Math.min(20, frame.length))).map(b => b.toString(16).padStart(2, '0')).join(' '));

    this.ws.send(frame.buffer);
  }

  /**
   * Handle incoming WebSocket data
   */
  private handleIncomingData(data: Uint8Array): void {
    // Append to receive buffer
    const newBuffer = new Uint8Array(this.receiveBuffer.length + data.length);
    newBuffer.set(this.receiveBuffer);
    newBuffer.set(data, this.receiveBuffer.length);
    this.receiveBuffer = newBuffer;

    // Process complete frames
    while (this.receiveBuffer.length >= 2) {
      const view = new DataView(this.receiveBuffer.buffer, this.receiveBuffer.byteOffset);
      const frameLength = view.getUint16(0, false); // big-endian

      if (this.receiveBuffer.length < 2 + frameLength) {
        break; // Wait for more data
      }

      // Extract frame
      const frameData = this.receiveBuffer.slice(2, 2 + frameLength);
      this.receiveBuffer = this.receiveBuffer.slice(2 + frameLength);

      console.log('Received frame bytes:', Array.from(frameData).map(b => b.toString(16).padStart(2, '0')).join(' '));

      // Decode and handle message
      try {
        const message = this.decodeMessage(frameData);
        this.handleMessage(message);
      } catch (error) {
        console.error('Error decoding message:', error);
        if (this.onError) {
          this.onError(error as Error);
        }
      }
    }
  }

  /**
   * Handle a decoded tunnel message
   */
  private handleMessage(message: any): void {
    console.log('Received message:', {
      type: this.getMessageTypeName(message.type),
      streamId: message.streamId,
      connectionId: message.connectionId,
      serviceId: message.serviceId,
      availableServiceIds: message.availableServiceIds,
      payloadSize: message.payload?.length
    });

    switch (message.type) {
      case TunnelMessageType.DATA:
        // Forward data to the SSH client
        if (message.payload && this.onData) {
          this.onData(message.payload);
        }
        break;

      case TunnelMessageType.STREAM_START:
        // Stream started acknowledgment
        console.log('Stream started:', message.streamId);
        // In destination mode, store the streamId from source
        if (this.config.clientMode === 'destination' && message.streamId !== undefined && message.streamId !== null) {
          this.streamId = message.streamId;
          console.log('Destination mode: Updated streamId to', this.streamId);
          // Tunnel is ready after receiving STREAM_START in destination mode
          this.tunnelReady = true;
          this.processQueuedMessages();
        }
        break;

      case TunnelMessageType.STREAM_RESET:
        // Stream reset by remote
        console.log('Stream reset:', message.streamId);
        if (this.onClose) {
          this.onClose();
        }
        break;

      case TunnelMessageType.SESSION_RESET:
        // Session reset - close all streams
        console.log('Session reset');
        this.disconnect();
        break;

      case TunnelMessageType.SERVICE_IDS:
        // Service IDs available
        console.log('Available service IDs:', message.availableServiceIds);
        // In source mode, SERVICE_IDS response means tunnel is ready
        if (this.config.clientMode === 'source') {
          console.log('Source mode: Tunnel ready after receiving SERVICE_IDS');
          this.tunnelReady = true;
          this.processQueuedMessages();
        }
        break;

      case TunnelMessageType.CONNECTION_START:
        // V3: New connection started
        console.log('Connection started:', message.connectionId);
        break;

      case TunnelMessageType.CONNECTION_RESET:
        // V3: Connection reset
        console.log('Connection reset:', message.connectionId);
        break;
    }
  }

  /**
   * Encode a message using protobufjs
   */
  private encodeMessage(message: any): Uint8Array {
    // Create and encode the message using the appropriate protocol version
    const messageInstance = this.messageClass.create(message as any);
    const encodedMessage = this.messageClass.encode(messageInstance as any).finish();
    return encodedMessage;
  }

  /**
   * Decode a message using protobufjs
   */
  private decodeMessage(data: Uint8Array): any {
    // Decode using the appropriate protocol version
    const decodedMessage = this.messageClass.decode(data);
    return decodedMessage;
  }

  /**
   * Get message type name for logging
   */
  private getMessageTypeName(type: number): string {
    const typeNames: { [key: number]: string } = {
      0: 'UNKNOWN',
      1: 'DATA',
      2: 'STREAM_START',
      3: this.config.protocol === 'V1' ? 'STREAM_END' : 'STREAM_RESET',
      4: 'SESSION_RESET',
      5: 'SERVICE_IDS',
      6: 'CONNECTION_START',
      7: 'CONNECTION_RESET',
    };
    return typeNames[type] || `UNKNOWN_${type}`;
  }
}