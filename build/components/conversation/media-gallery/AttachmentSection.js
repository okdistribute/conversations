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
var DocumentListItem_1 = require("./DocumentListItem");
var MediaGridItem_1 = require("./MediaGridItem");
var missingCaseError_1 = require("../../../util/missingCaseError");
var AttachmentSection = /** @class */ (function (_super) {
    __extends(AttachmentSection, _super);
    function AttachmentSection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.createClickHandler = function (message) { return function () {
            var _a = _this.props, onItemClick = _a.onItemClick, type = _a.type;
            if (!onItemClick) {
                return;
            }
            onItemClick({ type: type, message: message });
        }; };
        return _this;
    }
    AttachmentSection.prototype.render = function () {
        var header = this.props.header;
        return (react_1.default.createElement("div", { className: "module-attachment-section" },
            react_1.default.createElement("h2", { className: "module-attachment-section__header" }, header),
            react_1.default.createElement("div", { className: "module-attachment-section__items" }, this.renderItems())));
    };
    AttachmentSection.prototype.renderItems = function () {
        var _this = this;
        var _a = this.props, i18n = _a.i18n, messages = _a.messages, type = _a.type;
        return messages.map(function (message, index, array) {
            var shouldShowSeparator = index < array.length - 1;
            var attachments = message.attachments;
            var firstAttachment = attachments[0];
            var onClick = _this.createClickHandler(message);
            switch (type) {
                case 'media':
                    return (react_1.default.createElement(MediaGridItem_1.MediaGridItem, { key: message.id, message: message, onClick: onClick, i18n: i18n }));
                case 'documents':
                    return (react_1.default.createElement(DocumentListItem_1.DocumentListItem, { key: message.id, fileName: firstAttachment.fileName, fileSize: firstAttachment.size, shouldShowSeparator: shouldShowSeparator, onClick: onClick, timestamp: message.received_at }));
                default:
                    return missingCaseError_1.missingCaseError(type);
            }
        });
    };
    return AttachmentSection;
}(react_1.default.Component));
exports.AttachmentSection = AttachmentSection;
