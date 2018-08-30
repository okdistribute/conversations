"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var is_1 = __importDefault(require("@sindresorhus/is"));
var moment_1 = __importDefault(require("moment"));
var MIME = __importStar(require("./MIME"));
var arrayBufferToObjectURL_1 = require("../util/arrayBufferToObjectURL");
var saveURLAsFile_1 = require("../util/saveURLAsFile");
exports.isVisualMedia = function (attachment) {
    var contentType = attachment.contentType;
    if (is_1.default.undefined(contentType)) {
        return false;
    }
    return MIME.isImage(contentType) || MIME.isVideo(contentType);
};
exports.isFile = function (attachment) {
    var contentType = attachment.contentType;
    if (is_1.default.undefined(contentType)) {
        return false;
    }
    if (exports.isVisualMedia(attachment)) {
        return false;
    }
    return true;
};
exports.save = function (_a) {
    var attachment = _a.attachment, document = _a.document, getAbsolutePath = _a.getAbsolutePath, timestamp = _a.timestamp;
    var isObjectURLRequired = is_1.default.undefined(attachment.path);
    var url = !is_1.default.undefined(attachment.path)
        ? getAbsolutePath(attachment.path)
        : arrayBufferToObjectURL_1.arrayBufferToObjectURL({
            data: attachment.data,
            type: MIME.APPLICATION_OCTET_STREAM,
        });
    var filename = exports.getSuggestedFilename({ attachment: attachment, timestamp: timestamp });
    saveURLAsFile_1.saveURLAsFile({ url: url, filename: filename, document: document });
    if (isObjectURLRequired) {
        URL.revokeObjectURL(url);
    }
};
exports.getSuggestedFilename = function (_a) {
    var attachment = _a.attachment, timestamp = _a.timestamp;
    if (attachment.fileName) {
        return attachment.fileName;
    }
    var prefix = 'signal-attachment';
    var suffix = timestamp
        ? moment_1.default(timestamp).format('-YYYY-MM-DD-HHmmss')
        : '';
    var fileType = exports.getFileExtension(attachment);
    var extension = fileType ? "." + fileType : '';
    return "" + prefix + suffix + extension;
};
exports.getFileExtension = function (attachment) {
    if (!attachment.contentType) {
        return null;
    }
    switch (attachment.contentType) {
        case 'video/quicktime':
            return 'mov';
        default:
            return attachment.contentType.split('/')[1];
    }
};
