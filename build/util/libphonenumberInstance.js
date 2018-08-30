"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var google_libphonenumber_1 = __importDefault(require("google-libphonenumber"));
var instance = google_libphonenumber_1.default.PhoneNumberUtil.getInstance();
exports.instance = instance;
var PhoneNumberFormat = google_libphonenumber_1.default.PhoneNumberFormat;
exports.PhoneNumberFormat = PhoneNumberFormat;
