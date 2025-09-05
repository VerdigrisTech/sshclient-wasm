/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const tunnel = $root.tunnel = (() => {

    /**
     * Namespace tunnel.
     * @exports tunnel
     * @namespace
     */
    const tunnel = {};

    /**
     * TunnelMessageType enum.
     * @name tunnel.TunnelMessageType
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
    tunnel.TunnelMessageType = (function() {
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

    tunnel.TunnelMessage = (function() {

        /**
         * Properties of a TunnelMessage.
         * @memberof tunnel
         * @interface ITunnelMessage
         * @property {tunnel.TunnelMessageType|null} [type] TunnelMessage type
         * @property {number|null} [streamId] TunnelMessage streamId
         * @property {number|null} [connectionId] TunnelMessage connectionId
         * @property {boolean|null} [ignorable] TunnelMessage ignorable
         * @property {Uint8Array|null} [payload] TunnelMessage payload
         * @property {string|null} [serviceId] TunnelMessage serviceId
         * @property {Array.<string>|null} [availableServiceIds] TunnelMessage availableServiceIds
         */

        /**
         * Constructs a new TunnelMessage.
         * @memberof tunnel
         * @classdesc Represents a TunnelMessage.
         * @implements ITunnelMessage
         * @constructor
         * @param {tunnel.ITunnelMessage=} [properties] Properties to set
         */
        function TunnelMessage(properties) {
            this.availableServiceIds = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TunnelMessage type.
         * @member {tunnel.TunnelMessageType} type
         * @memberof tunnel.TunnelMessage
         * @instance
         */
        TunnelMessage.prototype.type = 0;

        /**
         * TunnelMessage streamId.
         * @member {number|null|undefined} streamId
         * @memberof tunnel.TunnelMessage
         * @instance
         */
        TunnelMessage.prototype.streamId = null;

        /**
         * TunnelMessage connectionId.
         * @member {number|null|undefined} connectionId
         * @memberof tunnel.TunnelMessage
         * @instance
         */
        TunnelMessage.prototype.connectionId = null;

        /**
         * TunnelMessage ignorable.
         * @member {boolean|null|undefined} ignorable
         * @memberof tunnel.TunnelMessage
         * @instance
         */
        TunnelMessage.prototype.ignorable = null;

        /**
         * TunnelMessage payload.
         * @member {Uint8Array|null|undefined} payload
         * @memberof tunnel.TunnelMessage
         * @instance
         */
        TunnelMessage.prototype.payload = null;

        /**
         * TunnelMessage serviceId.
         * @member {string|null|undefined} serviceId
         * @memberof tunnel.TunnelMessage
         * @instance
         */
        TunnelMessage.prototype.serviceId = null;

        /**
         * TunnelMessage availableServiceIds.
         * @member {Array.<string>} availableServiceIds
         * @memberof tunnel.TunnelMessage
         * @instance
         */
        TunnelMessage.prototype.availableServiceIds = $util.emptyArray;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * TunnelMessage _streamId.
         * @member {"streamId"|undefined} _streamId
         * @memberof tunnel.TunnelMessage
         * @instance
         */
        Object.defineProperty(TunnelMessage.prototype, "_streamId", {
            get: $util.oneOfGetter($oneOfFields = ["streamId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * TunnelMessage _connectionId.
         * @member {"connectionId"|undefined} _connectionId
         * @memberof tunnel.TunnelMessage
         * @instance
         */
        Object.defineProperty(TunnelMessage.prototype, "_connectionId", {
            get: $util.oneOfGetter($oneOfFields = ["connectionId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * TunnelMessage _ignorable.
         * @member {"ignorable"|undefined} _ignorable
         * @memberof tunnel.TunnelMessage
         * @instance
         */
        Object.defineProperty(TunnelMessage.prototype, "_ignorable", {
            get: $util.oneOfGetter($oneOfFields = ["ignorable"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * TunnelMessage _payload.
         * @member {"payload"|undefined} _payload
         * @memberof tunnel.TunnelMessage
         * @instance
         */
        Object.defineProperty(TunnelMessage.prototype, "_payload", {
            get: $util.oneOfGetter($oneOfFields = ["payload"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * TunnelMessage _serviceId.
         * @member {"serviceId"|undefined} _serviceId
         * @memberof tunnel.TunnelMessage
         * @instance
         */
        Object.defineProperty(TunnelMessage.prototype, "_serviceId", {
            get: $util.oneOfGetter($oneOfFields = ["serviceId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new TunnelMessage instance using the specified properties.
         * @function create
         * @memberof tunnel.TunnelMessage
         * @static
         * @param {tunnel.ITunnelMessage=} [properties] Properties to set
         * @returns {tunnel.TunnelMessage} TunnelMessage instance
         */
        TunnelMessage.create = function create(properties) {
            return new TunnelMessage(properties);
        };

        /**
         * Encodes the specified TunnelMessage message. Does not implicitly {@link tunnel.TunnelMessage.verify|verify} messages.
         * @function encode
         * @memberof tunnel.TunnelMessage
         * @static
         * @param {tunnel.ITunnelMessage} message TunnelMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TunnelMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.streamId != null && Object.hasOwnProperty.call(message, "streamId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.streamId);
            if (message.connectionId != null && Object.hasOwnProperty.call(message, "connectionId"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.connectionId);
            if (message.ignorable != null && Object.hasOwnProperty.call(message, "ignorable"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.ignorable);
            if (message.payload != null && Object.hasOwnProperty.call(message, "payload"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.payload);
            if (message.serviceId != null && Object.hasOwnProperty.call(message, "serviceId"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.serviceId);
            if (message.availableServiceIds != null && message.availableServiceIds.length)
                for (let i = 0; i < message.availableServiceIds.length; ++i)
                    writer.uint32(/* id 7, wireType 2 =*/58).string(message.availableServiceIds[i]);
            return writer;
        };

        /**
         * Encodes the specified TunnelMessage message, length delimited. Does not implicitly {@link tunnel.TunnelMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tunnel.TunnelMessage
         * @static
         * @param {tunnel.ITunnelMessage} message TunnelMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TunnelMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TunnelMessage message from the specified reader or buffer.
         * @function decode
         * @memberof tunnel.TunnelMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tunnel.TunnelMessage} TunnelMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TunnelMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tunnel.TunnelMessage();
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
                        message.connectionId = reader.int32();
                        break;
                    }
                case 4: {
                        message.ignorable = reader.bool();
                        break;
                    }
                case 5: {
                        message.payload = reader.bytes();
                        break;
                    }
                case 6: {
                        message.serviceId = reader.string();
                        break;
                    }
                case 7: {
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
         * Decodes a TunnelMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof tunnel.TunnelMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tunnel.TunnelMessage} TunnelMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TunnelMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TunnelMessage message.
         * @function verify
         * @memberof tunnel.TunnelMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TunnelMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
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
            if (message.streamId != null && message.hasOwnProperty("streamId")) {
                properties._streamId = 1;
                if (!$util.isInteger(message.streamId))
                    return "streamId: integer expected";
            }
            if (message.connectionId != null && message.hasOwnProperty("connectionId")) {
                properties._connectionId = 1;
                if (!$util.isInteger(message.connectionId))
                    return "connectionId: integer expected";
            }
            if (message.ignorable != null && message.hasOwnProperty("ignorable")) {
                properties._ignorable = 1;
                if (typeof message.ignorable !== "boolean")
                    return "ignorable: boolean expected";
            }
            if (message.payload != null && message.hasOwnProperty("payload")) {
                properties._payload = 1;
                if (!(message.payload && typeof message.payload.length === "number" || $util.isString(message.payload)))
                    return "payload: buffer expected";
            }
            if (message.serviceId != null && message.hasOwnProperty("serviceId")) {
                properties._serviceId = 1;
                if (!$util.isString(message.serviceId))
                    return "serviceId: string expected";
            }
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
         * Creates a TunnelMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tunnel.TunnelMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tunnel.TunnelMessage} TunnelMessage
         */
        TunnelMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.tunnel.TunnelMessage)
                return object;
            let message = new $root.tunnel.TunnelMessage();
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
            if (object.connectionId != null)
                message.connectionId = object.connectionId | 0;
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
                    throw TypeError(".tunnel.TunnelMessage.availableServiceIds: array expected");
                message.availableServiceIds = [];
                for (let i = 0; i < object.availableServiceIds.length; ++i)
                    message.availableServiceIds[i] = String(object.availableServiceIds[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from a TunnelMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tunnel.TunnelMessage
         * @static
         * @param {tunnel.TunnelMessage} message TunnelMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TunnelMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.availableServiceIds = [];
            if (options.defaults)
                object.type = options.enums === String ? "UNKNOWN" : 0;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.tunnel.TunnelMessageType[message.type] === undefined ? message.type : $root.tunnel.TunnelMessageType[message.type] : message.type;
            if (message.streamId != null && message.hasOwnProperty("streamId")) {
                object.streamId = message.streamId;
                if (options.oneofs)
                    object._streamId = "streamId";
            }
            if (message.connectionId != null && message.hasOwnProperty("connectionId")) {
                object.connectionId = message.connectionId;
                if (options.oneofs)
                    object._connectionId = "connectionId";
            }
            if (message.ignorable != null && message.hasOwnProperty("ignorable")) {
                object.ignorable = message.ignorable;
                if (options.oneofs)
                    object._ignorable = "ignorable";
            }
            if (message.payload != null && message.hasOwnProperty("payload")) {
                object.payload = options.bytes === String ? $util.base64.encode(message.payload, 0, message.payload.length) : options.bytes === Array ? Array.prototype.slice.call(message.payload) : message.payload;
                if (options.oneofs)
                    object._payload = "payload";
            }
            if (message.serviceId != null && message.hasOwnProperty("serviceId")) {
                object.serviceId = message.serviceId;
                if (options.oneofs)
                    object._serviceId = "serviceId";
            }
            if (message.availableServiceIds && message.availableServiceIds.length) {
                object.availableServiceIds = [];
                for (let j = 0; j < message.availableServiceIds.length; ++j)
                    object.availableServiceIds[j] = message.availableServiceIds[j];
            }
            return object;
        };

        /**
         * Converts this TunnelMessage to JSON.
         * @function toJSON
         * @memberof tunnel.TunnelMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TunnelMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for TunnelMessage
         * @function getTypeUrl
         * @memberof tunnel.TunnelMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        TunnelMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/tunnel.TunnelMessage";
        };

        return TunnelMessage;
    })();

    return tunnel;
})();

export { $root as default };
