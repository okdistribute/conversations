"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var OS = __importStar(require("../OS"));
var MIN_WINDOWS_VERSION = '8.0.0';
exports.isAudioNotificationSupported = function () {
    return OS.isWindows(MIN_WINDOWS_VERSION) || OS.isMacOS();
};
// Using `Notification::tag` has a bug on Windows 7:
// https://github.com/electron/electron/issues/11189
exports.isNotificationGroupingSupported = function () {
    return !OS.isWindows() || OS.isWindows(MIN_WINDOWS_VERSION);
};
