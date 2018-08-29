"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const Contact_1 = require("../../types/Contact");
class EmbeddedContact extends react_1.default.Component {
    render() {
        const { contact, i18n, isIncoming, onClick, withContentAbove, withContentBelow, } = this.props;
        const module = 'embedded-contact';
        return (react_1.default.createElement("div", { className: classnames_1.default('module-embedded-contact', withContentAbove
                ? 'module-embedded-contact--with-content-above'
                : null, withContentBelow
                ? 'module-embedded-contact--with-content-below'
                : null), role: "button", onClick: onClick },
            renderAvatar({ contact, i18n, module }),
            react_1.default.createElement("div", { className: "module-embedded-contact__text-container" },
                renderName({ contact, isIncoming, module }),
                renderContactShorthand({ contact, isIncoming, module }))));
    }
}
exports.EmbeddedContact = EmbeddedContact;
// Note: putting these below the main component so style guide picks up EmbeddedContact
function getInitial(name) {
    return name.trim()[0] || '#';
}
function renderAvatar({ contact, i18n, module, }) {
    const { avatar } = contact;
    const path = avatar && avatar.avatar && avatar.avatar.path;
    const name = Contact_1.getName(contact) || '';
    if (!path) {
        const initials = getInitial(name);
        return (react_1.default.createElement("div", { className: `module-${module}__image-container` },
            react_1.default.createElement("div", { className: `module-${module}__image-container__default-avatar` }, initials)));
    }
    return (react_1.default.createElement("div", { className: `module-${module}__image-container` },
        react_1.default.createElement("img", { src: path, alt: i18n('contactAvatarAlt', [name]) })));
}
exports.renderAvatar = renderAvatar;
function renderName({ contact, isIncoming, module, }) {
    return (react_1.default.createElement("div", { className: classnames_1.default(`module-${module}__contact-name`, isIncoming ? `module-${module}__contact-name--incoming` : null) }, Contact_1.getName(contact)));
}
exports.renderName = renderName;
function renderContactShorthand({ contact, isIncoming, module, }) {
    const { number: phoneNumber, email } = contact;
    const firstNumber = phoneNumber && phoneNumber[0] && phoneNumber[0].value;
    const firstEmail = email && email[0] && email[0].value;
    return (react_1.default.createElement("div", { className: classnames_1.default(`module-${module}__contact-method`, isIncoming ? `module-${module}__contact-method--incoming` : null) }, firstNumber || firstEmail));
}
exports.renderContactShorthand = renderContactShorthand;
