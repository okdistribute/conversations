"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
/**
 * Provides the parent elements necessary to allow the main Signal Desktop stylesheet to
 * apply (with no changes) to messages in the Style Guide.
 */
class ConversationContext extends react_1.default.Component {
    render() {
        const { theme, type, ios } = this.props;
        return (react_1.default.createElement("div", { className: classnames_1.default(theme || 'light-theme', ios ? 'ios-theme' : null) },
            react_1.default.createElement("div", { className: classnames_1.default('conversation', type || 'private') },
                react_1.default.createElement("div", { className: "discussion-container", style: { padding: '0.5em' } },
                    react_1.default.createElement("ul", { className: "message-list" }, this.props.children)))));
    }
}
exports.ConversationContext = ConversationContext;
