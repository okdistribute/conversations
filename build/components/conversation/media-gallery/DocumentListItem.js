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
var moment_1 = __importDefault(require("moment"));
// tslint:disable-next-line:match-default-export-name
var filesize_1 = __importDefault(require("filesize"));
var DocumentListItem = /** @class */ (function (_super) {
    __extends(DocumentListItem, _super);
    function DocumentListItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DocumentListItem.prototype.render = function () {
        var shouldShowSeparator = this.props.shouldShowSeparator;
        return (react_1.default.createElement("div", { className: classnames_1.default('module-document-list-item', shouldShowSeparator
                ? 'module-document-list-item--with-separator'
                : null) }, this.renderContent()));
    };
    DocumentListItem.prototype.renderContent = function () {
        var _a = this.props, fileName = _a.fileName, fileSize = _a.fileSize, timestamp = _a.timestamp;
        return (react_1.default.createElement("div", { className: "module-document-list-item__content", role: "button", onClick: this.props.onClick },
            react_1.default.createElement("div", { className: "module-document-list-item__icon" }),
            react_1.default.createElement("div", { className: "module-document-list-item__metadata" },
                react_1.default.createElement("span", { className: "module-document-list-item__file-name" }, fileName),
                react_1.default.createElement("span", { className: "module-document-list-item__file-size" }, typeof fileSize === 'number' ? filesize_1.default(fileSize) : '')),
            react_1.default.createElement("div", { className: "module-document-list-item__date" }, moment_1.default(timestamp).format('ddd, MMM D, Y'))));
    };
    DocumentListItem.defaultProps = {
        shouldShowSeparator: true,
    };
    return DocumentListItem;
}(react_1.default.Component));
exports.DocumentListItem = DocumentListItem;
