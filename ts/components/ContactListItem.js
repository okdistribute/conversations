"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const Emojify_1 = require("./conversation/Emojify");
function getInitial(name) {
    return name.trim()[0] || '#';
}
class ContactListItem extends react_1.default.Component {
    renderAvatar({ displayName }) {
        const { avatarPath, i18n, color, name } = this.props;
        if (avatarPath) {
            return (react_1.default.createElement("div", { className: "module-contact-list-item__avatar" },
                react_1.default.createElement("img", { alt: i18n('contactAvatarAlt', [displayName]), src: avatarPath })));
        }
        const title = name ? getInitial(name) : '#';
        return (react_1.default.createElement("div", { className: classnames_1.default('module-contact-list-item__avatar-default', `module-contact-list-item__avatar-default--${color}`) },
            react_1.default.createElement("div", { className: "module-contact-list-item__avatar-default__label" }, title)));
    }
    render() {
        const { i18n, name, onClick, isMe, phoneNumber, profileName, verified, } = this.props;
        const title = name ? name : phoneNumber;
        const displayName = isMe ? i18n('me') : title;
        const profileElement = !isMe && profileName && !name ? (react_1.default.createElement("span", { className: "module-contact-list-item__text__profile-name" },
            "~",
            react_1.default.createElement(Emojify_1.Emojify, { text: profileName, i18n: i18n }))) : null;
        const showNumber = isMe || name;
        const showVerified = !isMe && verified;
        return (react_1.default.createElement("div", { role: "button", onClick: onClick, className: classnames_1.default('module-contact-list-item', onClick ? 'module-contact-list-item--with-click-handler' : null) },
            this.renderAvatar({ displayName }),
            react_1.default.createElement("div", { className: "module-contact-list-item__text" },
                react_1.default.createElement("div", { className: "module-contact-list-item__text__name" },
                    react_1.default.createElement(Emojify_1.Emojify, { text: displayName, i18n: i18n }),
                    " ",
                    profileElement),
                react_1.default.createElement("div", { className: "module-contact-list-item__text__additional-data" },
                    showVerified ? (react_1.default.createElement("div", { className: "module-contact-list-item__text__verified-icon" })) : null,
                    showVerified ? ` ${i18n('verified')}` : null,
                    showVerified && showNumber ? ' ∙ ' : null,
                    showNumber ? phoneNumber : null))));
    }
}
exports.ContactListItem = ContactListItem;
