"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
class ResetSessionNotification extends react_1.default.Component {
    render() {
        const { i18n } = this.props;
        return (react_1.default.createElement("div", { className: "module-reset-session-notification" }, i18n('sessionEnded')));
    }
}
exports.ResetSessionNotification = ResetSessionNotification;
