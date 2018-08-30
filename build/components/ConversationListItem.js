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
var MessageBody_1 = require("./conversation/MessageBody");
var Timestamp_1 = require("./conversation/Timestamp");
var ContactName_1 = require("./conversation/ContactName");
function getInitial(name) {
    return name.trim()[0] || '#';
}
var ConversationListItem = /** @class */ (function (_super) {
    __extends(ConversationListItem, _super);
    function ConversationListItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConversationListItem.prototype.renderAvatar = function () {
        var _a = this.props, avatarPath = _a.avatarPath, color = _a.color, i18n = _a.i18n, name = _a.name, phoneNumber = _a.phoneNumber, profileName = _a.profileName;
        if (!avatarPath) {
            var initial = getInitial(name || '');
            return (react_1.default.createElement("div", { className: classnames_1.default('module-conversation-list-item__avatar', 'module-conversation-list-item__default-avatar', "module-conversation-list-item__default-avatar--" + color) }, initial));
        }
        var title = "" + (name || phoneNumber) + (!name && profileName ? " ~" + profileName : '');
        return (react_1.default.createElement("img", { className: "module-conversation-list-item__avatar", alt: i18n('contactAvatarAlt', [title]), src: avatarPath }));
    };
    ConversationListItem.prototype.renderHeader = function () {
        var _a = this.props, unreadCount = _a.unreadCount, i18n = _a.i18n, lastUpdated = _a.lastUpdated, name = _a.name, phoneNumber = _a.phoneNumber, profileName = _a.profileName;
        return (react_1.default.createElement("div", { className: "module-conversation-list-item__header" },
            react_1.default.createElement("div", { className: classnames_1.default('module-conversation-list-item__header__name', unreadCount > 0
                    ? 'module-conversation-list-item__header__name--with-unread'
                    : null) },
                react_1.default.createElement(ContactName_1.ContactName, { phoneNumber: phoneNumber, name: name, profileName: profileName, i18n: i18n })),
            react_1.default.createElement("div", { className: classnames_1.default('module-conversation-list-item__header__date', unreadCount > 0
                    ? 'module-conversation-list-item__header__date--has-unread'
                    : null) },
                react_1.default.createElement(Timestamp_1.Timestamp, { timestamp: lastUpdated, extended: false, module: "module-conversation-list-item__header__timestamp", i18n: i18n }))));
    };
    ConversationListItem.prototype.renderUnread = function () {
        var unreadCount = this.props.unreadCount;
        if (unreadCount > 0) {
            return (react_1.default.createElement("div", { className: "module-conversation-list-item__unread-count" }, unreadCount));
        }
        return null;
    };
    ConversationListItem.prototype.renderMessage = function () {
        var _a = this.props, lastMessage = _a.lastMessage, unreadCount = _a.unreadCount, i18n = _a.i18n;
        if (!lastMessage) {
            return null;
        }
        return (react_1.default.createElement("div", { className: "module-conversation-list-item__message" },
            react_1.default.createElement("div", { className: classnames_1.default('module-conversation-list-item__message__text', unreadCount > 0
                    ? 'module-conversation-list-item__message__text--has-unread'
                    : null) },
                react_1.default.createElement(MessageBody_1.MessageBody, { text: lastMessage.text || '', disableJumbomoji: true, disableLinks: true, i18n: i18n })),
            lastMessage.status ? (react_1.default.createElement("div", { className: classnames_1.default('module-conversation-list-item__message__status-icon', "module-conversation-list-item__message__status-icon--" + lastMessage.status) })) : null,
            this.renderUnread()));
    };
    ConversationListItem.prototype.render = function () {
        var _a = this.props, unreadCount = _a.unreadCount, onClick = _a.onClick, isSelected = _a.isSelected;
        return (react_1.default.createElement("div", { role: "button", onClick: onClick, className: classnames_1.default('module-conversation-list-item', unreadCount > 0 ? 'module-conversation-list-item--has-unread' : null, isSelected ? 'module-conversation-list-item--is-selected' : null) },
            this.renderAvatar(),
            react_1.default.createElement("div", { className: "module-conversation-list-item__content" },
                this.renderHeader(),
                this.renderMessage())));
    };
    return ConversationListItem;
}(react_1.default.Component));
exports.ConversationListItem = ConversationListItem;
