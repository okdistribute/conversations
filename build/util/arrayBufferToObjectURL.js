"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var is_1 = __importDefault(require("@sindresorhus/is"));
exports.arrayBufferToObjectURL = function (_a) {
    var data = _a.data, type = _a.type;
    if (!is_1.default.arrayBuffer(data)) {
        throw new TypeError('`data` must be an ArrayBuffer');
    }
    var blob = new Blob([data], { type: type });
    return URL.createObjectURL(blob);
};
