import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace com. */
export namespace com {

    /** Namespace amazonaws. */
    namespace amazonaws {

        /** Namespace iot. */
        namespace iot {

            /** Namespace securedtunneling. */
            namespace securedtunneling {

                /** Properties of a ProtocolV1Message. */
                interface IProtocolV1Message {

                    /** ProtocolV1Message type */
                    type?: (com.amazonaws.iot.securedtunneling.ProtocolV1Message.Type|null);

                    /** ProtocolV1Message streamId */
                    streamId?: (number|null);

                    /** ProtocolV1Message ignorable */
                    ignorable?: (boolean|null);

                    /** ProtocolV1Message payload */
                    payload?: (Uint8Array|null);
                }

                /** Represents a ProtocolV1Message. */
                class ProtocolV1Message implements IProtocolV1Message {

                    /**
                     * Constructs a new ProtocolV1Message.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: com.amazonaws.iot.securedtunneling.IProtocolV1Message);

                    /** ProtocolV1Message type. */
                    public type: com.amazonaws.iot.securedtunneling.ProtocolV1Message.Type;

                    /** ProtocolV1Message streamId. */
                    public streamId: number;

                    /** ProtocolV1Message ignorable. */
                    public ignorable: boolean;

                    /** ProtocolV1Message payload. */
                    public payload: Uint8Array;

                    /**
                     * Creates a new ProtocolV1Message instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ProtocolV1Message instance
                     */
                    public static create(properties?: com.amazonaws.iot.securedtunneling.IProtocolV1Message): com.amazonaws.iot.securedtunneling.ProtocolV1Message;

                    /**
                     * Encodes the specified ProtocolV1Message message. Does not implicitly {@link com.amazonaws.iot.securedtunneling.ProtocolV1Message.verify|verify} messages.
                     * @param message ProtocolV1Message message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: com.amazonaws.iot.securedtunneling.IProtocolV1Message, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ProtocolV1Message message, length delimited. Does not implicitly {@link com.amazonaws.iot.securedtunneling.ProtocolV1Message.verify|verify} messages.
                     * @param message ProtocolV1Message message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: com.amazonaws.iot.securedtunneling.IProtocolV1Message, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ProtocolV1Message message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ProtocolV1Message
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.amazonaws.iot.securedtunneling.ProtocolV1Message;

                    /**
                     * Decodes a ProtocolV1Message message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ProtocolV1Message
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.amazonaws.iot.securedtunneling.ProtocolV1Message;

                    /**
                     * Verifies a ProtocolV1Message message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a ProtocolV1Message message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ProtocolV1Message
                     */
                    public static fromObject(object: { [k: string]: any }): com.amazonaws.iot.securedtunneling.ProtocolV1Message;

                    /**
                     * Creates a plain object from a ProtocolV1Message message. Also converts values to other types if specified.
                     * @param message ProtocolV1Message
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: com.amazonaws.iot.securedtunneling.ProtocolV1Message, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ProtocolV1Message to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for ProtocolV1Message
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                namespace ProtocolV1Message {

                    /** Type enum. */
                    enum Type {
                        UNKNOWN = 0,
                        DATA = 1,
                        STREAM_START = 2,
                        STREAM_END = 3
                    }
                }

                /** Properties of a ProtocolV2Message. */
                interface IProtocolV2Message {

                    /** ProtocolV2Message type */
                    type?: (com.amazonaws.iot.securedtunneling.ProtocolV2Message.Type|null);

                    /** ProtocolV2Message streamId */
                    streamId?: (number|null);

                    /** ProtocolV2Message ignorable */
                    ignorable?: (boolean|null);

                    /** ProtocolV2Message payload */
                    payload?: (Uint8Array|null);

                    /** ProtocolV2Message serviceId */
                    serviceId?: (string|null);

                    /** ProtocolV2Message availableServiceIds */
                    availableServiceIds?: (string[]|null);
                }

                /** Represents a ProtocolV2Message. */
                class ProtocolV2Message implements IProtocolV2Message {

                    /**
                     * Constructs a new ProtocolV2Message.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: com.amazonaws.iot.securedtunneling.IProtocolV2Message);

                    /** ProtocolV2Message type. */
                    public type: com.amazonaws.iot.securedtunneling.ProtocolV2Message.Type;

                    /** ProtocolV2Message streamId. */
                    public streamId: number;

                    /** ProtocolV2Message ignorable. */
                    public ignorable: boolean;

                    /** ProtocolV2Message payload. */
                    public payload: Uint8Array;

                    /** ProtocolV2Message serviceId. */
                    public serviceId: string;

                    /** ProtocolV2Message availableServiceIds. */
                    public availableServiceIds: string[];

                    /**
                     * Creates a new ProtocolV2Message instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ProtocolV2Message instance
                     */
                    public static create(properties?: com.amazonaws.iot.securedtunneling.IProtocolV2Message): com.amazonaws.iot.securedtunneling.ProtocolV2Message;

