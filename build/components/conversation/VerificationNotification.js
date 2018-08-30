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
// import classNames from 'classnames';
var ContactName_1 = require("./ContactName");
var Intl_1 = require("../Intl");
var missingCaseError_1 = require("../../util/missingCaseError");
var VerificationNotification = /** @class */ (function (_super) {
    __extends(VerificationNotification, _super);
    function VerificationNotification() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VerificationNotification.prototype.getStringId = function () {
        var _a = this.props, isLocal = _a.isLocal, type = _a.type;
        switch (type) {
            case 'markVerified':
                return isLocal
                    ? 'youMarkedAsVerified'
                    : 'youMarkedAsVerifiedOtherDevice';
            case 'markNotVerified':
                return isLocal
                    ? 'youMarkedAsNotVerified'
                    : 'youMarkedAsNotVerifiedOtherDevice';
            default:
                throw missingCaseError_1.missingCaseError(type);
        }
    };
    VerificationNotification.prototype.renderContents = function () {
        var _a = this.props, contact = _a.contact, i18n = _a.i18n;
        var id = this.getStringId();
        return (react_1.default.createElement(Intl_1.Intl, { id: id, components: [
                react_1.default.createElement(ContactName_1.ContactName, { i18n: i18n, key: "external-1", name: contact.name, profileName: contact.profileName, phoneNumber: contact.phoneNumber, module: "module-verification-notification__contact" }),
            ], i18n: i18n }));
    };
    VerificationNotification.prototype.render = function () {
        var type = this.props.type;
        var suffix = type === 'markVerified' ? 'mark-verified' : 'mark-not-verified';
        return (react_1.default.createElement("div", { className: "module-verification-notification" },
            react_1.default.createElement("div", { className: "module-verification-notification__icon--" + suffix }),
            this.renderContents()));
    };
    return VerificationNotification;
}(react_1.default.Component));
exports.VerificationNotification = VerificationNotification;
