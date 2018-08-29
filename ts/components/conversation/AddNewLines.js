"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
class AddNewLines extends react_1.default.Component {
    render() {
        const { text, renderNonNewLine } = this.props;
        const results = [];
        const FIND_NEWLINES = /\n/g;
        // We have to do this, because renderNonNewLine is not required in our Props object,
        //  but it is always provided via defaultProps.
        if (!renderNonNewLine) {
            return;
        }
        let match = FIND_NEWLINES.exec(text);
        let last = 0;
        let count = 1;
        if (!match) {
            return renderNonNewLine({ text, key: 0 });
        }
        while (match) {
            if (last < match.index) {
                const textWithNoNewline = text.slice(last, match.index);
                results.push(renderNonNewLine({ text: textWithNoNewline, key: count++ }));
            }
            results.push(react_1.default.createElement("br", { key: count++ }));
            // @ts-ignore
            last = FIND_NEWLINES.lastIndex;
            match = FIND_NEWLINES.exec(text);
        }
        if (last < text.length) {
            results.push(renderNonNewLine({ text: text.slice(last), key: count++ }));
        }
        return results;
    }
}
AddNewLines.defaultProps = {
    renderNonNewLine: ({ text }) => text,
};
exports.AddNewLines = AddNewLines;
