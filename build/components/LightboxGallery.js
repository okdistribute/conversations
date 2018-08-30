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
/**
 * @prettier
 */
var react_1 = __importDefault(require("react"));
var Lightbox_1 = require("./Lightbox");
var messageToItem = function (message) { return ({
    objectURL: message.objectURL,
    contentType: message.attachments[0].contentType,
}); };
var LightboxGallery = /** @class */ (function (_super) {
    __extends(LightboxGallery, _super);
    function LightboxGallery(props) {
        var _this = _super.call(this, props) || this;
        _this.handlePrevious = function () {
            _this.setState(function (prevState) { return ({
                selectedIndex: Math.max(prevState.selectedIndex - 1, 0),
            }); });
        };
        _this.handleNext = function () {
            _this.setState(function (prevState, props) { return ({
                selectedIndex: Math.min(prevState.selectedIndex + 1, props.messages.length - 1),
            }); });
        };
        _this.handleSave = function () {
            var _a = _this.props, messages = _a.messages, onSave = _a.onSave;
            if (!onSave) {
                return;
            }
            var selectedIndex = _this.state.selectedIndex;
            var message = messages[selectedIndex];
            onSave({ message: message });
        };
        _this.state = {
            selectedIndex: _this.props.selectedIndex,
        };
        return _this;
    }
    LightboxGallery.prototype.render = function () {
        var _a = this.props, close = _a.close, messages = _a.messages, onSave = _a.onSave, i18n = _a.i18n;
        var selectedIndex = this.state.selectedIndex;
        var selectedMessage = messages[selectedIndex];
        var selectedItem = messageToItem(selectedMessage);
        var firstIndex = 0;
        var onPrevious = selectedIndex > firstIndex ? this.handlePrevious : undefined;
        var lastIndex = messages.length - 1;
        var onNext = selectedIndex < lastIndex ? this.handleNext : undefined;
        var objectURL = selectedItem.objectURL || 'images/alert-outline.svg';
        return (react_1.default.createElement(Lightbox_1.Lightbox, { close: close, onPrevious: onPrevious, onNext: onNext, onSave: onSave ? this.handleSave : undefined, objectURL: objectURL, contentType: selectedItem.contentType, i18n: i18n }));
    };
    LightboxGallery.defaultProps = {
        selectedIndex: 0,
    };
    return LightboxGallery;
}(react_1.default.Component));
exports.LightboxGallery = LightboxGallery;
