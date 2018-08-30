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
/**
 * Provides the parent elements necessary to allow the main Signal Desktop stylesheet to
 * apply (with no changes) to messages in the Style Guide.
 */
var ConversationContext = /** @class */ (function (_super) {
    __extends(ConversationContext, _super);
    function ConversationContext() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConversationContext.prototype.render = function () {
        var _a = this.props, theme = _a.theme, type = _a.type, ios = _a.ios;
        return (react_1.default.createElement("div", { className: classnames_1.default(theme || 'light-theme', ios ? 'ios-theme' : null) },
            react_1.default.createElement("div", { className: classnames_1.default('conversation', type || 'private') },
                react_1.default.createElement("div", { className: "discussion-container", style: { padding: '0.5em' } },
                    react_1.default.createElement("ul", { className: "message-list" }, this.props.children)))));
    };
    return ConversationContext;
}(react_1.default.Component));
exports.ConversationContext = ConversationContext;
