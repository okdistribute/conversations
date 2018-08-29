"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const MessageBody_1 = require("./conversation/MessageBody");
const Timestamp_1 = require("./conversation/Timestamp");
const ContactName_1 = require("./conversation/ContactName");
function getInitial(name) {
    return name.trim()[0] || '#';
}
class ConversationListItem extends react_1.default.Component {
    renderAvatar() {
        const { avatarPath, color, i18n, name, phoneNumber, profileName, } = this.props;
        if (!avatarPath) {
            const initial = getInitial(name || '');
            return (react_1.default.createElement("div", { className: classnames_1.default('module-conversation-list-item__avatar', 'module-conversation-list-item__default-avatar', `module-conversation-list-item__default-avatar--${color}`) }, initial));
        }
        const title = `${name || phoneNumber}${!name && profileName ? ` ~${profileName}` : ''}`;
        return (react_1.default.createElement("img", { className: "module-conversation-list-item__avatar", alt: i18n('contactAvatarAlt', [title]), src: avatarPath }));
    }
    renderHeader() {
        const { unreadCount, i18n, lastUpdated, name, phoneNumber, profileName, } = this.props;
        return (react_1.default.createElement("div", { className: "module-conversation-list-item__header" },
            react_1.default.createElement("div", { className: classnames_1.default('module-conversation-list-item__header__name', unreadCount > 0
                    ? 'module-conversation-list-item__header__name--with-unread'
                    : null) },
                react_1.default.createElement(ContactName_1.ContactName, { phoneNumber: phoneNumber, name: name, profileName: profileName, i18n: i18n })),
            react_1.default.createElement("div", { className: classnames_1.default('module-conversation-list-item__header__date', unreadCount > 0
                    ? 'module-conversation-list-item__header__date--has-unread'
                    : null) },
                react_1.default.createElement(Timestamp_1.Timestamp, { timestamp: lastUpdated, extended: false, module: "module-conversation-list-item__header__timestamp", i18n: i18n }))));
    }
    renderUnread() {
        const { unreadCount } = this.props;
        if (unreadCount > 0) {
            return (react_1.default.createElement("div", { className: "module-conversation-list-item__unread-count" }, unreadCount));
        }
        return null;
    }
    renderMessage() {
        const { lastMessage, unreadCount, i18n } = this.props;
        if (!lastMessage) {
            return null;
        }
        return (react_1.default.createElement("div", { className: "module-conversation-list-item__message" },
            react_1.default.createElement("div", { className: classnames_1.default('module-conversation-list-item__message__text', unreadCount > 0
                    ? 'module-conversation-list-item__message__text--has-unread'
                    : null) },
                react_1.default.createElement(MessageBody_1.MessageBody, { text: lastMessage.text || '', disableJumbomoji: true, disableLinks: true, i18n: i18n })),
            lastMessage.status ? (react_1.default.createElement("div", { className: classnames_1.default('module-conversation-list-item__message__status-icon', `module-conversation-list-item__message__status-icon--${lastMessage.status}`) })) : null,
            this.renderUnread()));
    }
    render() {
        const { unreadCount, onClick, isSelected } = this.props;
        return (react_1.default.createElement("div", { role: "button", onClick: onClick, className: classnames_1.default('module-conversation-list-item', unreadCount > 0 ? 'module-conversation-list-item--has-unread' : null, isSelected ? 'module-conversation-list-item--is-selected' : null) },
            this.renderAvatar(),
            react_1.default.createElement("div", { className: "module-conversation-list-item__content" },
                this.renderHeader(),
                this.renderMessage())));
    }
}
exports.ConversationListItem = ConversationListItem;
