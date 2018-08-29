"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const libphonenumberInstance_1 = require("../util/libphonenumberInstance");
function format(phoneNumber, options) {
    try {
        const { ourRegionCode } = options;
        const parsedNumber = libphonenumberInstance_1.instance.parse(phoneNumber);
        const regionCode = libphonenumberInstance_1.instance.getRegionCodeForNumber(parsedNumber);
        if (ourRegionCode && regionCode === ourRegionCode) {
            return libphonenumberInstance_1.instance.format(parsedNumber, libphonenumberInstance_1.PhoneNumberFormat.NATIONAL);
        }
        return libphonenumberInstance_1.instance.format(parsedNumber, libphonenumberInstance_1.PhoneNumberFormat.INTERNATIONAL);
    }
    catch (error) {
        return phoneNumber;
    }
}
exports.format = format;
function parse(phoneNumber, options) {
    const { regionCode } = options;
    const parsedNumber = libphonenumberInstance_1.instance.parse(phoneNumber, regionCode);
    if (libphonenumberInstance_1.instance.isValidNumber(parsedNumber)) {
        return libphonenumberInstance_1.instance.format(parsedNumber, libphonenumberInstance_1.PhoneNumberFormat.E164);
    }
    return phoneNumber;
}
exports.parse = parse;
