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
var ContactName_1 = require("./ContactName");
var Intl_1 = require("../Intl");
var missingCaseError_1 = require("../../util/missingCaseError");
var TimerNotification = /** @class */ (function (_super) {
    __extends(TimerNotification, _super);
    function TimerNotification() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimerNotification.prototype.renderContents = function () {
        var _a = this.props, i18n = _a.i18n, name = _a.name, phoneNumber = _a.phoneNumber, profileName = _a.profileName, timespan = _a.timespan, type = _a.type, disabled = _a.disabled;
        switch (type) {
            case 'fromOther':
                return (react_1.default.createElement(Intl_1.Intl, { i18n: i18n, id: disabled ? 'disabledDisappearingMessages' : 'theyChangedTheTimer', components: [
                        react_1.default.createElement(ContactName_1.ContactName, { i18n: i18n, key: "external-1", phoneNumber: phoneNumber, profileName: profileName, name: name }),
                        timespan,
                    ] }));
            case 'fromMe':
                return disabled
                    ? i18n('youDisabledDisappearingMessages')
                    : i18n('youChangedTheTimer', [timespan]);
            case 'fromSync':
                return disabled
                    ? i18n('disappearingMessagesDisabled')
                    : i18n('timerSetOnSync', [timespan]);
            default:
                throw missingCaseError_1.missingCaseError(type);
        }
    };
    TimerNotification.prototype.render = function () {
        var _a = this.props, timespan = _a.timespan, disabled = _a.disabled;
        return (react_1.default.createElement("div", { className: "module-timer-notification" },
            react_1.default.createElement("div", { className: "module-timer-notification__icon-container" },
                react_1.default.createElement("div", { className: classnames_1.default('module-timer-notification__icon', disabled ? 'module-timer-notification__icon--disabled' : null) }),
                react_1.default.createElement("div", { className: "module-timer-notification__icon-label" }, timespan)),
            react_1.default.createElement("div", { className: "module-timer-notification__message" }, this.renderContents())));
    };
    return TimerNotification;
}(react_1.default.Component));
exports.TimerNotification = TimerNotification;
