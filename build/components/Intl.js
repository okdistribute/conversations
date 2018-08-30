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
var Intl = /** @class */ (function (_super) {
    __extends(Intl, _super);
    function Intl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Intl.prototype.getComponent = function (index) {
        var _a = this.props, id = _a.id, components = _a.components;
        if (!components || !components.length || components.length <= index) {
            // tslint:disable-next-line no-console
            console.log("Error: Intl missing provided components for id " + id + ", index " + index);
            return null;
        }
        return components[index];
    };
    Intl.prototype.render = function () {
        var _a = this.props, id = _a.id, i18n = _a.i18n, renderText = _a.renderText;
        var text = i18n(id);
        var results = [];
        var FIND_REPLACEMENTS = /\$[^$]+\$/g;
        // We have to do this, because renderText is not required in our Props object,
        //   but it is always provided via defaultProps.
        if (!renderText) {
            return;
        }
        var componentIndex = 0;
        var key = 0;
        var lastTextIndex = 0;
        var match = FIND_REPLACEMENTS.exec(text);
        if (!match) {
            return renderText({ text: text, key: 0 });
        }
        while (match) {
            if (lastTextIndex < match.index) {
                var textWithNoReplacements = text.slice(lastTextIndex, match.index);
                results.push(renderText({ text: textWithNoReplacements, key: key }));
                key += 1;
            }
            results.push(this.getComponent(componentIndex));
            componentIndex += 1;
            // @ts-ignore
            lastTextIndex = FIND_REPLACEMENTS.lastIndex;
            match = FIND_REPLACEMENTS.exec(text);
        }
        if (lastTextIndex < text.length) {
            results.push(renderText({ text: text.slice(lastTextIndex), key: key }));
            key += 1;
        }
        return results;
    };
    Intl.defaultProps = {
        renderText: function (_a) {
            var text = _a.text;
            return text;
        },
    };
    return Intl;
}(react_1.default.Component));
exports.Intl = Intl;
