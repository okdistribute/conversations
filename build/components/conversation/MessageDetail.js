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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var moment_1 = __importDefault(require("moment"));
var ContactName_1 = require("./ContactName");
var Message_1 = require("./Message");
function getInitial(name) {
    return name.trim()[0] || '#';
}
var MessageDetail = /** @class */ (function (_super) {
    __extends(MessageDetail, _super);
    function MessageDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MessageDetail.prototype.renderAvatar = function (contact) {
        var i18n = this.props.i18n;
        var avatarPath = contact.avatarPath, color = contact.color, phoneNumber = contact.phoneNumber, name = contact.name, profileName = contact.profileName;
        if (!avatarPath) {
            var initial = getInitial(name || '');
            return (react_1.default.createElement("div", { className: classnames_1.default('module-message-detail__contact__avatar', 'module-message-detail__contact__default-avatar', "module-message-detail__contact__default-avatar--" + color) }, initial));
        }
        var title = "" + (name || phoneNumber) + (!name && profileName ? " ~" + profileName : '');
        return (react_1.default.createElement("img", { className: "module-message-detail__contact__avatar", alt: i18n('contactAvatarAlt', [title]), src: avatarPath }));
    };
    MessageDetail.prototype.renderDeleteButton = function () {
        var _a = this.props, i18n = _a.i18n, message = _a.message;
        return (react_1.default.createElement("div", { className: "module-message-detail__delete-button-container" },
            react_1.default.createElement("button", { onClick: message.onDelete, className: "module-message-detail__delete-button" }, i18n('deleteThisMessage'))));
    };
    MessageDetail.prototype.renderContact = function (contact) {
        var i18n = this.props.i18n;
        var errors = contact.errors || [];
        var errorComponent = contact.isOutgoingKeyError ? (react_1.default.createElement("div", { className: "module-message-detail__contact__error-buttons" },
            react_1.default.createElement("button", { className: "module-message-detail__contact__show-safety-number", onClick: contact.onShowSafetyNumber }, i18n('showSafetyNumber')),
            react_1.default.createElement("button", { className: "module-message-detail__contact__send-anyway", onClick: contact.onSendAnyway }, i18n('sendAnyway')))) : null;
        var statusComponent = !contact.isOutgoingKeyError ? (react_1.default.createElement("div", { className: classnames_1.default('module-message-detail__contact__status-icon', "module-message-detail__contact__status-icon--" + contact.status) })) : null;
        return (react_1.default.createElement("div", { key: contact.phoneNumber, className: "module-message-detail__contact" },
            this.renderAvatar(contact),
            react_1.default.createElement("div", { className: "module-message-detail__contact__text" },
                react_1.default.createElement("div", { className: "module-message-detail__contact__name" },
                    react_1.default.createElement(ContactName_1.ContactName, { phoneNumber: contact.phoneNumber, name: contact.name, profileName: contact.profileName, i18n: i18n })),
                errors.map(function (error, index) { return (react_1.default.createElement("div", { key: index, className: "module-message-detail__contact__error" }, error.message)); })),
            errorComponent,
            statusComponent));
    };
    MessageDetail.prototype.renderContacts = function () {
        var _this = this;
        var contacts = this.props.contacts;
        if (!contacts || !contacts.length) {
            return null;
        }
        return (react_1.default.createElement("div", { className: "module-message-detail__contact-container" }, contacts.map(function (contact) { return _this.renderContact(contact); })));
    };
    MessageDetail.prototype.render = function () {
        var _a = this.props, errors = _a.errors, message = _a.message, receivedAt = _a.receivedAt, sentAt = _a.sentAt, i18n = _a.i18n;
        return (react_1.default.createElement("div", { className: "module-message-detail" },
            react_1.default.createElement("div", { className: "module-message-detail__message-container" },
                react_1.default.createElement(Message_1.Message, __assign({ i18n: i18n }, message))),
            react_1.default.createElement("table", { className: "module-message-detail__info" },
                react_1.default.createElement("tbody", null,
                    (errors || []).map(function (error, index) { return (react_1.default.createElement("tr", { key: index },
                        react_1.default.createElement("td", { className: "module-message-detail__label" }, i18n('error')),
                        react_1.default.createElement("td", null,
                            ' ',
                            react_1.default.createElement("span", { className: "error-message" }, error.message),
                            ' '))); }),
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
    };
    return MessageDetail;
}(react_1.default.Component));
exports.MessageDetail = MessageDetail;
