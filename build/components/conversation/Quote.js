"use strict";
// tslint:disable:react-this-binding-issue
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var MIME = __importStar(require("../../types/MIME"));
var GoogleChrome = __importStar(require("../../util/GoogleChrome"));
var MessageBody_1 = require("./MessageBody");
var ContactName_1 = require("./ContactName");
function validateQuote(quote) {
    if (quote.text) {
        return true;
    }
    if (quote.attachment) {
        return true;
    }
    return false;
}
function getObjectUrl(thumbnail) {
    if (thumbnail && thumbnail.objectUrl) {
        return thumbnail.objectUrl;
    }
    return null;
}
function getTypeLabel(_a) {
    var i18n = _a.i18n, contentType = _a.contentType, isVoiceMessage = _a.isVoiceMessage;
    if (GoogleChrome.isVideoTypeSupported(contentType)) {
        return i18n('video');
    }
    if (GoogleChrome.isImageTypeSupported(contentType)) {
        return i18n('photo');
    }
    if (MIME.isAudio(contentType) && isVoiceMessage) {
        return i18n('voiceMessage');
    }
    if (MIME.isAudio(contentType)) {
        return i18n('audio');
    }
    return null;
}
var Quote = /** @class */ (function (_super) {
    __extends(Quote, _super);
    function Quote() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Quote.prototype.renderImage = function (url, i18n, icon) {
        var iconElement = icon ? (react_1.default.createElement("div", { className: "module-quote__icon-container__inner" },
            react_1.default.createElement("div", { className: "module-quote__icon-container__circle-background" },
                react_1.default.createElement("div", { className: classnames_1.default('module-quote__icon-container__icon', "module-quote__icon-container__icon--" + icon) })))) : null;
        return (react_1.default.createElement("div", { className: "module-quote__icon-container" },
            react_1.default.createElement("img", { src: url, alt: i18n('quoteThumbnailAlt') }),
            iconElement));
    };
    Quote.prototype.renderIcon = function (icon) {
        return (react_1.default.createElement("div", { className: "module-quote__icon-container" },
            react_1.default.createElement("div", { className: "module-quote__icon-container__inner" },
                react_1.default.createElement("div", { className: "module-quote__icon-container__circle-background" },
                    react_1.default.createElement("div", { className: classnames_1.default('module-quote__icon-container__icon', "module-quote__icon-container__icon--" + icon) })))));
    };
    Quote.prototype.renderGenericFile = function () {
        var _a = this.props, attachment = _a.attachment, isIncoming = _a.isIncoming;
        if (!attachment) {
            return;
        }
        var fileName = attachment.fileName, contentType = attachment.contentType;
        var isGenericFile = !GoogleChrome.isVideoTypeSupported(contentType) &&
            !GoogleChrome.isImageTypeSupported(contentType) &&
            !MIME.isAudio(contentType);
        if (!isGenericFile) {
            return null;
        }
        return (react_1.default.createElement("div", { className: "module-quote__generic-file" },
            react_1.default.createElement("div", { className: "module-quote__generic-file__icon" }),
            react_1.default.createElement("div", { className: classnames_1.default('module-quote__generic-file__text', isIncoming ? 'module-quote__generic-file__text--incoming' : null) }, fileName)));
    };
    Quote.prototype.renderIconContainer = function () {
        var _a = this.props, attachment = _a.attachment, i18n = _a.i18n;
        if (!attachment) {
            return null;
        }
        var contentType = attachment.contentType, thumbnail = attachment.thumbnail;
        var objectUrl = getObjectUrl(thumbnail);
        if (GoogleChrome.isVideoTypeSupported(contentType)) {
            return objectUrl
                ? this.renderImage(objectUrl, i18n, 'play')
                : this.renderIcon('movie');
        }
        if (GoogleChrome.isImageTypeSupported(contentType)) {
            return objectUrl
                ? this.renderImage(objectUrl, i18n)
                : this.renderIcon('image');
        }
        if (MIME.isAudio(contentType)) {
            return this.renderIcon('microphone');
        }
        return null;
    };
    Quote.prototype.renderText = function () {
        var _a = this.props, i18n = _a.i18n, text = _a.text, attachment = _a.attachment, isIncoming = _a.isIncoming;
        if (text) {
            return (react_1.default.createElement("div", { dir: "auto", className: classnames_1.default('module-quote__primary__text', isIncoming ? 'module-quote__primary__text--incoming' : null) },
                react_1.default.createElement(MessageBody_1.MessageBody, { text: text, i18n: i18n })));
        }
        if (!attachment) {
            return null;
        }
        var contentType = attachment.contentType, isVoiceMessage = attachment.isVoiceMessage;
        var typeLabel = getTypeLabel({ i18n: i18n, contentType: contentType, isVoiceMessage: isVoiceMessage });
        if (typeLabel) {
            return (react_1.default.createElement("div", { className: classnames_1.default('module-quote__primary__type-label', isIncoming ? 'module-quote__primary__type-label--incoming' : null) }, typeLabel));
        }
        return null;
    };
    Quote.prototype.renderClose = function () {
        var onClose = this.props.onClose;
        if (!onClose) {
            return null;
        }
        // We don't want the overall click handler for the quote to fire, so we stop
        //   propagation before handing control to the caller's callback.
        var onClick = function (e) {
            e.stopPropagation();
            onClose();
        };
        // We need the container to give us the flexibility to implement the iOS design.
        return (react_1.default.createElement("div", { className: "module-quote__close-container" },
            react_1.default.createElement("div", { className: "module-quote__close-button", role: "button", onClick: onClick })));
    };
    Quote.prototype.renderAuthor = function () {
        var _a = this.props, authorProfileName = _a.authorProfileName, authorPhoneNumber = _a.authorPhoneNumber, authorName = _a.authorName, authorColor = _a.authorColor, i18n = _a.i18n, isFromMe = _a.isFromMe, isIncoming = _a.isIncoming;
        return (react_1.default.createElement("div", { className: classnames_1.default('module-quote__primary__author', !isFromMe ? "module-quote__primary__author--" + authorColor : null, isIncoming ? 'module-quote__primary__author--incoming' : null) }, isFromMe ? (i18n('you')) : (react_1.default.createElement(ContactName_1.ContactName, { phoneNumber: authorPhoneNumber, name: authorName, profileName: authorProfileName, i18n: i18n }))));
    };
    Quote.prototype.renderReferenceWarning = function () {
        var _a = this.props, i18n = _a.i18n, isIncoming = _a.isIncoming, referencedMessageNotFound = _a.referencedMessageNotFound;
        if (!referencedMessageNotFound) {
            return null;
        }
        return (react_1.default.createElement("div", { className: classnames_1.default('module-quote__reference-warning', isIncoming ? 'module-quote__reference-warning--incoming' : null) },
            react_1.default.createElement("div", { className: classnames_1.default('module-quote__reference-warning__icon', isIncoming
                    ? 'module-quote__reference-warning__icon--incoming'
                    : null) }),
            react_1.default.createElement("div", { className: classnames_1.default('module-quote__reference-warning__text', isIncoming
                    ? 'module-quote__reference-warning__text--incoming'
                    : null) }, i18n('originalMessageNotFound'))));
    };
    Quote.prototype.render = function () {
        var _a = this.props, authorColor = _a.authorColor, isFromMe = _a.isFromMe, isIncoming = _a.isIncoming, onClick = _a.onClick, referencedMessageNotFound = _a.referencedMessageNotFound, withContentAbove = _a.withContentAbove;
        if (!validateQuote(this.props)) {
            return null;
        }
        return (react_1.default.createElement("div", { className: classnames_1.default('module-quote-container', withContentAbove ? 'module-quote-container--with-content-above' : null) },
            react_1.default.createElement("div", { onClick: onClick, role: "button", className: classnames_1.default('module-quote', isIncoming ? 'module-quote--incoming' : 'module-quote--outgoing', !isIncoming && !isFromMe
                    ? "module-quote--outgoing-" + authorColor
                    : null, !isIncoming && isFromMe ? 'module-quote--outgoing-you' : null, !onClick ? 'module-quote--no-click' : null, withContentAbove ? 'module-quote--with-content-above' : null, referencedMessageNotFound
                    ? 'module-quote--with-reference-warning'
                    : null) },
                react_1.default.createElement("div", { className: "module-quote__primary" },
                    this.renderAuthor(),
                    this.renderGenericFile(),
                    this.renderText()),
                this.renderIconContainer(),
                this.renderClose()),
            this.renderReferenceWarning()));
    };
    return Quote;
}(react_1.default.Component));
exports.Quote = Quote;
