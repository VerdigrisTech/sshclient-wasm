/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const com = $root.com = (() => {

    /**
     * Namespace com.
     * @exports com
     * @namespace
     */
    const com = {};

    com.amazonaws = (function() {

        /**
         * Namespace amazonaws.
         * @memberof com
         * @namespace
         */
        const amazonaws = {};

        amazonaws.iot = (function() {

            /**
             * Namespace iot.
             * @memberof com.amazonaws
             * @namespace
             */
            const iot = {};

            iot.securedtunneling = (function() {

                /**
                 * Namespace securedtunneling.
                 * @memberof com.amazonaws.iot
                 * @namespace
                 */
                const securedtunneling = {};

                securedtunneling.ProtocolV1Message = (function() {

                    /**
                     * Properties of a ProtocolV1Message.
                     * @memberof com.amazonaws.iot.securedtunneling
                     * @interface IProtocolV1Message
                     * @property {com.amazonaws.iot.securedtunneling.ProtocolV1Message.Type|null} [type] ProtocolV1Message type
                     * @property {number|null} [streamId] ProtocolV1Message streamId
                     * @property {boolean|null} [ignorable] ProtocolV1Message ignorable
                     * @property {Uint8Array|null} [payload] ProtocolV1Message payload
                     */

                    /**
                     * Constructs a new ProtocolV1Message.
                     * @memberof com.amazonaws.iot.securedtunneling
                     * @classdesc Represents a ProtocolV1Message.
                     * @implements IProtocolV1Message
                     * @constructor
                     * @param {com.amazonaws.iot.securedtunneling.IProtocolV1Message=} [properties] Properties to set
                     */
                    function ProtocolV1Message(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * ProtocolV1Message type.
                     * @member {com.amazonaws.iot.securedtunneling.ProtocolV1Message.Type} type
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV1Message
                     * @instance
                     */
                    ProtocolV1Message.prototype.type = 0;

                    /**
                     * ProtocolV1Message streamId.
                     * @member {number} streamId
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV1Message
                     * @instance
                     */
                    ProtocolV1Message.prototype.streamId = 0;

                    /**
                     * ProtocolV1Message ignorable.
                     * @member {boolean} ignorable
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV1Message
                     * @instance
                     */
                    ProtocolV1Message.prototype.ignorable = false;

                    /**
                     * ProtocolV1Message payload.
                     * @member {Uint8Array} payload
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV1Message
                     * @instance
                     */
                    ProtocolV1Message.prototype.payload = $util.newBuffer([]);

                    /**
                     * Creates a new ProtocolV1Message instance using the specified properties.
                     * @function create
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV1Message
                     * @static
                     * @param {com.amazonaws.iot.securedtunneling.IProtocolV1Message=} [properties] Properties to set
                     * @returns {com.amazonaws.iot.securedtunneling.ProtocolV1Message} ProtocolV1Message instance
                     */
                    ProtocolV1Message.create = function create(properties) {
                        return new ProtocolV1Message(properties);
                    };

                    /**
                     * Encodes the specified ProtocolV1Message message. Does not implicitly {@link com.amazonaws.iot.securedtunneling.ProtocolV1Message.verify|verify} messages.
                     * @function encode
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV1Message
                     * @static
                     * @param {com.amazonaws.iot.securedtunneling.IProtocolV1Message} message ProtocolV1Message message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ProtocolV1Message.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
                        if (message.streamId != null && Object.hasOwnProperty.call(message, "streamId"))
                            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.streamId);
                        if (message.ignorable != null && Object.hasOwnProperty.call(message, "ignorable"))
                            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.ignorable);
                        if (message.payload != null && Object.hasOwnProperty.call(message, "payload"))
                            writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.payload);
                        return writer;
                    };

                    /**
                     * Encodes the specified ProtocolV1Message message, length delimited. Does not implicitly {@link com.amazonaws.iot.securedtunneling.ProtocolV1Message.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV1Message
                     * @static
                     * @param {com.amazonaws.iot.securedtunneling.IProtocolV1Message} message ProtocolV1Message message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ProtocolV1Message.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a ProtocolV1Message message from the specified reader or buffer.
                     * @function decode
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV1Message
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {com.amazonaws.iot.securedtunneling.ProtocolV1Message} ProtocolV1Message
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ProtocolV1Message.decode = function decode(reader, length, error) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.amazonaws.iot.securedtunneling.ProtocolV1Message();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            if (tag === error)
                                break;
                            switch (tag >>> 3) {
                            case 1: {
                                    message.type = reader.int32();
                                    break;
                                }
                            case 2: {
                                    message.streamId = reader.int32();
                                    break;
                                }
                            case 3: {
                                    message.ignorable = reader.bool();
                                    break;
                                }
                            case 4: {
                                    message.payload = reader.bytes();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a ProtocolV1Message message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV1Message
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {com.amazonaws.iot.securedtunneling.ProtocolV1Message} ProtocolV1Message
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ProtocolV1Message.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a ProtocolV1Message message.
                     * @function verify
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV1Message
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    ProtocolV1Message.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.type != null && message.hasOwnProperty("type"))
                            switch (message.type) {
                            default:
                                return "type: enum value expected";
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                                break;
                            }
                        if (message.streamId != null && message.hasOwnProperty("streamId"))
                            if (!$util.isInteger(message.streamId))
                                return "streamId: integer expected";
                        if (message.ignorable != null && message.hasOwnProperty("ignorable"))
                            if (typeof message.ignorable !== "boolean")
                                return "ignorable: boolean expected";
                        if (message.payload != null && message.hasOwnProperty("payload"))
                            if (!(message.payload && typeof message.payload.length === "number" || $util.isString(message.payload)))
                                return "payload: buffer expected";
                        return null;
                    };

                    /**
                     * Creates a ProtocolV1Message message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV1Message
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {com.amazonaws.iot.securedtunneling.ProtocolV1Message} ProtocolV1Message
                     */
                    ProtocolV1Message.fromObject = function fromObject(object) {
                        if (object instanceof $root.com.amazonaws.iot.securedtunneling.ProtocolV1Message)
                            return object;
                        let message = new $root.com.amazonaws.iot.securedtunneling.ProtocolV1Message();
                        switch (object.type) {
                        default:
                            if (typeof object.type === "number") {
                                message.type = object.type;
                                break;
                            }
                            break;
                        case "UNKNOWN":
                        case 0:
                            message.type = 0;
                            break;
                        case "DATA":
                        case 1:
                            message.type = 1;
                            break;
                        case "STREAM_START":
                        case 2:
                            message.type = 2;
                            break;
                        case "STREAM_END":
                        case 3:
                            message.type = 3;
                            break;
                        }
                        if (object.streamId != null)
                            message.streamId = object.streamId | 0;
                        if (object.ignorable != null)
                            message.ignorable = Boolean(object.ignorable);
                        if (object.payload != null)
                            if (typeof object.payload === "string")
                                $util.base64.decode(object.payload, message.payload = $util.newBuffer($util.base64.length(object.payload)), 0);
                            else if (object.payload.length >= 0)
                                message.payload = object.payload;
                        return message;
                    };

                    /**
                     * Creates a plain object from a ProtocolV1Message message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV1Message
                     * @static
                     * @param {com.amazonaws.iot.securedtunneling.ProtocolV1Message} message ProtocolV1Message
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    ProtocolV1Message.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.type = options.enums === String ? "UNKNOWN" : 0;
                            object.streamId = 0;
                            object.ignorable = false;
                            if (options.bytes === String)
                                object.payload = "";
                            else {
                                object.payload = [];
                                if (options.bytes !== Array)
                                    object.payload = $util.newBuffer(object.payload);
                            }
                        }
                        if (message.type != null && message.hasOwnProperty("type"))
                            object.type = options.enums === String ? $root.com.amazonaws.iot.securedtunneling.ProtocolV1Message.Type[message.type] === undefined ? message.type : $root.com.amazonaws.iot.securedtunneling.ProtocolV1Message.Type[message.type] : message.type;
                        if (message.streamId != null && message.hasOwnProperty("streamId"))
                            object.streamId = message.streamId;
                        if (message.ignorable != null && message.hasOwnProperty("ignorable"))
                            object.ignorable = message.ignorable;
                        if (message.payload != null && message.hasOwnProperty("payload"))
                            object.payload = options.bytes === String ? $util.base64.encode(message.payload, 0, message.payload.length) : options.bytes === Array ? Array.prototype.slice.call(message.payload) : message.payload;
                        return object;
                    };

                    /**
                     * Converts this ProtocolV1Message to JSON.
                     * @function toJSON
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV1Message
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    ProtocolV1Message.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the default type url for ProtocolV1Message
                     * @function getTypeUrl
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV1Message
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    ProtocolV1Message.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/com.amazonaws.iot.securedtunneling.ProtocolV1Message";
                    };

                    /**
                     * Type enum.
                     * @name com.amazonaws.iot.securedtunneling.ProtocolV1Message.Type
                     * @enum {number}
                     * @property {number} UNKNOWN=0 UNKNOWN value
                     * @property {number} DATA=1 DATA value
                     * @property {number} STREAM_START=2 STREAM_START value
                     * @property {number} STREAM_END=3 STREAM_END value
                     */
                    ProtocolV1Message.Type = (function() {
                        const valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "UNKNOWN"] = 0;
                        values[valuesById[1] = "DATA"] = 1;
                        values[valuesById[2] = "STREAM_START"] = 2;
                        values[valuesById[3] = "STREAM_END"] = 3;
                        return values;
                    })();

                    return ProtocolV1Message;
                })();

                securedtunneling.ProtocolV2Message = (function() {

                    /**
                     * Properties of a ProtocolV2Message.
                     * @memberof com.amazonaws.iot.securedtunneling
                     * @interface IProtocolV2Message
                     * @property {com.amazonaws.iot.securedtunneling.ProtocolV2Message.Type|null} [type] ProtocolV2Message type
                     * @property {number|null} [streamId] ProtocolV2Message streamId
                     * @property {boolean|null} [ignorable] ProtocolV2Message ignorable
                     * @property {Uint8Array|null} [payload] ProtocolV2Message payload
                     * @property {string|null} [serviceId] ProtocolV2Message serviceId
                     * @property {Array.<string>|null} [availableServiceIds] ProtocolV2Message availableServiceIds
                     */

                    /**
                     * Constructs a new ProtocolV2Message.
                     * @memberof com.amazonaws.iot.securedtunneling
                     * @classdesc Represents a ProtocolV2Message.
                     * @implements IProtocolV2Message
                     * @constructor
                     * @param {com.amazonaws.iot.securedtunneling.IProtocolV2Message=} [properties] Properties to set
                     */
                    function ProtocolV2Message(properties) {
                        this.availableServiceIds = [];
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * ProtocolV2Message type.
                     * @member {com.amazonaws.iot.securedtunneling.ProtocolV2Message.Type} type
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV2Message
                     * @instance
                     */
                    ProtocolV2Message.prototype.type = 0;

                    /**
                     * ProtocolV2Message streamId.
                     * @member {number} streamId
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV2Message
                     * @instance
                     */
                    ProtocolV2Message.prototype.streamId = 0;

                    /**
                     * ProtocolV2Message ignorable.
                     * @member {boolean} ignorable
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV2Message
                     * @instance
                     */
                    ProtocolV2Message.prototype.ignorable = false;

                    /**
                     * ProtocolV2Message payload.
                     * @member {Uint8Array} payload
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV2Message
                     * @instance
                     */
                    ProtocolV2Message.prototype.payload = $util.newBuffer([]);

                    /**
                     * ProtocolV2Message serviceId.
                     * @member {string} serviceId
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV2Message
                     * @instance
                     */
                    ProtocolV2Message.prototype.serviceId = "";

                    /**
                     * ProtocolV2Message availableServiceIds.
                     * @member {Array.<string>} availableServiceIds
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV2Message
                     * @instance
                     */
                    ProtocolV2Message.prototype.availableServiceIds = $util.emptyArray;

                    /**
                     * Creates a new ProtocolV2Message instance using the specified properties.
                     * @function create
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV2Message
                     * @static
                     * @param {com.amazonaws.iot.securedtunneling.IProtocolV2Message=} [properties] Properties to set
                     * @returns {com.amazonaws.iot.securedtunneling.ProtocolV2Message} ProtocolV2Message instance
                     */
                    ProtocolV2Message.create = function create(properties) {
                        return new ProtocolV2Message(properties);
                    };

                    /**
                     * Encodes the specified ProtocolV2Message message. Does not implicitly {@link com.amazonaws.iot.securedtunneling.ProtocolV2Message.verify|verify} messages.
                     * @function encode
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV2Message
                     * @static
                     * @param {com.amazonaws.iot.securedtunneling.IProtocolV2Message} message ProtocolV2Message message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ProtocolV2Message.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
                        if (message.streamId != null && Object.hasOwnProperty.call(message, "streamId"))
                            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.streamId);
                        if (message.ignorable != null && Object.hasOwnProperty.call(message, "ignorable"))
                            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.ignorable);
                        if (message.payload != null && Object.hasOwnProperty.call(message, "payload"))
                            writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.payload);
                        if (message.serviceId != null && Object.hasOwnProperty.call(message, "serviceId"))
                            writer.uint32(/* id 5, wireType 2 =*/42).string(message.serviceId);
                        if (message.availableServiceIds != null && message.availableServiceIds.length)
                            for (let i = 0; i < message.availableServiceIds.length; ++i)
                                writer.uint32(/* id 6, wireType 2 =*/50).string(message.availableServiceIds[i]);
                        return writer;
                    };

                    /**
                     * Encodes the specified ProtocolV2Message message, length delimited. Does not implicitly {@link com.amazonaws.iot.securedtunneling.ProtocolV2Message.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV2Message
                     * @static
                     * @param {com.amazonaws.iot.securedtunneling.IProtocolV2Message} message ProtocolV2Message message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ProtocolV2Message.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a ProtocolV2Message message from the specified reader or buffer.
                     * @function decode
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV2Message
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {com.amazonaws.iot.securedtunneling.ProtocolV2Message} ProtocolV2Message
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ProtocolV2Message.decode = function decode(reader, length, error) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.amazonaws.iot.securedtunneling.ProtocolV2Message();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            if (tag === error)
                                break;
                            switch (tag >>> 3) {
                            case 1: {
                                    message.type = reader.int32();
                                    break;
                                }
                            case 2: {
                                    message.streamId = reader.int32();
                                    break;
                                }
                            case 3: {
                                    message.ignorable = reader.bool();
                                    break;
                                }
                            case 4: {
                                    message.payload = reader.bytes();
                                    break;
                                }
                            case 5: {
                                    message.serviceId = reader.string();
                                    break;
                                }
                            case 6: {
                                    if (!(message.availableServiceIds && message.availableServiceIds.length))
                                        message.availableServiceIds = [];
                                    message.availableServiceIds.push(reader.string());
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a ProtocolV2Message message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV2Message
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {com.amazonaws.iot.securedtunneling.ProtocolV2Message} ProtocolV2Message
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ProtocolV2Message.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a ProtocolV2Message message.
                     * @function verify
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV2Message
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    ProtocolV2Message.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.type != null && message.hasOwnProperty("type"))
                            switch (message.type) {
                            default:
                                return "type: enum value expected";
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                                break;
                            }
                        if (message.streamId != null && message.hasOwnProperty("streamId"))
                            if (!$util.isInteger(message.streamId))
                                return "streamId: integer expected";
                        if (message.ignorable != null && message.hasOwnProperty("ignorable"))
                            if (typeof message.ignorable !== "boolean")
                                return "ignorable: boolean expected";
                        if (message.payload != null && message.hasOwnProperty("payload"))
                            if (!(message.payload && typeof message.payload.length === "number" || $util.isString(message.payload)))
                                return "payload: buffer expected";
                        if (message.serviceId != null && message.hasOwnProperty("serviceId"))
                            if (!$util.isString(message.serviceId))
                                return "serviceId: string expected";
                        if (message.availableServiceIds != null && message.hasOwnProperty("availableServiceIds")) {
                            if (!Array.isArray(message.availableServiceIds))
                                return "availableServiceIds: array expected";
                            for (let i = 0; i < message.availableServiceIds.length; ++i)
                                if (!$util.isString(message.availableServiceIds[i]))
                                    return "availableServiceIds: string[] expected";
                        }
                        return null;
                    };

                    /**
                     * Creates a ProtocolV2Message message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV2Message
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {com.amazonaws.iot.securedtunneling.ProtocolV2Message} ProtocolV2Message
                     */
                    ProtocolV2Message.fromObject = function fromObject(object) {
                        if (object instanceof $root.com.amazonaws.iot.securedtunneling.ProtocolV2Message)
                            return object;
                        let message = new $root.com.amazonaws.iot.securedtunneling.ProtocolV2Message();
                        switch (object.type) {
                        default:
                            if (typeof object.type === "number") {
                                message.type = object.type;
                                break;
                            }
                            break;
                        case "UNKNOWN":
                        case 0:
                            message.type = 0;
                            break;
                        case "DATA":
                        case 1:
                            message.type = 1;
                            break;
                        case "STREAM_START":
                        case 2:
                            message.type = 2;
                            break;
                        case "STREAM_RESET":
                        case 3:
                            message.type = 3;
                            break;
                        case "SESSION_RESET":
                        case 4:
                            message.type = 4;
                            break;
                        case "SERVICE_IDS":
                        case 5:
                            message.type = 5;
                            break;
                        }
                        if (object.streamId != null)
                            message.streamId = object.streamId | 0;
                        if (object.ignorable != null)
                            message.ignorable = Boolean(object.ignorable);
                        if (object.payload != null)
                            if (typeof object.payload === "string")
                                $util.base64.decode(object.payload, message.payload = $util.newBuffer($util.base64.length(object.payload)), 0);
                            else if (object.payload.length >= 0)
                                message.payload = object.payload;
                        if (object.serviceId != null)
                            message.serviceId = String(object.serviceId);
                        if (object.availableServiceIds) {
                            if (!Array.isArray(object.availableServiceIds))
                                throw TypeError(".com.amazonaws.iot.securedtunneling.ProtocolV2Message.availableServiceIds: array expected");
                            message.availableServiceIds = [];
                            for (let i = 0; i < object.availableServiceIds.length; ++i)
                                message.availableServiceIds[i] = String(object.availableServiceIds[i]);
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a ProtocolV2Message message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV2Message
                     * @static
                     * @param {com.amazonaws.iot.securedtunneling.ProtocolV2Message} message ProtocolV2Message
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    ProtocolV2Message.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.arrays || options.defaults)
                            object.availableServiceIds = [];
                        if (options.defaults) {
                            object.type = options.enums === String ? "UNKNOWN" : 0;
                            object.streamId = 0;
                            object.ignorable = false;
                            if (options.bytes === String)
                                object.payload = "";
                            else {
                                object.payload = [];
                                if (options.bytes !== Array)
                                    object.payload = $util.newBuffer(object.payload);
                            }
                            object.serviceId = "";
                        }
                        if (message.type != null && message.hasOwnProperty("type"))
                            object.type = options.enums === String ? $root.com.amazonaws.iot.securedtunneling.ProtocolV2Message.Type[message.type] === undefined ? message.type : $root.com.amazonaws.iot.securedtunneling.ProtocolV2Message.Type[message.type] : message.type;
                        if (message.streamId != null && message.hasOwnProperty("streamId"))
                            object.streamId = message.streamId;
                        if (message.ignorable != null && message.hasOwnProperty("ignorable"))
                            object.ignorable = message.ignorable;
                        if (message.payload != null && message.hasOwnProperty("payload"))
                            object.payload = options.bytes === String ? $util.base64.encode(message.payload, 0, message.payload.length) : options.bytes === Array ? Array.prototype.slice.call(message.payload) : message.payload;
                        if (message.serviceId != null && message.hasOwnProperty("serviceId"))
                            object.serviceId = message.serviceId;
                        if (message.availableServiceIds && message.availableServiceIds.length) {
                            object.availableServiceIds = [];
                            for (let j = 0; j < message.availableServiceIds.length; ++j)
                                object.availableServiceIds[j] = message.availableServiceIds[j];
                        }
                        return object;
                    };

                    /**
                     * Converts this ProtocolV2Message to JSON.
                     * @function toJSON
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV2Message
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    ProtocolV2Message.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the default type url for ProtocolV2Message
                     * @function getTypeUrl
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV2Message
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    ProtocolV2Message.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/com.amazonaws.iot.securedtunneling.ProtocolV2Message";
                    };

                    /**
                     * Type enum.
                     * @name com.amazonaws.iot.securedtunneling.ProtocolV2Message.Type
                     * @enum {number}
                     * @property {number} UNKNOWN=0 UNKNOWN value
                     * @property {number} DATA=1 DATA value
                     * @property {number} STREAM_START=2 STREAM_START value
                     * @property {number} STREAM_RESET=3 STREAM_RESET value
                     * @property {number} SESSION_RESET=4 SESSION_RESET value
                     * @property {number} SERVICE_IDS=5 SERVICE_IDS value
                     */
                    ProtocolV2Message.Type = (function() {
                        const valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "UNKNOWN"] = 0;
                        values[valuesById[1] = "DATA"] = 1;
                        values[valuesById[2] = "STREAM_START"] = 2;
                        values[valuesById[3] = "STREAM_RESET"] = 3;
                        values[valuesById[4] = "SESSION_RESET"] = 4;
                        values[valuesById[5] = "SERVICE_IDS"] = 5;
                        return values;
                    })();

                    return ProtocolV2Message;
                })();

                securedtunneling.ProtocolV3Message = (function() {

                    /**
                     * Properties of a ProtocolV3Message.
                     * @memberof com.amazonaws.iot.securedtunneling
                     * @interface IProtocolV3Message
                     * @property {com.amazonaws.iot.securedtunneling.ProtocolV3Message.Type|null} [type] ProtocolV3Message type
                     * @property {number|null} [streamId] ProtocolV3Message streamId
                     * @property {boolean|null} [ignorable] ProtocolV3Message ignorable
                     * @property {Uint8Array|null} [payload] ProtocolV3Message payload
                     * @property {string|null} [serviceId] ProtocolV3Message serviceId
                     * @property {Array.<string>|null} [availableServiceIds] ProtocolV3Message availableServiceIds
                     * @property {number|null} [connectionId] ProtocolV3Message connectionId
                     */

                    /**
                     * Constructs a new ProtocolV3Message.
                     * @memberof com.amazonaws.iot.securedtunneling
                     * @classdesc Represents a ProtocolV3Message.
                     * @implements IProtocolV3Message
                     * @constructor
                     * @param {com.amazonaws.iot.securedtunneling.IProtocolV3Message=} [properties] Properties to set
                     */
                    function ProtocolV3Message(properties) {
                        this.availableServiceIds = [];
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * ProtocolV3Message type.
                     * @member {com.amazonaws.iot.securedtunneling.ProtocolV3Message.Type} type
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV3Message
                     * @instance
                     */
                    ProtocolV3Message.prototype.type = 0;

                    /**
                     * ProtocolV3Message streamId.
                     * @member {number} streamId
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV3Message
                     * @instance
                     */
                    ProtocolV3Message.prototype.streamId = 0;

                    /**
                     * ProtocolV3Message ignorable.
                     * @member {boolean} ignorable
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV3Message
                     * @instance
                     */
                    ProtocolV3Message.prototype.ignorable = false;

                    /**
                     * ProtocolV3Message payload.
                     * @member {Uint8Array} payload
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV3Message
                     * @instance
                     */
                    ProtocolV3Message.prototype.payload = $util.newBuffer([]);

                    /**
                     * ProtocolV3Message serviceId.
                     * @member {string} serviceId
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV3Message
                     * @instance
                     */
                    ProtocolV3Message.prototype.serviceId = "";

                    /**
                     * ProtocolV3Message availableServiceIds.
                     * @member {Array.<string>} availableServiceIds
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV3Message
                     * @instance
                     */
                    ProtocolV3Message.prototype.availableServiceIds = $util.emptyArray;

                    /**
                     * ProtocolV3Message connectionId.
                     * @member {number} connectionId
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV3Message
                     * @instance
                     */
                    ProtocolV3Message.prototype.connectionId = 0;

                    /**
                     * Creates a new ProtocolV3Message instance using the specified properties.
                     * @function create
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV3Message
                     * @static
                     * @param {com.amazonaws.iot.securedtunneling.IProtocolV3Message=} [properties] Properties to set
                     * @returns {com.amazonaws.iot.securedtunneling.ProtocolV3Message} ProtocolV3Message instance
                     */
                    ProtocolV3Message.create = function create(properties) {
                        return new ProtocolV3Message(properties);
                    };

                    /**
                     * Encodes the specified ProtocolV3Message message. Does not implicitly {@link com.amazonaws.iot.securedtunneling.ProtocolV3Message.verify|verify} messages.
                     * @function encode
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV3Message
                     * @static
                     * @param {com.amazonaws.iot.securedtunneling.IProtocolV3Message} message ProtocolV3Message message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ProtocolV3Message.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
                        if (message.streamId != null && Object.hasOwnProperty.call(message, "streamId"))
                            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.streamId);
                        if (message.ignorable != null && Object.hasOwnProperty.call(message, "ignorable"))
                            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.ignorable);
                        if (message.payload != null && Object.hasOwnProperty.call(message, "payload"))
                            writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.payload);
                        if (message.serviceId != null && Object.hasOwnProperty.call(message, "serviceId"))
                            writer.uint32(/* id 5, wireType 2 =*/42).string(message.serviceId);
                        if (message.availableServiceIds != null && message.availableServiceIds.length)
                            for (let i = 0; i < message.availableServiceIds.length; ++i)
                                writer.uint32(/* id 6, wireType 2 =*/50).string(message.availableServiceIds[i]);
                        if (message.connectionId != null && Object.hasOwnProperty.call(message, "connectionId"))
                            writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.connectionId);
                        return writer;
                    };

                    /**
                     * Encodes the specified ProtocolV3Message message, length delimited. Does not implicitly {@link com.amazonaws.iot.securedtunneling.ProtocolV3Message.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV3Message
                     * @static
                     * @param {com.amazonaws.iot.securedtunneling.IProtocolV3Message} message ProtocolV3Message message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ProtocolV3Message.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a ProtocolV3Message message from the specified reader or buffer.
                     * @function decode
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV3Message
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {com.amazonaws.iot.securedtunneling.ProtocolV3Message} ProtocolV3Message
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ProtocolV3Message.decode = function decode(reader, length, error) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.amazonaws.iot.securedtunneling.ProtocolV3Message();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            if (tag === error)
                                break;
                            switch (tag >>> 3) {
                            case 1: {
                                    message.type = reader.int32();
                                    break;
                                }
                            case 2: {
                                    message.streamId = reader.int32();
                                    break;
                                }
                            case 3: {
                                    message.ignorable = reader.bool();
                                    break;
                                }
                            case 4: {
                                    message.payload = reader.bytes();
                                    break;
                                }
                            case 5: {
                                    message.serviceId = reader.string();
                                    break;
                                }
                            case 6: {
                                    if (!(message.availableServiceIds && message.availableServiceIds.length))
                                        message.availableServiceIds = [];
                                    message.availableServiceIds.push(reader.string());
                                    break;
                                }
                            case 7: {
                                    message.connectionId = reader.uint32();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a ProtocolV3Message message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV3Message
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {com.amazonaws.iot.securedtunneling.ProtocolV3Message} ProtocolV3Message
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ProtocolV3Message.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a ProtocolV3Message message.
                     * @function verify
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV3Message
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    ProtocolV3Message.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.type != null && message.hasOwnProperty("type"))
                            switch (message.type) {
                            default:
                                return "type: enum value expected";
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                            case 7:
                                break;
                            }
                        if (message.streamId != null && message.hasOwnProperty("streamId"))
                            if (!$util.isInteger(message.streamId))
                                return "streamId: integer expected";
                        if (message.ignorable != null && message.hasOwnProperty("ignorable"))
                            if (typeof message.ignorable !== "boolean")
                                return "ignorable: boolean expected";
                        if (message.payload != null && message.hasOwnProperty("payload"))
                            if (!(message.payload && typeof message.payload.length === "number" || $util.isString(message.payload)))
                                return "payload: buffer expected";
                        if (message.serviceId != null && message.hasOwnProperty("serviceId"))
                            if (!$util.isString(message.serviceId))
                                return "serviceId: string expected";
                        if (message.availableServiceIds != null && message.hasOwnProperty("availableServiceIds")) {
                            if (!Array.isArray(message.availableServiceIds))
                                return "availableServiceIds: array expected";
                            for (let i = 0; i < message.availableServiceIds.length; ++i)
                                if (!$util.isString(message.availableServiceIds[i]))
                                    return "availableServiceIds: string[] expected";
                        }
                        if (message.connectionId != null && message.hasOwnProperty("connectionId"))
                            if (!$util.isInteger(message.connectionId))
                                return "connectionId: integer expected";
                        return null;
                    };

                    /**
                     * Creates a ProtocolV3Message message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV3Message
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {com.amazonaws.iot.securedtunneling.ProtocolV3Message} ProtocolV3Message
                     */
                    ProtocolV3Message.fromObject = function fromObject(object) {
                        if (object instanceof $root.com.amazonaws.iot.securedtunneling.ProtocolV3Message)
                            return object;
                        let message = new $root.com.amazonaws.iot.securedtunneling.ProtocolV3Message();
                        switch (object.type) {
                        default:
                            if (typeof object.type === "number") {
                                message.type = object.type;
                                break;
                            }
                            break;
                        case "UNKNOWN":
                        case 0:
                            message.type = 0;
                            break;
                        case "DATA":
                        case 1:
                            message.type = 1;
                            break;
                        case "STREAM_START":
                        case 2:
                            message.type = 2;
                            break;
                        case "STREAM_RESET":
                        case 3:
                            message.type = 3;
                            break;
                        case "SESSION_RESET":
                        case 4:
                            message.type = 4;
                            break;
                        case "SERVICE_IDS":
                        case 5:
                            message.type = 5;
                            break;
                        case "CONNECTION_START":
                        case 6:
                            message.type = 6;
                            break;
                        case "CONNECTION_RESET":
                        case 7:
                            message.type = 7;
                            break;
                        }
                        if (object.streamId != null)
                            message.streamId = object.streamId | 0;
                        if (object.ignorable != null)
                            message.ignorable = Boolean(object.ignorable);
                        if (object.payload != null)
                            if (typeof object.payload === "string")
                                $util.base64.decode(object.payload, message.payload = $util.newBuffer($util.base64.length(object.payload)), 0);
                            else if (object.payload.length >= 0)
                                message.payload = object.payload;
                        if (object.serviceId != null)
                            message.serviceId = String(object.serviceId);
                        if (object.availableServiceIds) {
                            if (!Array.isArray(object.availableServiceIds))
                                throw TypeError(".com.amazonaws.iot.securedtunneling.ProtocolV3Message.availableServiceIds: array expected");
                            message.availableServiceIds = [];
                            for (let i = 0; i < object.availableServiceIds.length; ++i)
                                message.availableServiceIds[i] = String(object.availableServiceIds[i]);
                        }
                        if (object.connectionId != null)
                            message.connectionId = object.connectionId >>> 0;
                        return message;
                    };

                    /**
                     * Creates a plain object from a ProtocolV3Message message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV3Message
                     * @static
                     * @param {com.amazonaws.iot.securedtunneling.ProtocolV3Message} message ProtocolV3Message
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    ProtocolV3Message.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.arrays || options.defaults)
                            object.availableServiceIds = [];
                        if (options.defaults) {
                            object.type = options.enums === String ? "UNKNOWN" : 0;
                            object.streamId = 0;
                            object.ignorable = false;
                            if (options.bytes === String)
                                object.payload = "";
                            else {
                                object.payload = [];
                                if (options.bytes !== Array)
                                    object.payload = $util.newBuffer(object.payload);
                            }
                            object.serviceId = "";
                            object.connectionId = 0;
                        }
                        if (message.type != null && message.hasOwnProperty("type"))
                            object.type = options.enums === String ? $root.com.amazonaws.iot.securedtunneling.ProtocolV3Message.Type[message.type] === undefined ? message.type : $root.com.amazonaws.iot.securedtunneling.ProtocolV3Message.Type[message.type] : message.type;
                        if (message.streamId != null && message.hasOwnProperty("streamId"))
                            object.streamId = message.streamId;
                        if (message.ignorable != null && message.hasOwnProperty("ignorable"))
                            object.ignorable = message.ignorable;
                        if (message.payload != null && message.hasOwnProperty("payload"))
                            object.payload = options.bytes === String ? $util.base64.encode(message.payload, 0, message.payload.length) : options.bytes === Array ? Array.prototype.slice.call(message.payload) : message.payload;
                        if (message.serviceId != null && message.hasOwnProperty("serviceId"))
                            object.serviceId = message.serviceId;
                        if (message.availableServiceIds && message.availableServiceIds.length) {
                            object.availableServiceIds = [];
                            for (let j = 0; j < message.availableServiceIds.length; ++j)
                                object.availableServiceIds[j] = message.availableServiceIds[j];
                        }
                        if (message.connectionId != null && message.hasOwnProperty("connectionId"))
                            object.connectionId = message.connectionId;
                        return object;
                    };

                    /**
                     * Converts this ProtocolV3Message to JSON.
                     * @function toJSON
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV3Message
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    ProtocolV3Message.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the default type url for ProtocolV3Message
                     * @function getTypeUrl
                     * @memberof com.amazonaws.iot.securedtunneling.ProtocolV3Message
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    ProtocolV3Message.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/com.amazonaws.iot.securedtunneling.ProtocolV3Message";
                    };

                    /**
                     * Type enum.
                     * @name com.amazonaws.iot.securedtunneling.ProtocolV3Message.Type
                     * @enum {number}
                     * @property {number} UNKNOWN=0 UNKNOWN value
                     * @property {number} DATA=1 DATA value
                     * @property {number} STREAM_START=2 STREAM_START value
                     * @property {number} STREAM_RESET=3 STREAM_RESET value
                     * @property {number} SESSION_RESET=4 SESSION_RESET value
                     * @property {number} SERVICE_IDS=5 SERVICE_IDS value
                     * @property {number} CONNECTION_START=6 CONNECTION_START value
                     * @property {number} CONNECTION_RESET=7 CONNECTION_RESET value
                     */
                    ProtocolV3Message.Type = (function() {
                        const valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "UNKNOWN"] = 0;
                        values[valuesById[1] = "DATA"] = 1;
                        values[valuesById[2] = "STREAM_START"] = 2;
                        values[valuesById[3] = "STREAM_RESET"] = 3;
                        values[valuesById[4] = "SESSION_RESET"] = 4;
                        values[valuesById[5] = "SERVICE_IDS"] = 5;
                        values[valuesById[6] = "CONNECTION_START"] = 6;
                        values[valuesById[7] = "CONNECTION_RESET"] = 7;
                        return values;
                    })();

                    return ProtocolV3Message;
                })();

                return securedtunneling;
            })();

            return iot;
        })();

        return amazonaws;
    })();

    return com;
})();

export { $root as default };
