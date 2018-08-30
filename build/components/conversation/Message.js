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
var GoogleChrome_1 = require("../../util/GoogleChrome");
var MessageBody_1 = require("./MessageBody");
var ExpireTimer_1 = require("./ExpireTimer");
var Timestamp_1 = require("./Timestamp");
var ContactName_1 = require("./ContactName");
var Quote_1 = require("./Quote");
var EmbeddedContact_1 = require("./EmbeddedContact");
var react_contextmenu_1 = require("react-contextmenu");
var MIME = __importStar(require("../../types/MIME"));
function isImage(attachment) {
    return (attachment &&
        attachment.contentType &&
        GoogleChrome_1.isImageTypeSupported(attachment.contentType));
}
function hasImage(attachment) {
    return attachment && attachment.url;
}
function isVideo(attachment) {
    return (attachment &&
        attachment.contentType &&
        GoogleChrome_1.isVideoTypeSupported(attachment.contentType));
}
function hasVideoScreenshot(attachment) {
    return attachment && attachment.screenshot && attachment.screenshot.url;
}
function isAudio(attachment) {
    return (attachment && attachment.contentType && MIME.isAudio(attachment.contentType));
}
function getInitial(name) {
    return name.trim()[0] || '#';
}
function getExtension(_a) {
    var fileName = _a.fileName, contentType = _a.contentType;
    if (fileName && fileName.indexOf('.') >= 0) {
        var lastPeriod = fileName.lastIndexOf('.');
        var extension = fileName.slice(lastPeriod + 1);
        if (extension.length) {
            return extension;
        }
    }
    var slash = contentType.indexOf('/');
    if (slash >= 0) {
        return contentType.slice(slash + 1);
    }
    return null;
}
var MINIMUM_IMG_HEIGHT = 150;
var MAXIMUM_IMG_HEIGHT = 300;
var EXPIRATION_CHECK_MINIMUM = 2000;
var EXPIRED_DELAY = 600;
var Message = /** @class */ (function (_super) {
    __extends(Message, _super);
    function Message(props) {
        var _this = _super.call(this, props) || this;
        _this.captureMenuTriggerBound = _this.captureMenuTrigger.bind(_this);
        _this.showMenuBound = _this.showMenu.bind(_this);
        _this.handleImageErrorBound = _this.handleImageError.bind(_this);
        _this.menuTriggerRef = null;
        _this.expirationCheckInterval = null;
        _this.expiredTimeout = null;
        _this.state = {
            expiring: false,
            expired: false,
            imageBroken: false,
        };
        return _this;
    }
    Message.prototype.componentDidMount = function () {
        var _this = this;
        var expirationLength = this.props.expirationLength;
        if (!expirationLength) {
            return;
        }
        var increment = ExpireTimer_1.getIncrement(expirationLength);
        var checkFrequency = Math.max(EXPIRATION_CHECK_MINIMUM, increment);
        this.checkExpired();
        this.expirationCheckInterval = setInterval(function () {
            _this.checkExpired();
        }, checkFrequency);
    };
    Message.prototype.componentWillUnmount = function () {
        if (this.expirationCheckInterval) {
            clearInterval(this.expirationCheckInterval);
        }
        if (this.expiredTimeout) {
            clearTimeout(this.expiredTimeout);
        }
    };
    Message.prototype.checkExpired = function () {
        var _this = this;
        var now = Date.now();
        var _a = this.props, expirationTimestamp = _a.expirationTimestamp, expirationLength = _a.expirationLength;
        if (!expirationTimestamp || !expirationLength) {
            return;
        }
        if (now >= expirationTimestamp) {
            this.setState({
                expiring: true,
            });
            var setExpired = function () {
                _this.setState({
                    expired: true,
                });
            };
            this.expiredTimeout = setTimeout(setExpired, EXPIRED_DELAY);
        }
    };
    Message.prototype.handleImageError = function () {
        // tslint:disable-next-line no-console
        console.log('Message: Image failed to load; failing over to placeholder');
        this.setState({
            imageBroken: true,
        });
    };
    Message.prototype.renderMetadata = function () {
        var _a = this.props, attachment = _a.attachment, collapseMetadata = _a.collapseMetadata, direction = _a.direction, expirationLength = _a.expirationLength, expirationTimestamp = _a.expirationTimestamp, i18n = _a.i18n, status = _a.status, text = _a.text, timestamp = _a.timestamp;
        var imageBroken = this.state.imageBroken;
        if (collapseMetadata) {
            return null;
        }
        var withImageNoCaption = Boolean(!text &&
            !imageBroken &&
            ((isImage(attachment) && hasImage(attachment)) ||
                (isVideo(attachment) && hasVideoScreenshot(attachment))));
        var showError = status === 'error' && direction === 'outgoing';
        return (react_1.default.createElement("div", { className: classnames_1.default('module-message__metadata', withImageNoCaption
                ? 'module-message__metadata--with-image-no-caption'
                : null) },
            showError ? (react_1.default.createElement("span", { className: classnames_1.default('module-message__metadata__date', "module-message__metadata__date--" + direction, withImageNoCaption
                    ? 'module-message__metadata__date--with-image-no-caption'
                    : null) }, i18n('sendFailed'))) : (react_1.default.createElement(Timestamp_1.Timestamp, { i18n: i18n, timestamp: timestamp, extended: true, direction: direction, withImageNoCaption: withImageNoCaption, module: "module-message__metadata__date" })),
            expirationLength && expirationTimestamp ? (react_1.default.createElement(ExpireTimer_1.ExpireTimer, { direction: direction, expirationLength: expirationLength, expirationTimestamp: expirationTimestamp, withImageNoCaption: withImageNoCaption })) : null,
            react_1.default.createElement("span", { className: "module-message__metadata__spacer" }),
            direction === 'outgoing' && status !== 'error' ? (react_1.default.createElement("div", { className: classnames_1.default('module-message__metadata__status-icon', "module-message__metadata__status-icon--" + status, withImageNoCaption
                    ? 'module-message__metadata__status-icon--with-image-no-caption'
                    : null) })) : null));
    };
    Message.prototype.renderAuthor = function () {
        var _a = this.props, authorName = _a.authorName, authorPhoneNumber = _a.authorPhoneNumber, authorProfileName = _a.authorProfileName, conversationType = _a.conversationType, direction = _a.direction, i18n = _a.i18n;
        var title = authorName ? authorName : authorPhoneNumber;
        if (direction !== 'incoming' || conversationType !== 'group' || !title) {
            return null;
        }
        return (react_1.default.createElement("div", { className: "module-message__author" },
            react_1.default.createElement(ContactName_1.ContactName, { phoneNumber: authorPhoneNumber, name: authorName, profileName: authorProfileName, module: "module-message__author", i18n: i18n })));
    };
    // tslint:disable-next-line max-func-body-length cyclomatic-complexity
    Message.prototype.renderAttachment = function () {
        var _a = this.props, i18n = _a.i18n, attachment = _a.attachment, text = _a.text, collapseMetadata = _a.collapseMetadata, conversationType = _a.conversationType, direction = _a.direction, quote = _a.quote, onClickAttachment = _a.onClickAttachment;
        var imageBroken = this.state.imageBroken;
        if (!attachment) {
            return null;
        }
        var withCaption = Boolean(text);
        // For attachments which aren't full-frame
        var withContentBelow = withCaption || !collapseMetadata;
        var withContentAbove = quote || (conversationType === 'group' && direction === 'incoming');
        if (isImage(attachment)) {
            if (imageBroken || !attachment.url) {
                return (react_1.default.createElement("div", { className: classnames_1.default('module-message__broken-image', "module-message__broken-image--" + direction) }, i18n('imageFailedToLoad')));
            }
            // Calculating height to prevent reflow when image loads
            var height = Math.max(MINIMUM_IMG_HEIGHT, attachment.height || 0);
            return (react_1.default.createElement("div", { onClick: onClickAttachment, role: "button", className: classnames_1.default('module-message__attachment-container', withCaption
                    ? 'module-message__attachment-container--with-content-below'
                    : null, withContentAbove
                    ? 'module-message__attachment-container--with-content-above'
                    : null) },
                react_1.default.createElement("img", { onError: this.handleImageErrorBound, className: "module-message__img-attachment", height: Math.min(MAXIMUM_IMG_HEIGHT, height), src: attachment.url, alt: i18n('imageAttachmentAlt') }),
                react_1.default.createElement("div", { className: classnames_1.default('module-message__img-border-overlay', withCaption
                        ? 'module-message__img-border-overlay--with-content-below'
                        : null, withContentAbove
                        ? 'module-message__img-border-overlay--with-content-above'
                        : null) }),
                !withCaption && !collapseMetadata ? (react_1.default.createElement("div", { className: "module-message__img-overlay" })) : null));
        }
        else if (isVideo(attachment)) {
            var screenshot = attachment.screenshot;
            if (imageBroken || !screenshot || !screenshot.url) {
                return (react_1.default.createElement("div", { role: "button", onClick: onClickAttachment, className: classnames_1.default('module-message__broken-video-screenshot', "module-message__broken-video-screenshot--" + direction) }, i18n('videoScreenshotFailedToLoad')));
            }
            // Calculating height to prevent reflow when image loads
            var height = Math.max(MINIMUM_IMG_HEIGHT, screenshot.height || 0);
            return (react_1.default.createElement("div", { onClick: onClickAttachment, role: "button", className: classnames_1.default('module-message__attachment-container', withCaption
                    ? 'module-message__attachment-container--with-content-below'
                    : null, withContentAbove
                    ? 'module-message__attachment-container--with-content-above'
                    : null) },
                react_1.default.createElement("img", { onError: this.handleImageErrorBound, className: "module-message__img-attachment", alt: i18n('videoAttachmentAlt'), height: Math.min(MAXIMUM_IMG_HEIGHT, height), src: screenshot.url }),
                react_1.default.createElement("div", { className: classnames_1.default('module-message__img-border-overlay', withCaption
                        ? 'module-message__img-border-overlay--with-content-below'
                        : null, withContentAbove
                        ? 'module-message__img-border-overlay--with-content-above'
                        : null) }),
                !withCaption && !collapseMetadata ? (react_1.default.createElement("div", { className: "module-message__img-overlay" })) : null,
                react_1.default.createElement("div", { className: "module-message__video-overlay__circle" },
                    react_1.default.createElement("div", { className: "module-message__video-overlay__play-icon" }))));
        }
        else if (isAudio(attachment)) {
            return (react_1.default.createElement("audio", { controls: true, className: classnames_1.default('module-message__audio-attachment', withContentBelow
                    ? 'module-message__audio-attachment--with-content-below'
                    : null, withContentAbove
                    ? 'module-message__audio-attachment--with-content-above'
                    : null) },
                react_1.default.createElement("source", { src: attachment.url })));
        }
        else {
            var fileName = attachment.fileName, fileSize = attachment.fileSize, contentType = attachment.contentType;
            var extension = getExtension({ contentType: contentType, fileName: fileName });
            return (react_1.default.createElement("div", { className: classnames_1.default('module-message__generic-attachment', withContentBelow
                    ? 'module-message__generic-attachment--with-content-below'
                    : null, withContentAbove
                    ? 'module-message__generic-attachment--with-content-above'
                    : null) },
                react_1.default.createElement("div", { className: "module-message__generic-attachment__icon" }, extension ? (react_1.default.createElement("div", { className: "module-message__generic-attachment__icon__extension" }, extension)) : null),
                react_1.default.createElement("div", { className: "module-message__generic-attachment__text" },
                    react_1.default.createElement("div", { className: classnames_1.default('module-message__generic-attachment__file-name', "module-message__generic-attachment__file-name--" + direction) }, fileName),
                    react_1.default.createElement("div", { className: classnames_1.default('module-message__generic-attachment__file-size', "module-message__generic-attachment__file-size--" + direction) }, fileSize))));
        }
    };
    Message.prototype.renderQuote = function () {
        var _a = this.props, conversationType = _a.conversationType, direction = _a.direction, i18n = _a.i18n, quote = _a.quote;
        if (!quote) {
            return null;
        }
        var withContentAbove = conversationType === 'group' && direction === 'incoming';
        return (react_1.default.createElement(Quote_1.Quote, { i18n: i18n, onClick: quote.onClick, text: quote.text, attachment: quote.attachment, isIncoming: direction === 'incoming', authorPhoneNumber: quote.authorPhoneNumber, authorProfileName: quote.authorProfileName, authorName: quote.authorName, authorColor: quote.authorColor, referencedMessageNotFound: quote.referencedMessageNotFound, isFromMe: quote.isFromMe, withContentAbove: withContentAbove }));
    };
    Message.prototype.renderEmbeddedContact = function () {
        var _a = this.props, collapseMetadata = _a.collapseMetadata, contact = _a.contact, conversationType = _a.conversationType, direction = _a.direction, i18n = _a.i18n, text = _a.text;
        if (!contact) {
            return null;
        }
        var withCaption = Boolean(text);
        var withContentAbove = conversationType === 'group' && direction === 'incoming';
        var withContentBelow = withCaption || !collapseMetadata;
        return (react_1.default.createElement(EmbeddedContact_1.EmbeddedContact, { contact: contact, hasSignalAccount: contact.hasSignalAccount, isIncoming: direction === 'incoming', i18n: i18n, onClick: contact.onClick, withContentAbove: withContentAbove, withContentBelow: withContentBelow }));
    };
    Message.prototype.renderSendMessageButton = function () {
        var _a = this.props, contact = _a.contact, i18n = _a.i18n;
        if (!contact || !contact.hasSignalAccount) {
            return null;
        }
        return (react_1.default.createElement("div", { role: "button", onClick: contact.onSendMessage, className: "module-message__send-message-button" }, i18n('sendMessageToContact')));
    };
    Message.prototype.renderAvatar = function () {
        var _a = this.props, authorName = _a.authorName, authorPhoneNumber = _a.authorPhoneNumber, authorProfileName = _a.authorProfileName, authorAvatarPath = _a.authorAvatarPath, authorColor = _a.authorColor, collapseMetadata = _a.collapseMetadata, conversationType = _a.conversationType, direction = _a.direction, i18n = _a.i18n;
        var title = "" + (authorName || authorPhoneNumber) + (!authorName && authorProfileName ? " ~" + authorProfileName : '');
        if (collapseMetadata ||
            conversationType !== 'group' ||
            direction === 'outgoing') {
            return;
        }
        if (!authorAvatarPath) {
            var label = authorName ? getInitial(authorName) : '#';
            return (react_1.default.createElement("div", { className: classnames_1.default('module-message__author-default-avatar', "module-message__author-default-avatar--" + authorColor) },
                react_1.default.createElement("div", { className: "module-message__author-default-avatar__label" }, label)));
        }
        return (react_1.default.createElement("div", { className: "module-message__author-avatar" },
            react_1.default.createElement("img", { alt: i18n('contactAvatarAlt', [title]), src: authorAvatarPath })));
    };
    Message.prototype.renderText = function () {
        var _a = this.props, text = _a.text, i18n = _a.i18n, direction = _a.direction, status = _a.status;
        var contents = direction === 'incoming' && status === 'error'
            ? i18n('incomingError')
            : text;
        if (!contents) {
            return null;
        }
        return (react_1.default.createElement("div", { dir: "auto", className: classnames_1.default('module-message__text', "module-message__text--" + direction, status === 'error' && direction === 'incoming'
                ? 'module-message__text--error'
                : null) },
            react_1.default.createElement(MessageBody_1.MessageBody, { text: contents || '', i18n: i18n })));
    };
    Message.prototype.renderError = function (isCorrectSide) {
        var _a = this.props, status = _a.status, direction = _a.direction;
        if (!isCorrectSide || status !== 'error') {
            return null;
        }
        return (react_1.default.createElement("div", { className: "module-message__error-container" },
            react_1.default.createElement("div", { className: classnames_1.default('module-message__error', "module-message__error--" + direction) })));
    };
    Message.prototype.captureMenuTrigger = function (triggerRef) {
        this.menuTriggerRef = triggerRef;
    };
    Message.prototype.showMenu = function (event) {
        if (this.menuTriggerRef) {
            this.menuTriggerRef.handleContextClick(event);
        }
    };
    Message.prototype.renderMenu = function (isCorrectSide, triggerId) {
        var _a = this.props, attachment = _a.attachment, direction = _a.direction, disableMenu = _a.disableMenu, onDownload = _a.onDownload, onReply = _a.onReply;
        if (!isCorrectSide || disableMenu) {
            return null;
        }
        var downloadButton = attachment ? (react_1.default.createElement("div", { onClick: onDownload, role: "button", className: classnames_1.default('module-message__buttons__download', "module-message__buttons__download--" + direction) })) : null;
        var replyButton = (react_1.default.createElement("div", { onClick: onReply, role: "button", className: classnames_1.default('module-message__buttons__reply', "module-message__buttons__download--" + direction) }));
        var menuButton = (react_1.default.createElement(react_contextmenu_1.ContextMenuTrigger, { id: triggerId, ref: this.captureMenuTriggerBound },
            react_1.default.createElement("div", { role: "button", onClick: this.showMenuBound, className: classnames_1.default('module-message__buttons__menu', "module-message__buttons__download--" + direction) })));
        var first = direction === 'incoming' ? downloadButton : menuButton;
        var last = direction === 'incoming' ? menuButton : downloadButton;
        return (react_1.default.createElement("div", { className: classnames_1.default('module-message__buttons', "module-message__buttons--" + direction) },
            first,
            replyButton,
            last));
    };
    Message.prototype.renderContextMenu = function (triggerId) {
        var _a = this.props, attachment = _a.attachment, direction = _a.direction, status = _a.status, onDelete = _a.onDelete, onDownload = _a.onDownload, onReply = _a.onReply, onRetrySend = _a.onRetrySend, onShowDetail = _a.onShowDetail, i18n = _a.i18n;
        var showRetry = status === 'error' && direction === 'outgoing';
        return (react_1.default.createElement(react_contextmenu_1.ContextMenu, { id: triggerId },
            attachment ? (react_1.default.createElement(react_contextmenu_1.MenuItem, { attributes: {
                    className: 'module-message__context__download',
                }, onClick: onDownload }, i18n('downloadAttachment'))) : null,
            react_1.default.createElement(react_contextmenu_1.MenuItem, { attributes: {
                    className: 'module-message__context__reply',
                }, onClick: onReply }, i18n('replyToMessage')),
            react_1.default.createElement(react_contextmenu_1.MenuItem, { attributes: {
                    className: 'module-message__context__more-info',
                }, onClick: onShowDetail }, i18n('moreInfo')),
            showRetry ? (react_1.default.createElement(react_contextmenu_1.MenuItem, { attributes: {
                    className: 'module-message__context__retry-send',
                }, onClick: onRetrySend }, i18n('retrySend'))) : null,
            react_1.default.createElement(react_contextmenu_1.MenuItem, { attributes: {
                    className: 'module-message__context__delete-message',
                }, onClick: onDelete }, i18n('deleteMessage'))));
    };
    Message.prototype.render = function () {
        var _a = this.props, authorPhoneNumber = _a.authorPhoneNumber, authorColor = _a.authorColor, direction = _a.direction, id = _a.id, timestamp = _a.timestamp;
        var _b = this.state, expired = _b.expired, expiring = _b.expiring;
        // This id is what connects our triple-dot click with our associated pop-up menu.
        //   It needs to be unique.
        var triggerId = String(id || authorPhoneNumber + "-" + timestamp);
        if (expired) {
            return null;
        }
        return (react_1.default.createElement("div", { className: classnames_1.default('module-message', "module-message--" + direction, expiring ? 'module-message--expired' : null) },
            this.renderError(direction === 'incoming'),
            this.renderMenu(direction === 'outgoing', triggerId),
            react_1.default.createElement("div", { className: classnames_1.default('module-message__container', "module-message__container--" + direction, direction === 'incoming'
                    ? "module-message__container--incoming-" + authorColor
                    : null) },
                this.renderAuthor(),
                this.renderQuote(),
                this.renderAttachment(),
                this.renderEmbeddedContact(),
                this.renderText(),
                this.renderMetadata(),
                this.renderSendMessageButton(),
                this.renderAvatar()),
            this.renderError(direction === 'outgoing'),
            this.renderMenu(direction === 'incoming', triggerId),
            this.renderContextMenu(triggerId)));
    };
    return Message;
}(react_1.default.Component));
exports.Message = Message;
