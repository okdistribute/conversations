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
var Emojify_1 = require("./Emojify");
var ContactName = /** @class */ (function (_super) {
    __extends(ContactName, _super);
    function ContactName() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContactName.prototype.render = function () {
        var _a = this.props, phoneNumber = _a.phoneNumber, name = _a.name, profileName = _a.profileName, i18n = _a.i18n, module = _a.module;
        var prefix = module ? module : 'module-contact-name';
        var title = name ? name : phoneNumber;
        var shouldShowProfile = Boolean(profileName && !name);
        var profileElement = shouldShowProfile ? (react_1.default.createElement("span", { className: prefix + "__profile-name" },
            "~",
            react_1.default.createElement(Emojify_1.Emojify, { text: profileName || '', i18n: i18n }))) : null;
        return (react_1.default.createElement("span", { className: prefix },
            react_1.default.createElement(Emojify_1.Emojify, { text: title, i18n: i18n }),
            shouldShowProfile ? ' ' : null,
            profileElement));
    };
    return ContactName;
}(react_1.default.Component));
exports.ContactName = ContactName;
