"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = __importDefault(require("@sindresorhus/is"));
const os_1 = __importDefault(require("os"));
const semver_1 = __importDefault(require("semver"));
exports.isMacOS = () => process.platform === 'darwin';
exports.isLinux = () => process.platform === 'linux';
exports.isWindows = (minVersion) => {
    const osRelease = os_1.default.release();
    if (process.platform !== 'win32') {
        return false;
    }
    return is_1.default.undefined(minVersion) ? true : semver_1.default.gte(osRelease, minVersion);
};
