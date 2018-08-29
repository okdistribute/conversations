"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
// import classNames from 'classnames';
const ContactName_1 = require("./ContactName");
const Intl_1 = require("../Intl");
class SafetyNumberNotification extends react_1.default.Component {
    render() {
        const { contact, isGroup, i18n, onVerify } = this.props;
        return (react_1.default.createElement("div", { className: "module-safety-number-notification" },
            react_1.default.createElement("div", { className: "module-safety-number-notification__icon" }),
            react_1.default.createElement("div", { className: "module-safety-number-notification__text" },
                react_1.default.createElement(Intl_1.Intl, { id: isGroup ? 'safetyNumberChangedGroup' : 'safetyNumberChanged', components: [
                        react_1.default.createElement("span", { key: "external-1", className: "module-safety-number-notification__contact" },
                            react_1.default.createElement(ContactName_1.ContactName, { i18n: i18n, name: contact.name, profileName: contact.profileName, phoneNumber: contact.phoneNumber, module: "module-verification-notification__contact" })),
                    ], i18n: i18n })),
            react_1.default.createElement("div", { role: "button", onClick: onVerify, className: "module-verification-notification__button" }, i18n('verifyNewNumber'))));
    }
}
exports.SafetyNumberNotification = SafetyNumberNotification;
