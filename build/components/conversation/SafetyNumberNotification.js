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
// import classNames from 'classnames';
var ContactName_1 = require("./ContactName");
var Intl_1 = require("../Intl");
var SafetyNumberNotification = /** @class */ (function (_super) {
    __extends(SafetyNumberNotification, _super);
    function SafetyNumberNotification() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SafetyNumberNotification.prototype.render = function () {
        var _a = this.props, contact = _a.contact, isGroup = _a.isGroup, i18n = _a.i18n, onVerify = _a.onVerify;
        return (react_1.default.createElement("div", { className: "module-safety-number-notification" },
            react_1.default.createElement("div", { className: "module-safety-number-notification__icon" }),
            react_1.default.createElement("div", { className: "module-safety-number-notification__text" },
                react_1.default.createElement(Intl_1.Intl, { id: isGroup ? 'safetyNumberChangedGroup' : 'safetyNumberChanged', components: [
                        react_1.default.createElement("span", { key: "external-1", className: "module-safety-number-notification__contact" },
                            react_1.default.createElement(ContactName_1.ContactName, { i18n: i18n, name: contact.name, profileName: contact.profileName, phoneNumber: contact.phoneNumber, module: "module-verification-notification__contact" })),
                    ], i18n: i18n })),
            react_1.default.createElement("div", { role: "button", onClick: onVerify, className: "module-verification-notification__button" }, i18n('verifyNewNumber'))));
    };
    return SafetyNumberNotification;
}(react_1.default.Component));
exports.SafetyNumberNotification = SafetyNumberNotification;
