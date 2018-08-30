"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @prettier
 */
var react_1 = __importDefault(require("react"));
var EmptyState = /** @class */ (function (_super) {
    __extends(EmptyState, _super);
    function EmptyState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmptyState.prototype.render = function () {
        var label = this.props.label;
        return react_1.default.createElement("div", { className: "module-empty-state" }, label);
    };
    return EmptyState;
}(react_1.default.Component));
exports.EmptyState = EmptyState;
