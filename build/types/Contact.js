"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var PhoneNumber_1 = require("../types/PhoneNumber");
var ContactType;
(function (ContactType) {
    ContactType[ContactType["HOME"] = 1] = "HOME";
    ContactType[ContactType["MOBILE"] = 2] = "MOBILE";
    ContactType[ContactType["WORK"] = 3] = "WORK";
    ContactType[ContactType["CUSTOM"] = 4] = "CUSTOM";
})(ContactType = exports.ContactType || (exports.ContactType = {}));
var AddressType;
(function (AddressType) {
    AddressType[AddressType["HOME"] = 1] = "HOME";
    AddressType[AddressType["WORK"] = 2] = "WORK";
    AddressType[AddressType["CUSTOM"] = 3] = "CUSTOM";
})(AddressType = exports.AddressType || (exports.AddressType = {}));
function contactSelector(contact, options) {
    var getAbsoluteAttachmentPath = options.getAbsoluteAttachmentPath, hasSignalAccount = options.hasSignalAccount, onClick = options.onClick, onSendMessage = options.onSendMessage, regionCode = options.regionCode;
    var avatar = contact.avatar;
    if (avatar && avatar.avatar && avatar.avatar.path) {
        avatar = __assign({}, avatar, { avatar: __assign({}, avatar.avatar, { path: getAbsoluteAttachmentPath(avatar.avatar.path) }) });
    }
    return __assign({}, contact, { hasSignalAccount: hasSignalAccount,
        onSendMessage: onSendMessage,
        onClick: onClick,
        avatar: avatar, number: contact.number &&
            contact.number.map(function (item) { return (__assign({}, item, { value: PhoneNumber_1.format(item.value, {
                    ourRegionCode: regionCode,
                }) })); }) });
}
exports.contactSelector = contactSelector;
function getName(contact) {
    var name = contact.name, organization = contact.organization;
    var displayName = (name && name.displayName) || null;
    var givenName = (name && name.givenName) || null;
    var familyName = (name && name.familyName) || null;
    var backupName = (givenName && familyName && givenName + " " + familyName) || null;
    return displayName || organization || backupName || givenName || familyName;
}
exports.getName = getName;
