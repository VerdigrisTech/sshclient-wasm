import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace tunnel. */
export namespace tunnel {

    /** TunnelMessageType enum. */
    enum TunnelMessageType {
        UNKNOWN = 0,
        DATA = 1,
        STREAM_START = 2,
        STREAM_RESET = 3,
        SESSION_RESET = 4,
        SERVICE_IDS = 5,
        CONNECTION_START = 6,
        CONNECTION_RESET = 7
    }

    /** Properties of a TunnelMessage. */
    interface ITunnelMessage {

        /** TunnelMessage type */
        type?: (tunnel.TunnelMessageType|null);

        /** TunnelMessage streamId */
        streamId?: (number|null);

        /** TunnelMessage connectionId */
        connectionId?: (number|null);

        /** TunnelMessage ignorable */
        ignorable?: (boolean|null);

        /** TunnelMessage payload */
        payload?: (Uint8Array|null);

        /** TunnelMessage serviceId */
        serviceId?: (string|null);

        /** TunnelMessage availableServiceIds */
        availableServiceIds?: (string[]|null);
    }

    /** Represents a TunnelMessage. */
    class TunnelMessage implements ITunnelMessage {

        /**
         * Constructs a new TunnelMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: tunnel.ITunnelMessage);

        /** TunnelMessage type. */
        public type: tunnel.TunnelMessageType;

        /** TunnelMessage streamId. */
        public streamId?: (number|null);

        /** TunnelMessage connectionId. */
        public connectionId?: (number|null);

        /** TunnelMessage ignorable. */
        public ignorable?: (boolean|null);

        /** TunnelMessage payload. */
        public payload?: (Uint8Array|null);

        /** TunnelMessage serviceId. */
        public serviceId?: (string|null);

        /** TunnelMessage availableServiceIds. */
        public availableServiceIds: string[];

        /** TunnelMessage _streamId. */
        public _streamId?: "streamId";

        /** TunnelMessage _connectionId. */
        public _connectionId?: "connectionId";

        /** TunnelMessage _ignorable. */
        public _ignorable?: "ignorable";

        /** TunnelMessage _payload. */
        public _payload?: "payload";

        /** TunnelMessage _serviceId. */
        public _serviceId?: "serviceId";

        /**
         * Creates a new TunnelMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TunnelMessage instance
         */
        public static create(properties?: tunnel.ITunnelMessage): tunnel.TunnelMessage;

        /**
         * Encodes the specified TunnelMessage message. Does not implicitly {@link tunnel.TunnelMessage.verify|verify} messages.
         * @param message TunnelMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: tunnel.ITunnelMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TunnelMessage message, length delimited. Does not implicitly {@link tunnel.TunnelMessage.verify|verify} messages.
         * @param message TunnelMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: tunnel.ITunnelMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TunnelMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TunnelMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tunnel.TunnelMessage;

        /**
         * Decodes a TunnelMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TunnelMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tunnel.TunnelMessage;

        /**
         * Verifies a TunnelMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TunnelMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TunnelMessage
         */
        public static fromObject(object: { [k: string]: any }): tunnel.TunnelMessage;

        /**
         * Creates a plain object from a TunnelMessage message. Also converts values to other types if specified.
         * @param message TunnelMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: tunnel.TunnelMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TunnelMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for TunnelMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