                    /**
                     * Encodes the specified ProtocolV2Message message. Does not implicitly {@link com.amazonaws.iot.securedtunneling.ProtocolV2Message.verify|verify} messages.
                     * @param message ProtocolV2Message message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: com.amazonaws.iot.securedtunneling.IProtocolV2Message, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ProtocolV2Message message, length delimited. Does not implicitly {@link com.amazonaws.iot.securedtunneling.ProtocolV2Message.verify|verify} messages.
                     * @param message ProtocolV2Message message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: com.amazonaws.iot.securedtunneling.IProtocolV2Message, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ProtocolV2Message message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ProtocolV2Message
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.amazonaws.iot.securedtunneling.ProtocolV2Message;

                    /**
                     * Decodes a ProtocolV2Message message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ProtocolV2Message
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.amazonaws.iot.securedtunneling.ProtocolV2Message;

                    /**
                     * Verifies a ProtocolV2Message message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a ProtocolV2Message message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ProtocolV2Message
                     */
                    public static fromObject(object: { [k: string]: any }): com.amazonaws.iot.securedtunneling.ProtocolV2Message;

                    /**
                     * Creates a plain object from a ProtocolV2Message message. Also converts values to other types if specified.
                     * @param message ProtocolV2Message
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: com.amazonaws.iot.securedtunneling.ProtocolV2Message, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ProtocolV2Message to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for ProtocolV2Message
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                namespace ProtocolV2Message {

                    /** Type enum. */
                    enum Type {
                        UNKNOWN = 0,
                        DATA = 1,
                        STREAM_START = 2,
                        STREAM_RESET = 3,
                        SESSION_RESET = 4,
                        SERVICE_IDS = 5
                    }
                }

                /** Properties of a ProtocolV3Message. */
                interface IProtocolV3Message {

                    /** ProtocolV3Message type */
                    type?: (com.amazonaws.iot.securedtunneling.ProtocolV3Message.Type|null);

                    /** ProtocolV3Message streamId */
                    streamId?: (number|null);

                    /** ProtocolV3Message ignorable */
                    ignorable?: (boolean|null);

                    /** ProtocolV3Message payload */
                    payload?: (Uint8Array|null);

                    /** ProtocolV3Message serviceId */
                    serviceId?: (string|null);

                    /** ProtocolV3Message availableServiceIds */
                    availableServiceIds?: (string[]|null);

                    /** ProtocolV3Message connectionId */
                    connectionId?: (number|null);
                }

                /** Represents a ProtocolV3Message. */
                class ProtocolV3Message implements IProtocolV3Message {

                    /**
                     * Constructs a new ProtocolV3Message.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: com.amazonaws.iot.securedtunneling.IProtocolV3Message);

                    /** ProtocolV3Message type. */
                    public type: com.amazonaws.iot.securedtunneling.ProtocolV3Message.Type;

                    /** ProtocolV3Message streamId. */
                    public streamId: number;

                    /** ProtocolV3Message ignorable. */
                    public ignorable: boolean;

                    /** ProtocolV3Message payload. */
                    public payload: Uint8Array;

                    /** ProtocolV3Message serviceId. */
                    public serviceId: string;

                    /** ProtocolV3Message availableServiceIds. */
                    public availableServiceIds: string[];

                    /** ProtocolV3Message connectionId. */
                    public connectionId: number;

                    /**
                     * Creates a new ProtocolV3Message instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ProtocolV3Message instance
                     */
                    public static create(properties?: com.amazonaws.iot.securedtunneling.IProtocolV3Message): com.amazonaws.iot.securedtunneling.ProtocolV3Message;

                    /**
                     * Encodes the specified ProtocolV3Message message. Does not implicitly {@link com.amazonaws.iot.securedtunneling.ProtocolV3Message.verify|verify} messages.
                     * @param message ProtocolV3Message message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: com.amazonaws.iot.securedtunneling.IProtocolV3Message, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ProtocolV3Message message, length delimited. Does not implicitly {@link com.amazonaws.iot.securedtunneling.ProtocolV3Message.verify|verify} messages.
                     * @param message ProtocolV3Message message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: com.amazonaws.iot.securedtunneling.IProtocolV3Message, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ProtocolV3Message message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ProtocolV3Message
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.amazonaws.iot.securedtunneling.ProtocolV3Message;

                    /**
                     * Decodes a ProtocolV3Message message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ProtocolV3Message
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.amazonaws.iot.securedtunneling.ProtocolV3Message;

                    /**
                     * Verifies a ProtocolV3Message message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a ProtocolV3Message message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ProtocolV3Message
                     */
                    public static fromObject(object: { [k: string]: any }): com.amazonaws.iot.securedtunneling.ProtocolV3Message;

                    /**
                     * Creates a plain object from a ProtocolV3Message message. Also converts values to other types if specified.
                     * @param message ProtocolV3Message
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: com.amazonaws.iot.securedtunneling.ProtocolV3Message, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ProtocolV3Message to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for ProtocolV3Message
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                namespace ProtocolV3Message {

                    /** Type enum. */
                    enum Type {
                        UNKNOWN = 0,
                        DATA = 1,
                        STREAM_START = 2,
                        STREAM_RESET = 3,
                        SESSION_RESET = 4,
                        SERVICE_IDS = 5,
                        CONNECTION_START = 6,
                        CONNECTION_RESET = 7
                    }
                }
            }
        }
    }
}
