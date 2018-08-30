"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// See: https://en.wikipedia.org/wiki/Comparison_of_web_browsers#Image_format_support
var SUPPORTED_IMAGE_MIME_TYPES = {
    'image/bmp': true,
    'image/gif': true,
    'image/jpeg': true,
    // No need to support SVG
    'image/svg+xml': false,
    'image/webp': true,
    'image/x-xbitmap': true,
    // ICO
    'image/vnd.microsoft.icon': true,
    'image/ico': true,
    'image/icon': true,
    'image/x-icon': true,
    // PNG
    'image/apng': true,
    'image/png': true,
};
exports.isImageTypeSupported = function (mimeType) {
    return SUPPORTED_IMAGE_MIME_TYPES[mimeType] === true;
};
var SUPPORTED_VIDEO_MIME_TYPES = {
    'video/mp4': true,
    'video/ogg': true,
    'video/webm': true,
};
// See: https://www.chromium.org/audio-video
exports.isVideoTypeSupported = function (mimeType) {
    return SUPPORTED_VIDEO_MIME_TYPES[mimeType] === true;
};
