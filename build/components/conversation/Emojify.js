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
var is_1 = __importDefault(require("@sindresorhus/is"));
var emoji_1 = require("../../util/emoji");
// Some of this logic taken from emoji-js/replacement
function getImageTag(_a) {
    var match = _a.match, sizeClass = _a.sizeClass, key = _a.key, i18n = _a.i18n;
    var result = emoji_1.getReplacementData(match[0], match[1], match[2]);
    if (is_1.default.string(result)) {
        return react_1.default.createElement("span", { key: key }, match[0]);
    }
    var img = emoji_1.findImage(result.value, result.variation);
    var title = emoji_1.getTitle(result.value);
    return (
    // tslint:disable-next-line react-a11y-img-has-alt
    react_1.default.createElement("img", { key: key, src: img.path, "aria-label": i18n('emojiAlt', [title || '']), className: classnames_1.default('emoji', sizeClass), "data-codepoints": img.full_idx, title: ":" + title + ":" }));
}
var Emojify = /** @class */ (function (_super) {
    __extends(Emojify, _super);
    function Emojify() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Emojify.prototype.render = function () {
        var _a = this.props, text = _a.text, sizeClass = _a.sizeClass, renderNonEmoji = _a.renderNonEmoji, i18n = _a.i18n;
        var results = [];
        var regex = emoji_1.getRegex();
        // We have to do this, because renderNonEmoji is not required in our Props object,
        //  but it is always provided via defaultProps.
        if (!renderNonEmoji) {
            return;
        }
        var match = regex.exec(text);
        var last = 0;
        var count = 1;
        if (!match) {
            return renderNonEmoji({ text: text, key: 0 });
        }
        while (match) {
            if (last < match.index) {
                var textWithNoEmoji = text.slice(last, match.index);
                results.push(renderNonEmoji({ text: textWithNoEmoji, key: count++ }));
            }
            results.push(getImageTag({ match: match, sizeClass: sizeClass, key: count++, i18n: i18n }));
            last = regex.lastIndex;
            match = regex.exec(text);
        }
        if (last < text.length) {
            results.push(renderNonEmoji({ text: text.slice(last), key: count++ }));
        }
        return results;
    };
    Emojify.defaultProps = {
        renderNonEmoji: function (_a) {
            var text = _a.text;
            return text;
        },
    };
    return Emojify;
}(react_1.default.Component));
exports.Emojify = Emojify;
