"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @prettier
 */
const react_1 = __importDefault(require("react"));
class EmptyState extends react_1.default.Component {
    render() {
        const { label } = this.props;
        return react_1.default.createElement("div", { className: "module-empty-state" }, label);
    }
}
exports.EmptyState = EmptyState;
