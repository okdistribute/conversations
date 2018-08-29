"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const is_1 = __importDefault(require("@sindresorhus/is"));
const emoji_1 = require("../../util/emoji");
// Some of this logic taken from emoji-js/replacement
function getImageTag({ match, sizeClass, key, i18n, }) {
    const result = emoji_1.getReplacementData(match[0], match[1], match[2]);
    if (is_1.default.string(result)) {
        return react_1.default.createElement("span", { key: key }, match[0]);
    }
    const img = emoji_1.findImage(result.value, result.variation);
    const title = emoji_1.getTitle(result.value);
    return (
    // tslint:disable-next-line react-a11y-img-has-alt
    react_1.default.createElement("img", { key: key, src: img.path, "aria-label": i18n('emojiAlt', [title || '']), className: classnames_1.default('emoji', sizeClass), "data-codepoints": img.full_idx, title: `:${title}:` }));
}
class Emojify extends react_1.default.Component {
    render() {
        const { text, sizeClass, renderNonEmoji, i18n } = this.props;
        const results = [];
        const regex = emoji_1.getRegex();
        // We have to do this, because renderNonEmoji is not required in our Props object,
        //  but it is always provided via defaultProps.
        if (!renderNonEmoji) {
            return;
        }
        let match = regex.exec(text);
        let last = 0;
        let count = 1;
        if (!match) {
            return renderNonEmoji({ text, key: 0 });
        }
        while (match) {
            if (last < match.index) {
                const textWithNoEmoji = text.slice(last, match.index);
                results.push(renderNonEmoji({ text: textWithNoEmoji, key: count++ }));
            }
            results.push(getImageTag({ match, sizeClass, key: count++, i18n }));
            last = regex.lastIndex;
            match = regex.exec(text);
        }
        if (last < text.length) {
            results.push(renderNonEmoji({ text: text.slice(last), key: count++ }));
        }
        return results;
    }
}
Emojify.defaultProps = {
    renderNonEmoji: ({ text }) => text,
};
exports.Emojify = Emojify;
