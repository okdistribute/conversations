"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
exports.LoadingIndicator = function () {
    return (react_1.default.createElement("div", { className: "loading-widget" },
        react_1.default.createElement("div", { className: "container" },
            react_1.default.createElement("span", { className: "dot" }),
            react_1.default.createElement("span", { className: "dot" }),
            react_1.default.createElement("span", { className: "dot" }))));
};
