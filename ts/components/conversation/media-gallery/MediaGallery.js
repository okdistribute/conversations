"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const moment_1 = __importDefault(require("moment"));
const AttachmentSection_1 = require("./AttachmentSection");
const EmptyState_1 = require("./EmptyState");
const groupMessagesByDate_1 = require("./groupMessagesByDate");
const missingCaseError_1 = require("../../../util/missingCaseError");
const MONTH_FORMAT = 'MMMM YYYY';
const Tab = ({ isSelected, label, onSelect, type, }) => {
    const handleClick = onSelect
        ? () => {
            onSelect({ type });
        }
        : undefined;
    return (react_1.default.createElement("div", { className: classnames_1.default('module-media-gallery__tab', isSelected ? 'module-media-gallery__tab--active' : null), onClick: handleClick, role: "tab" }, label));
};
class MediaGallery extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = {
            selectedTab: 'media',
        };
        this.handleTabSelect = (event) => {
            this.setState({ selectedTab: event.type });
        };
    }
    render() {
        const { selectedTab } = this.state;
        return (react_1.default.createElement("div", { className: "module-media-gallery" },
            react_1.default.createElement("div", { className: "module-media-gallery__tab-container" },
                react_1.default.createElement(Tab, { label: "Media", type: "media", isSelected: selectedTab === 'media', onSelect: this.handleTabSelect }),
                react_1.default.createElement(Tab, { label: "Documents", type: "documents", isSelected: selectedTab === 'documents', onSelect: this.handleTabSelect })),
            react_1.default.createElement("div", { className: "module-media-gallery__content" }, this.renderSections())));
    }
    renderSections() {
        const { i18n, media, documents, onItemClick } = this.props;
        const { selectedTab } = this.state;
        const messages = selectedTab === 'media' ? media : documents;
        const type = selectedTab;
        if (!messages || messages.length === 0) {
            const label = (() => {
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
        const now = Date.now();
        const sections = groupMessagesByDate_1.groupMessagesByDate(now, messages).map(section => {
            const first = section.messages[0];
            const date = moment_1.default(first.received_at);
            const header = section.type === 'yearMonth'
                ? date.format(MONTH_FORMAT)
                : i18n(section.type);
            return (react_1.default.createElement(AttachmentSection_1.AttachmentSection, { key: header, header: header, i18n: i18n, type: type, messages: section.messages, onItemClick: onItemClick }));
        });
        return react_1.default.createElement("div", { className: "module-media-gallery__sections" }, sections);
    }
}
exports.MediaGallery = MediaGallery;
