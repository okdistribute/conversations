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
var Contact_1 = require("../../types/Contact");
var missingCaseError_1 = require("../../util/missingCaseError");
var EmbeddedContact_1 = require("./EmbeddedContact");
function getLabelForEmail(method, i18n) {
    switch (method.type) {
        case Contact_1.ContactType.CUSTOM:
            return method.label || i18n('email');
        case Contact_1.ContactType.HOME:
            return i18n('home');
        case Contact_1.ContactType.MOBILE:
            return i18n('mobile');
        case Contact_1.ContactType.WORK:
            return i18n('work');
        default:
            throw missingCaseError_1.missingCaseError(method.type);
    }
}
function getLabelForPhone(method, i18n) {
    switch (method.type) {
        case Contact_1.ContactType.CUSTOM:
            return method.label || i18n('phone');
        case Contact_1.ContactType.HOME:
            return i18n('home');
        case Contact_1.ContactType.MOBILE:
            return i18n('mobile');
        case Contact_1.ContactType.WORK:
            return i18n('work');
        default:
            throw missingCaseError_1.missingCaseError(method.type);
    }
}
function getLabelForAddress(address, i18n) {
    switch (address.type) {
        case Contact_1.AddressType.CUSTOM:
            return address.label || i18n('address');
        case Contact_1.AddressType.HOME:
            return i18n('home');
        case Contact_1.AddressType.WORK:
            return i18n('work');
        default:
            throw missingCaseError_1.missingCaseError(address.type);
    }
}
var ContactDetail = /** @class */ (function (_super) {
    __extends(ContactDetail, _super);
    function ContactDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContactDetail.prototype.renderSendMessage = function (_a) {
        var hasSignalAccount = _a.hasSignalAccount, i18n = _a.i18n, onSendMessage = _a.onSendMessage;
        if (!hasSignalAccount) {
            return null;
        }
        // We don't want the overall click handler for this element to fire, so we stop
        //   propagation before handing control to the caller's callback.
        var onClick = function (e) {
            e.stopPropagation();
            onSendMessage();
        };
        return (react_1.default.createElement("div", { className: "module-contact-detail__send-message", role: "button", 
            // tslint:disable-next-line react-this-binding-issue
            onClick: onClick },
            react_1.default.createElement("button", { className: "module-contact-detail__send-message__inner" },
                react_1.default.createElement("div", { className: "module-contact-detail__send-message__bubble-icon" }),
                i18n('sendMessageToContact'))));
    };
    ContactDetail.prototype.renderEmail = function (items, i18n) {
        if (!items || items.length === 0) {
            return;
        }
        return items.map(function (item) {
            return (react_1.default.createElement("div", { key: item.value, className: "module-contact-detail__additional-contact" },
                react_1.default.createElement("div", { className: "module-contact-detail__additional-contact__type" }, getLabelForEmail(item, i18n)),
                item.value));
        });
    };
    ContactDetail.prototype.renderPhone = function (items, i18n) {
        if (!items || items.length === 0) {
            return;
        }
        return items.map(function (item) {
            return (react_1.default.createElement("div", { key: item.value, className: "module-contact-detail__additional-contact" },
                react_1.default.createElement("div", { className: "module-contact-detail__additional-contact__type" }, getLabelForPhone(item, i18n)),
                item.value));
        });
    };
    ContactDetail.prototype.renderAddressLine = function (value) {
        if (!value) {
            return;
        }
        return react_1.default.createElement("div", null, value);
    };
    ContactDetail.prototype.renderPOBox = function (poBox, i18n) {
        if (!poBox) {
            return null;
        }
        return (react_1.default.createElement("div", null,
            i18n('poBox'),
            " ",
            poBox));
    };
    ContactDetail.prototype.renderAddressLineTwo = function (address) {
        if (address.city || address.region || address.postcode) {
            return (react_1.default.createElement("div", null,
                address.city,
                " ",
                address.region,
                " ",
                address.postcode));
        }
        return null;
    };
    ContactDetail.prototype.renderAddresses = function (addresses, i18n) {
        var _this = this;
        if (!addresses || addresses.length === 0) {
            return;
        }
        return addresses.map(function (address, index) {
            return (react_1.default.createElement("div", { key: index, className: "module-contact-detail__additional-contact" },
                react_1.default.createElement("div", { className: "module-contact-detail__additional-contact__type" }, getLabelForAddress(address, i18n)),
                _this.renderAddressLine(address.street),
                _this.renderPOBox(address.pobox, i18n),
                _this.renderAddressLine(address.neighborhood),
                _this.renderAddressLineTwo(address),
                _this.renderAddressLine(address.country)));
        });
    };
    ContactDetail.prototype.render = function () {
        var _a = this.props, contact = _a.contact, hasSignalAccount = _a.hasSignalAccount, i18n = _a.i18n, onSendMessage = _a.onSendMessage;
        var isIncoming = false;
        var module = 'contact-detail';
        return (react_1.default.createElement("div", { className: "module-contact-detail" },
            EmbeddedContact_1.renderAvatar({ contact: contact, i18n: i18n, module: module }),
            EmbeddedContact_1.renderName({ contact: contact, isIncoming: isIncoming, module: module }),
            EmbeddedContact_1.renderContactShorthand({ contact: contact, isIncoming: isIncoming, module: module }),
            this.renderSendMessage({ hasSignalAccount: hasSignalAccount, i18n: i18n, onSendMessage: onSendMessage }),
            this.renderPhone(contact.number, i18n),
            this.renderEmail(contact.email, i18n),
            this.renderAddresses(contact.address, i18n)));
    };
    return ContactDetail;
}(react_1.default.Component));
exports.ContactDetail = ContactDetail;
