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
var classnames_1 = __importDefault(require("classnames"));
var Emojify_1 = require("./conversation/Emojify");
function getInitial(name) {
    return name.trim()[0] || '#';
}
var ContactListItem = /** @class */ (function (_super) {
    __extends(ContactListItem, _super);
    function ContactListItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContactListItem.prototype.renderAvatar = function (_a) {
        var displayName = _a.displayName;
        var _b = this.props, avatarPath = _b.avatarPath, i18n = _b.i18n, color = _b.color, name = _b.name;
        if (avatarPath) {
            return (react_1.default.createElement("div", { className: "module-contact-list-item__avatar" },
                react_1.default.createElement("img", { alt: i18n('contactAvatarAlt', [displayName]), src: avatarPath })));
        }
        var title = name ? getInitial(name) : '#';
        return (react_1.default.createElement("div", { className: classnames_1.default('module-contact-list-item__avatar-default', "module-contact-list-item__avatar-default--" + color) },
            react_1.default.createElement("div", { className: "module-contact-list-item__avatar-default__label" }, title)));
    };
    ContactListItem.prototype.render = function () {
        var _a = this.props, i18n = _a.i18n, name = _a.name, onClick = _a.onClick, isMe = _a.isMe, phoneNumber = _a.phoneNumber, profileName = _a.profileName, verified = _a.verified;
        var title = name ? name : phoneNumber;
        var displayName = isMe ? i18n('me') : title;
        var profileElement = !isMe && profileName && !name ? (react_1.default.createElement("span", { className: "module-contact-list-item__text__profile-name" },
            "~",
            react_1.default.createElement(Emojify_1.Emojify, { text: profileName, i18n: i18n }))) : null;
        var showNumber = isMe || name;
        var showVerified = !isMe && verified;
        return (react_1.default.createElement("div", { role: "button", onClick: onClick, className: classnames_1.default('module-contact-list-item', onClick ? 'module-contact-list-item--with-click-handler' : null) },
            this.renderAvatar({ displayName: displayName }),
            react_1.default.createElement("div", { className: "module-contact-list-item__text" },
                react_1.default.createElement("div", { className: "module-contact-list-item__text__name" },
                    react_1.default.createElement(Emojify_1.Emojify, { text: displayName, i18n: i18n }),
                    " ",
                    profileElement),
                react_1.default.createElement("div", { className: "module-contact-list-item__text__additional-data" },
                    showVerified ? (react_1.default.createElement("div", { className: "module-contact-list-item__text__verified-icon" })) : null,
                    showVerified ? " " + i18n('verified') : null,
                    showVerified && showNumber ? ' ∙ ' : null,
                    showNumber ? phoneNumber : null))));
    };
    return ContactListItem;
}(react_1.default.Component));
exports.ContactListItem = ContactListItem;
