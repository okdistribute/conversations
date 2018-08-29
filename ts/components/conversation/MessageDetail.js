"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const moment_1 = __importDefault(require("moment"));
const ContactName_1 = require("./ContactName");
const Message_1 = require("./Message");
function getInitial(name) {
    return name.trim()[0] || '#';
}
class MessageDetail extends react_1.default.Component {
    renderAvatar(contact) {
        const { i18n } = this.props;
        const { avatarPath, color, phoneNumber, name, profileName } = contact;
        if (!avatarPath) {
            const initial = getInitial(name || '');
            return (react_1.default.createElement("div", { className: classnames_1.default('module-message-detail__contact__avatar', 'module-message-detail__contact__default-avatar', `module-message-detail__contact__default-avatar--${color}`) }, initial));
        }
        const title = `${name || phoneNumber}${!name && profileName ? ` ~${profileName}` : ''}`;
        return (react_1.default.createElement("img", { className: "module-message-detail__contact__avatar", alt: i18n('contactAvatarAlt', [title]), src: avatarPath }));
    }
    renderDeleteButton() {
        const { i18n, message } = this.props;
        return (react_1.default.createElement("div", { className: "module-message-detail__delete-button-container" },
            react_1.default.createElement("button", { onClick: message.onDelete, className: "module-message-detail__delete-button" }, i18n('deleteThisMessage'))));
    }
    renderContact(contact) {
        const { i18n } = this.props;
        const errors = contact.errors || [];
        const errorComponent = contact.isOutgoingKeyError ? (react_1.default.createElement("div", { className: "module-message-detail__contact__error-buttons" },
            react_1.default.createElement("button", { className: "module-message-detail__contact__show-safety-number", onClick: contact.onShowSafetyNumber }, i18n('showSafetyNumber')),
            react_1.default.createElement("button", { className: "module-message-detail__contact__send-anyway", onClick: contact.onSendAnyway }, i18n('sendAnyway')))) : null;
        const statusComponent = !contact.isOutgoingKeyError ? (react_1.default.createElement("div", { className: classnames_1.default('module-message-detail__contact__status-icon', `module-message-detail__contact__status-icon--${contact.status}`) })) : null;
        return (react_1.default.createElement("div", { key: contact.phoneNumber, className: "module-message-detail__contact" },
            this.renderAvatar(contact),
            react_1.default.createElement("div", { className: "module-message-detail__contact__text" },
                react_1.default.createElement("div", { className: "module-message-detail__contact__name" },
                    react_1.default.createElement(ContactName_1.ContactName, { phoneNumber: contact.phoneNumber, name: contact.name, profileName: contact.profileName, i18n: i18n })),
                errors.map((error, index) => (react_1.default.createElement("div", { key: index, className: "module-message-detail__contact__error" }, error.message)))),
            errorComponent,
            statusComponent));
    }
    renderContacts() {
        const { contacts } = this.props;
        if (!contacts || !contacts.length) {
            return null;
        }
        return (react_1.default.createElement("div", { className: "module-message-detail__contact-container" }, contacts.map(contact => this.renderContact(contact))));
    }
    render() {
        const { errors, message, receivedAt, sentAt, i18n } = this.props;
        return (react_1.default.createElement("div", { className: "module-message-detail" },
            react_1.default.createElement("div", { className: "module-message-detail__message-container" },
                react_1.default.createElement(Message_1.Message, Object.assign({ i18n: i18n }, message))),
            react_1.default.createElement("table", { className: "module-message-detail__info" },
                react_1.default.createElement("tbody", null,
                    (errors || []).map((error, index) => (react_1.default.createElement("tr", { key: index },
                        react_1.default.createElement("td", { className: "module-message-detail__label" }, i18n('error')),
                        react_1.default.createElement("td", null,
                            ' ',
                            react_1.default.createElement("span", { className: "error-message" }, error.message),
                            ' ')))),
                    react_1.default.createElement("tr", null,
                        react_1.default.createElement("td", { className: "module-message-detail__label" }, i18n('sent')),
                        react_1.default.createElement("td", null,
                            moment_1.default(sentAt).format('LLLL'),
                            ' ',
                            react_1.default.createElement("span", { className: "module-message-detail__unix-timestamp" },
                                "(",
                                sentAt,
                                ")"))),
                    receivedAt ? (react_1.default.createElement("tr", null,
                        react_1.default.createElement("td", { className: "module-message-detail__label" }, i18n('received')),
                        react_1.default.createElement("td", null,
                            moment_1.default(receivedAt).format('LLLL'),
                            ' ',
                            react_1.default.createElement("span", { className: "module-message-detail__unix-timestamp" },
                                "(",
                                receivedAt,
                                ")")))) : null,
                    react_1.default.createElement("tr", null,
                        react_1.default.createElement("td", { className: "module-message-detail__label" }, message.direction === 'incoming' ? i18n('from') : i18n('to'))))),
            this.renderContacts(),
            this.renderDeleteButton()));
    }
}
exports.MessageDetail = MessageDetail;
