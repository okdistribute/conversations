"use strict";
// tslint:disable:react-a11y-anchors
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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var is_1 = __importDefault(require("@sindresorhus/is"));
var GoogleChrome = __importStar(require("../util/GoogleChrome"));
var MIME = __importStar(require("../types/MIME"));
var Colors = {
    TEXT_SECONDARY: '#bbb',
    ICON_SECONDARY: '#ccc',
};
var colorSVG = function (url, color) {
    return {
        WebkitMask: "url(" + url + ") no-repeat center",
        WebkitMaskSize: '100%',
        backgroundColor: color,
    };
};
var CONTROLS_WIDTH = 50;
var CONTROLS_SPACING = 10;
var styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        paddingTop: 40,
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 0,
    },
    objectContainer: {
        flexGrow: 1,
        display: 'inline-flex',
        justifyContent: 'center',
    },
    object: {
        flexGrow: 1,
        flexShrink: 0,
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
    },
    controlsOffsetPlaceholder: {
        width: CONTROLS_WIDTH,
        marginRight: CONTROLS_SPACING,
        flexShrink: 0,
    },
    controls: {
        width: CONTROLS_WIDTH,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        marginLeft: CONTROLS_SPACING,
    },
    navigationContainer: {
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
    },
    saveButton: {
        marginTop: 10,
    },
    iconButtonPlaceholder: {
        // Dimensions match `.iconButton`:
        display: 'inline-block',
        width: 50,
        height: 50,
    },
};
var IconButton = function (_a) {
    var onClick = _a.onClick, style = _a.style, type = _a.type;
    var clickHandler = function (event) {
        event.preventDefault();
        if (!onClick) {
            return;
        }
        onClick();
    };
    return (react_1.default.createElement("a", { href: "#", onClick: clickHandler, className: classnames_1.default('iconButton', type), role: "button", style: style }));
};
var IconButtonPlaceholder = function () { return (react_1.default.createElement("div", { style: styles.iconButtonPlaceholder })); };
var Icon = function (_a) {
    var onClick = _a.onClick, url = _a.url;
    return (react_1.default.createElement("div", { style: __assign({}, styles.object, colorSVG(url, Colors.ICON_SECONDARY), { maxWidth: 200 }), onClick: onClick, role: "button" }));
};
var Lightbox = /** @class */ (function (_super) {
    __extends(Lightbox, _super);
    function Lightbox(props) {
        var _this = _super.call(this, props) || this;
        _this.containerRef = null;
        _this.videoRef = null;
        _this.renderObject = function (_a) {
            var objectURL = _a.objectURL, contentType = _a.contentType, i18n = _a.i18n;
            var isImageTypeSupported = GoogleChrome.isImageTypeSupported(contentType);
            if (isImageTypeSupported) {
                return (react_1.default.createElement("img", { alt: i18n('lightboxImageAlt'), style: styles.object, src: objectURL, onClick: _this.onObjectClick }));
            }
            var isVideoTypeSupported = GoogleChrome.isVideoTypeSupported(contentType);
            if (isVideoTypeSupported) {
                return (react_1.default.createElement("video", { role: "button", ref: _this.captureVideoBound, onClick: _this.playVideoBound, controls: true, style: styles.object },
                    react_1.default.createElement("source", { src: objectURL })));
            }
            var isUnsupportedImageType = !isImageTypeSupported && MIME.isImage(contentType);
            var isUnsupportedVideoType = !isVideoTypeSupported && MIME.isVideo(contentType);
            if (isUnsupportedImageType || isUnsupportedVideoType) {
                return (react_1.default.createElement(Icon, { url: isUnsupportedVideoType ? 'images/video.svg' : 'images/image.svg', onClick: _this.onObjectClick }));
            }
            // tslint:disable-next-line no-console
            console.log('Lightbox: Unexpected content type', { contentType: contentType });
            return react_1.default.createElement(Icon, { onClick: _this.onObjectClick, url: "images/file.svg" });
        };
        _this.setContainerRef = function (value) {
            _this.containerRef = value;
        };
        _this.onClose = function () {
            var close = _this.props.close;
            if (!close) {
                return;
            }
            close();
        };
        _this.onKeyUp = function (event) {
            var _a = _this.props, onNext = _a.onNext, onPrevious = _a.onPrevious;
            switch (event.key) {
                case 'Escape':
                    _this.onClose();
                    break;
                case 'ArrowLeft':
                    if (onPrevious) {
                        onPrevious();
                    }
                    break;
                case 'ArrowRight':
                    if (onNext) {
                        onNext();
                    }
                    break;
                default:
            }
        };
        _this.onContainerClick = function (event) {
            if (event.target !== _this.containerRef) {
                return;
            }
            _this.onClose();
        };
        _this.onObjectClick = function (event) {
            event.stopPropagation();
            _this.onClose();
        };
        _this.captureVideoBound = _this.captureVideo.bind(_this);
        _this.playVideoBound = _this.playVideo.bind(_this);
        return _this;
    }
    Lightbox.prototype.componentDidMount = function () {
        var useCapture = true;
        document.addEventListener('keyup', this.onKeyUp, useCapture);
        this.playVideo();
    };
    Lightbox.prototype.componentWillUnmount = function () {
        var useCapture = true;
        document.removeEventListener('keyup', this.onKeyUp, useCapture);
    };
    Lightbox.prototype.captureVideo = function (element) {
        this.videoRef = element;
    };
    Lightbox.prototype.playVideo = function () {
        if (!this.videoRef) {
            return;
        }
        if (this.videoRef.paused) {
            // tslint:disable-next-line no-floating-promises
            this.videoRef.play();
        }
        else {
            this.videoRef.pause();
        }
    };
    Lightbox.prototype.render = function () {
        var _a = this.props, contentType = _a.contentType, objectURL = _a.objectURL, onNext = _a.onNext, onPrevious = _a.onPrevious, onSave = _a.onSave, i18n = _a.i18n;
        return (react_1.default.createElement("div", { style: styles.container, onClick: this.onContainerClick, ref: this.setContainerRef, role: "dialog" },
            react_1.default.createElement("div", { style: styles.mainContainer },
                react_1.default.createElement("div", { style: styles.controlsOffsetPlaceholder }),
                react_1.default.createElement("div", { style: styles.objectContainer }, !is_1.default.undefined(contentType)
                    ? this.renderObject({ objectURL: objectURL, contentType: contentType, i18n: i18n })
                    : null),
                react_1.default.createElement("div", { style: styles.controls },
                    react_1.default.createElement(IconButton, { type: "close", onClick: this.onClose }),
                    onSave ? (react_1.default.createElement(IconButton, { type: "save", onClick: onSave, style: styles.saveButton })) : null)),
            react_1.default.createElement("div", { style: styles.navigationContainer },
                onPrevious ? (react_1.default.createElement(IconButton, { type: "previous", onClick: onPrevious })) : (react_1.default.createElement(IconButtonPlaceholder, null)),
                onNext ? (react_1.default.createElement(IconButton, { type: "next", onClick: onNext })) : (react_1.default.createElement(IconButtonPlaceholder, null)))));
    };
    return Lightbox;
}(react_1.default.Component));
exports.Lightbox = Lightbox;
