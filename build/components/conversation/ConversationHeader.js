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
var Emojify_1 = require("./Emojify");
var react_contextmenu_1 = require("react-contextmenu");
function getInitial(name) {
    return name.trim()[0] || '#';
}
var ConversationHeader = /** @class */ (function (_super) {
    __extends(ConversationHeader, _super);
    function ConversationHeader(props) {
        var _this = _super.call(this, props) || this;
        _this.captureMenuTriggerBound = _this.captureMenuTrigger.bind(_this);
        _this.showMenuBound = _this.showMenu.bind(_this);
        _this.menuTriggerRef = null;
        return _this;
    }
    ConversationHeader.prototype.captureMenuTrigger = function (triggerRef) {
        this.menuTriggerRef = triggerRef;
    };
    ConversationHeader.prototype.showMenu = function (event) {
        if (this.menuTriggerRef) {
            this.menuTriggerRef.handleContextClick(event);
        }
    };
    ConversationHeader.prototype.renderBackButton = function () {
        var _a = this.props, onGoBack = _a.onGoBack, showBackButton = _a.showBackButton;
        if (!showBackButton) {
            return null;
        }
        return (react_1.default.createElement("div", { onClick: onGoBack, role: "button", className: "module-conversation-header__back-icon" }));
    };
    ConversationHeader.prototype.renderTitle = function () {
        var _a = this.props, name = _a.name, phoneNumber = _a.phoneNumber, i18n = _a.i18n, profileName = _a.profileName, isVerified = _a.isVerified;
        return (react_1.default.createElement("div", { className: "module-conversation-header__title" },
            name ? react_1.default.createElement(Emojify_1.Emojify, { text: name, i18n: i18n }) : null,
            name && phoneNumber ? ' · ' : null,
            phoneNumber ? phoneNumber : null,
            ' ',
            profileName && !name ? (react_1.default.createElement("span", { className: "module-conversation-header__title__profile-name" },
                "~",
                react_1.default.createElement(Emojify_1.Emojify, { text: profileName, i18n: i18n }))) : null,
            isVerified ? ' · ' : null,
            isVerified ? (react_1.default.createElement("span", null,
                react_1.default.createElement("span", { className: "module-conversation-header__title__verified-icon" }),
                i18n('verified'))) : null));
    };
    ConversationHeader.prototype.renderAvatar = function () {
        var _a = this.props, avatarPath = _a.avatarPath, color = _a.color, i18n = _a.i18n, name = _a.name, phoneNumber = _a.phoneNumber, profileName = _a.profileName;
        if (!avatarPath) {
            var initial = getInitial(name || '');
            return (react_1.default.createElement("div", { className: classnames_1.default('module-conversation-header___avatar', 'module-conversation-header___default-avatar', "module-conversation-header___default-avatar--" + color) }, initial));
        }
        var title = "" + (name || phoneNumber) + (!name && profileName ? " ~" + profileName : '');
        return (react_1.default.createElement("img", { className: "module-conversation-header___avatar", alt: i18n('contactAvatarAlt', [title]), src: avatarPath }));
    };
    ConversationHeader.prototype.renderExpirationLength = function () {
        var expirationSettingName = this.props.expirationSettingName;
        if (!expirationSettingName) {
            return null;
        }
        return (react_1.default.createElement("div", { className: "module-conversation-header__expiration" },
            react_1.default.createElement("div", { className: "module-conversation-header__expiration__clock-icon" }),
            react_1.default.createElement("div", { className: "module-conversation-header__expiration__setting" }, expirationSettingName)));
    };
    ConversationHeader.prototype.renderGear = function (triggerId) {
        var showBackButton = this.props.showBackButton;
        if (showBackButton) {
            return null;
        }
        return (react_1.default.createElement(react_contextmenu_1.ContextMenuTrigger, { id: triggerId, ref: this.captureMenuTriggerBound },
            react_1.default.createElement("div", { role: "button", onClick: this.showMenuBound, className: "module-conversation-header__gear-icon" })));
    };
    /* tslint:disable:jsx-no-lambda react-this-binding-issue */
    ConversationHeader.prototype.renderMenu = function (triggerId) {
        var _a = this.props, i18n = _a.i18n, isMe = _a.isMe, isGroup = _a.isGroup, onDeleteMessages = _a.onDeleteMessages, onResetSession = _a.onResetSession, onSetDisappearingMessages = _a.onSetDisappearingMessages, onShowAllMedia = _a.onShowAllMedia, onShowGroupMembers = _a.onShowGroupMembers, onShowSafetyNumber = _a.onShowSafetyNumber, timerOptions = _a.timerOptions;
        var disappearingTitle = i18n('disappearingMessages');
        return (react_1.default.createElement(react_contextmenu_1.ContextMenu, { id: triggerId },
            react_1.default.createElement(react_contextmenu_1.SubMenu, { title: disappearingTitle }, (timerOptions || []).map(function (item) { return (react_1.default.createElement(react_contextmenu_1.MenuItem, { key: item.value, onClick: function () {
                    onSetDisappearingMessages(item.value);
                } }, item.name)); })),
            react_1.default.createElement(react_contextmenu_1.MenuItem, { onClick: onShowAllMedia }, i18n('viewAllMedia')),
            isGroup ? (react_1.default.createElement(react_contextmenu_1.MenuItem, { onClick: onShowGroupMembers }, i18n('showMembers'))) : null,
            !isGroup && !isMe ? (react_1.default.createElement(react_contextmenu_1.MenuItem, { onClick: onShowSafetyNumber }, i18n('showSafetyNumber'))) : null,
            !isGroup ? (react_1.default.createElement(react_contextmenu_1.MenuItem, { onClick: onResetSession }, i18n('resetSession'))) : null,
            react_1.default.createElement(react_contextmenu_1.MenuItem, { onClick: onDeleteMessages }, i18n('deleteMessages'))));
    };
    /* tslint:enable */
    ConversationHeader.prototype.render = function () {
        var id = this.props.id;
        return (react_1.default.createElement("div", { className: "module-conversation-header" },
            this.renderBackButton(),
            react_1.default.createElement("div", { className: "module-conversation-header__title-container" },
                react_1.default.createElement("div", { className: "module-conversation-header__title-flex" },
                    this.renderAvatar(),
                    this.renderTitle())),
            this.renderExpirationLength(),
            this.renderGear(id),
            this.renderMenu(id)));
    };
    return ConversationHeader;
}(react_1.default.Component));
exports.ConversationHeader = ConversationHeader;
