"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const ContactName_1 = require("./ContactName");
const Intl_1 = require("../Intl");
const missingCaseError_1 = require("../../util/missingCaseError");
class TimerNotification extends react_1.default.Component {
    renderContents() {
        const { i18n, name, phoneNumber, profileName, timespan, type, disabled, } = this.props;
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
    }
    render() {
        const { timespan, disabled } = this.props;
        return (react_1.default.createElement("div", { className: "module-timer-notification" },
            react_1.default.createElement("div", { className: "module-timer-notification__icon-container" },
                react_1.default.createElement("div", { className: classnames_1.default('module-timer-notification__icon', disabled ? 'module-timer-notification__icon--disabled' : null) }),
                react_1.default.createElement("div", { className: "module-timer-notification__icon-label" }, timespan)),
            react_1.default.createElement("div", { className: "module-timer-notification__message" }, this.renderContents())));
    }
}
exports.TimerNotification = TimerNotification;
