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
var linkify_it_1 = __importDefault(require("linkify-it"));
var linkify = linkify_it_1.default();
var SUPPORTED_PROTOCOLS = /^(http|https):/i;
var Linkify = /** @class */ (function (_super) {
    __extends(Linkify, _super);
    function Linkify() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Linkify.prototype.render = function () {
        var _a = this.props, text = _a.text, renderNonLink = _a.renderNonLink;
        var matchData = linkify.match(text) || [];
        var results = [];
        var last = 0;
        var count = 1;
        // We have to do this, because renderNonLink is not required in our Props object,
        //  but it is always provided via defaultProps.
        if (!renderNonLink) {
            return;
        }
        if (matchData.length === 0) {
            return renderNonLink({ text: text, key: 0 });
        }
        matchData.forEach(function (match) {
            if (last < match.index) {
                var textWithNoLink = text.slice(last, match.index);
                results.push(renderNonLink({ text: textWithNoLink, key: count++ }));
            }
            var url = match.url, originalText = match.text;
            if (SUPPORTED_PROTOCOLS.test(url)) {
                results.push(react_1.default.createElement("a", { key: count++, href: url }, originalText));
            }
            else {
                results.push(renderNonLink({ text: originalText, key: count++ }));
            }
            last = match.lastIndex;
        });
        if (last < text.length) {
            results.push(renderNonLink({ text: text.slice(last), key: count++ }));
        }
        return results;
    };
    Linkify.defaultProps = {
        renderNonLink: function (_a) {
            var text = _a.text;
            return text;
        },
    };
    return Linkify;
}(react_1.default.Component));
exports.Linkify = Linkify;
