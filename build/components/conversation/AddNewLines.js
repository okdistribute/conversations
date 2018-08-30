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
var AddNewLines = /** @class */ (function (_super) {
    __extends(AddNewLines, _super);
    function AddNewLines() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddNewLines.prototype.render = function () {
        var _a = this.props, text = _a.text, renderNonNewLine = _a.renderNonNewLine;
        var results = [];
        var FIND_NEWLINES = /\n/g;
        // We have to do this, because renderNonNewLine is not required in our Props object,
        //  but it is always provided via defaultProps.
        if (!renderNonNewLine) {
            return;
        }
        var match = FIND_NEWLINES.exec(text);
        var last = 0;
        var count = 1;
        if (!match) {
            return renderNonNewLine({ text: text, key: 0 });
        }
        while (match) {
            if (last < match.index) {
                var textWithNoNewline = text.slice(last, match.index);
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
    };
    AddNewLines.defaultProps = {
        renderNonNewLine: function (_a) {
            var text = _a.text;
            return text;
        },
    };
    return AddNewLines;
}(react_1.default.Component));
exports.AddNewLines = AddNewLines;
