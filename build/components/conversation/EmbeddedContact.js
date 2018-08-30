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
var Contact_1 = require("../../types/Contact");
var EmbeddedContact = /** @class */ (function (_super) {
    __extends(EmbeddedContact, _super);
    function EmbeddedContact() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmbeddedContact.prototype.render = function () {
        var _a = this.props, contact = _a.contact, i18n = _a.i18n, isIncoming = _a.isIncoming, onClick = _a.onClick, withContentAbove = _a.withContentAbove, withContentBelow = _a.withContentBelow;
        var module = 'embedded-contact';
        return (react_1.default.createElement("div", { className: classnames_1.default('module-embedded-contact', withContentAbove
                ? 'module-embedded-contact--with-content-above'
                : null, withContentBelow
                ? 'module-embedded-contact--with-content-below'
                : null), role: "button", onClick: onClick },
            renderAvatar({ contact: contact, i18n: i18n, module: module }),
            react_1.default.createElement("div", { className: "module-embedded-contact__text-container" },
                renderName({ contact: contact, isIncoming: isIncoming, module: module }),
                renderContactShorthand({ contact: contact, isIncoming: isIncoming, module: module }))));
    };
    return EmbeddedContact;
}(react_1.default.Component));
exports.EmbeddedContact = EmbeddedContact;
// Note: putting these below the main component so style guide picks up EmbeddedContact
function getInitial(name) {
    return name.trim()[0] || '#';
}
function renderAvatar(_a) {
    var contact = _a.contact, i18n = _a.i18n, module = _a.module;
    var avatar = contact.avatar;
    var path = avatar && avatar.avatar && avatar.avatar.path;
    var name = Contact_1.getName(contact) || '';
    if (!path) {
        var initials = getInitial(name);
        return (react_1.default.createElement("div", { className: "module-" + module + "__image-container" },
            react_1.default.createElement("div", { className: "module-" + module + "__image-container__default-avatar" }, initials)));
    }
    return (react_1.default.createElement("div", { className: "module-" + module + "__image-container" },
        react_1.default.createElement("img", { src: path, alt: i18n('contactAvatarAlt', [name]) })));
}
exports.renderAvatar = renderAvatar;
function renderName(_a) {
    var contact = _a.contact, isIncoming = _a.isIncoming, module = _a.module;
    return (react_1.default.createElement("div", { className: classnames_1.default("module-" + module + "__contact-name", isIncoming ? "module-" + module + "__contact-name--incoming" : null) }, Contact_1.getName(contact)));
}
exports.renderName = renderName;
function renderContactShorthand(_a) {
    var contact = _a.contact, isIncoming = _a.isIncoming, module = _a.module;
    var phoneNumber = contact.number, email = contact.email;
    var firstNumber = phoneNumber && phoneNumber[0] && phoneNumber[0].value;
    var firstEmail = email && email[0] && email[0].value;
    return (react_1.default.createElement("div", { className: classnames_1.default("module-" + module + "__contact-method", isIncoming ? "module-" + module + "__contact-method--incoming" : null) }, firstNumber || firstEmail));
}
exports.renderContactShorthand = renderContactShorthand;
