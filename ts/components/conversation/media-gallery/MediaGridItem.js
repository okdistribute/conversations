"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const GoogleChrome_1 = require("../../../util/GoogleChrome");
class MediaGridItem extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageBroken: false,
        };
        this.onImageErrorBound = this.onImageError.bind(this);
    }
    onImageError() {
        // tslint:disable-next-line no-console
        console.log('MediaGridItem: Image failed to load; failing over to placeholder');
        this.setState({
            imageBroken: true,
        });
    }
    renderContent() {
        const { message, i18n } = this.props;
        const { imageBroken } = this.state;
        const { attachments } = message;
        if (!attachments || !attachments.length) {
            return null;
        }
        const first = attachments[0];
        const { contentType } = first;
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
    }
    render() {
        return (react_1.default.createElement("div", { className: "module-media-grid-item", role: "button", onClick: this.props.onClick }, this.renderContent()));
    }
}
exports.MediaGridItem = MediaGridItem;
