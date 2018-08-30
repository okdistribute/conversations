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
var GoogleChrome_1 = require("../../../util/GoogleChrome");
var MediaGridItem = /** @class */ (function (_super) {
    __extends(MediaGridItem, _super);
    function MediaGridItem(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            imageBroken: false,
        };
        _this.onImageErrorBound = _this.onImageError.bind(_this);
        return _this;
    }
    MediaGridItem.prototype.onImageError = function () {
        // tslint:disable-next-line no-console
        console.log('MediaGridItem: Image failed to load; failing over to placeholder');
        this.setState({
            imageBroken: true,
        });
    };
    MediaGridItem.prototype.renderContent = function () {
        var _a = this.props, message = _a.message, i18n = _a.i18n;
        var imageBroken = this.state.imageBroken;
        var attachments = message.attachments;
        if (!attachments || !attachments.length) {
            return null;
        }
        var first = attachments[0];
        var contentType = first.contentType;
        if (contentType && GoogleChrome_1.isImageTypeSupported(contentType)) {
            if (imageBroken || !message.thumbnailObjectUrl) {
                return (react_1.default.createElement("div", { className: classnames_1.default('module-media-grid-item__icon', 'module-media-grid-item__icon-image') }));
            }
            return (react_1.default.createElement("img", { alt: i18n('lightboxImageAlt'), className: "module-media-grid-item__image", src: message.thumbnailObjectUrl, onError: this.onImageErrorBound }));
        }
        else if (contentType && GoogleChrome_1.isVideoTypeSupported(contentType)) {
            if (imageBroken || !message.thumbnailObjectUrl) {
                return (react_1.default.createElement("div", { className: classnames_1.default('module-media-grid-item__icon', 'module-media-grid-item__icon-video') }));
            }
            return (react_1.default.createElement("div", { className: "module-media-grid-item__image-container" },
                react_1.default.createElement("img", { alt: i18n('lightboxImageAlt'), className: "module-media-grid-item__image", src: message.thumbnailObjectUrl, onError: this.onImageErrorBound }),
                react_1.default.createElement("div", { className: "module-media-grid-item__circle-overlay" },
                    react_1.default.createElement("div", { className: "module-media-grid-item__play-overlay" }))));
        }
        return (react_1.default.createElement("div", { className: classnames_1.default('module-media-grid-item__icon', 'module-media-grid-item__icon-generic') }));
    };
    MediaGridItem.prototype.render = function () {
        return (react_1.default.createElement("div", { className: "module-media-grid-item", role: "button", onClick: this.props.onClick }, this.renderContent()));
    };
    return MediaGridItem;
}(react_1.default.Component));
exports.MediaGridItem = MediaGridItem;
