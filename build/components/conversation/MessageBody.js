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
var emoji_1 = require("../../util/emoji");
var Emojify_1 = require("./Emojify");
var AddNewLines_1 = require("./AddNewLines");
var Linkify_1 = require("./Linkify");
var renderNewLines = function (_a) {
    var textWithNewLines = _a.text, key = _a.key;
    return react_1.default.createElement(AddNewLines_1.AddNewLines, { key: key, text: textWithNewLines });
};
var renderLinks = function (_a) {
    var textWithLinks = _a.text, key = _a.key;
    return (react_1.default.createElement(Linkify_1.Linkify, { key: key, text: textWithLinks, renderNonLink: renderNewLines }));
};
/**
 * This component makes it very easy to use all three of our message formatting
 * components: `Emojify`, `Linkify`, and `AddNewLines`. Because each of them is fully
 * configurable with their `renderXXX` props, this component will assemble all three of
 * them for you.
 */
var MessageBody = /** @class */ (function (_super) {
    __extends(MessageBody, _super);
    function MessageBody() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MessageBody.prototype.render = function () {
        var _a = this.props, text = _a.text, disableJumbomoji = _a.disableJumbomoji, disableLinks = _a.disableLinks, i18n = _a.i18n;
        var sizeClass = disableJumbomoji ? '' : emoji_1.getSizeClass(text);
        return (react_1.default.createElement(Emojify_1.Emojify, { text: text, sizeClass: sizeClass, renderNonEmoji: disableLinks ? renderNewLines : renderLinks, i18n: i18n }));
    };
    return MessageBody;
}(react_1.default.Component));
exports.MessageBody = MessageBody;
