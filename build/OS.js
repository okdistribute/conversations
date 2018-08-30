"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var is_1 = __importDefault(require("@sindresorhus/is"));
var os_1 = __importDefault(require("os"));
var semver_1 = __importDefault(require("semver"));
exports.isMacOS = function () { return process.platform === 'darwin'; };
exports.isLinux = function () { return process.platform === 'linux'; };
exports.isWindows = function (minVersion) {
    var osRelease = os_1.default.release();
    if (process.platform !== 'win32') {
        return false;
    }
    return is_1.default.undefined(minVersion) ? true : semver_1.default.gte(osRelease, minVersion);
};
