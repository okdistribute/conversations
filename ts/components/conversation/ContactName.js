"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Emojify_1 = require("./Emojify");
class ContactName extends react_1.default.Component {
    render() {
        const { phoneNumber, name, profileName, i18n, module } = this.props;
        const prefix = module ? module : 'module-contact-name';
        const title = name ? name : phoneNumber;
        const shouldShowProfile = Boolean(profileName && !name);
        const profileElement = shouldShowProfile ? (react_1.default.createElement("span", { className: `${prefix}__profile-name` },
            "~",
            react_1.default.createElement(Emojify_1.Emojify, { text: profileName || '', i18n: i18n }))) : null;
        return (react_1.default.createElement("span", { className: prefix },
            react_1.default.createElement(Emojify_1.Emojify, { text: title, i18n: i18n }),
            shouldShowProfile ? ' ' : null,
            profileElement));
    }
}
exports.ContactName = ContactName;
