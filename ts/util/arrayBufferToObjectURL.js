"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = __importDefault(require("@sindresorhus/is"));
exports.arrayBufferToObjectURL = ({ data, type, }) => {
    if (!is_1.default.arrayBuffer(data)) {
        throw new TypeError('`data` must be an ArrayBuffer');
    }
    const blob = new Blob([data], { type });
    return URL.createObjectURL(blob);
};
