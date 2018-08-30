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
var AttachmentSection_1 = require("./AttachmentSection");
var EmptyState_1 = require("./EmptyState");
var groupMessagesByDate_1 = require("./groupMessagesByDate");
var missingCaseError_1 = require("../../../util/missingCaseError");
var MONTH_FORMAT = 'MMMM YYYY';
var Tab = function (_a) {
    var isSelected = _a.isSelected, label = _a.label, onSelect = _a.onSelect, type = _a.type;
    var handleClick = onSelect
        ? function () {
            onSelect({ type: type });
        }
        : undefined;
    return (react_1.default.createElement("div", { className: classnames_1.default('module-media-gallery__tab', isSelected ? 'module-media-gallery__tab--active' : null), onClick: handleClick, role: "tab" }, label));
};
var MediaGallery = /** @class */ (function (_super) {
    __extends(MediaGallery, _super);
    function MediaGallery() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            selectedTab: 'media',
        };
        _this.handleTabSelect = function (event) {
            _this.setState({ selectedTab: event.type });
        };
        return _this;
    }
    MediaGallery.prototype.render = function () {
        var selectedTab = this.state.selectedTab;
        return (react_1.default.createElement("div", { className: "module-media-gallery" },
            react_1.default.createElement("div", { className: "module-media-gallery__tab-container" },
                react_1.default.createElement(Tab, { label: "Media", type: "media", isSelected: selectedTab === 'media', onSelect: this.handleTabSelect }),
                react_1.default.createElement(Tab, { label: "Documents", type: "documents", isSelected: selectedTab === 'documents', onSelect: this.handleTabSelect })),
            react_1.default.createElement("div", { className: "module-media-gallery__content" }, this.renderSections())));
    };
    MediaGallery.prototype.renderSections = function () {
        var _a = this.props, i18n = _a.i18n, media = _a.media, documents = _a.documents, onItemClick = _a.onItemClick;
        var selectedTab = this.state.selectedTab;
        var messages = selectedTab === 'media' ? media : documents;
        var type = selectedTab;
        if (!messages || messages.length === 0) {
            var label = (function () {
                switch (type) {
                    case 'media':
                        return i18n('mediaEmptyState');
                    case 'documents':
                        return i18n('documentsEmptyState');
                    default:
                        throw missingCaseError_1.missingCaseError(type);
                }
            })();
            return react_1.default.createElement(EmptyState_1.EmptyState, { "data-test": "EmptyState", label: label });
        }
        var now = Date.now();
        var sections = groupMessagesByDate_1.groupMessagesByDate(now, messages).map(function (section) {
            var first = section.messages[0];
            var date = moment_1.default(first.received_at);
            var header = section.type === 'yearMonth'
                ? date.format(MONTH_FORMAT)
                : i18n(section.type);
            return (react_1.default.createElement(AttachmentSection_1.AttachmentSection, { key: header, header: header, i18n: i18n, type: type, messages: section.messages, onItemClick: onItemClick }));
        });
        return react_1.default.createElement("div", { className: "module-media-gallery__sections" }, sections);
    };
    return MediaGallery;
}(react_1.default.Component));
exports.MediaGallery = MediaGallery;
