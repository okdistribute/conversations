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
var react_1 = __importDefault(require("react"));
var ResetSessionNotification = /** @class */ (function (_super) {
    __extends(ResetSessionNotification, _super);
    function ResetSessionNotification() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResetSessionNotification.prototype.render = function () {
        var i18n = this.props.i18n;
        return (react_1.default.createElement("div", { className: "module-reset-session-notification" }, i18n('sessionEnded')));
    };
    return ResetSessionNotification;
}(react_1.default.Component));
exports.ResetSessionNotification = ResetSessionNotification;
