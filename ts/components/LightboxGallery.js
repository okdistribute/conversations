"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @prettier
 */
const react_1 = __importDefault(require("react"));
const Lightbox_1 = require("./Lightbox");
const messageToItem = (message) => ({
    objectURL: message.objectURL,
    contentType: message.attachments[0].contentType,
});
class LightboxGallery extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.handlePrevious = () => {
            this.setState(prevState => ({
                selectedIndex: Math.max(prevState.selectedIndex - 1, 0),
            }));
        };
        this.handleNext = () => {
            this.setState((prevState, props) => ({
                selectedIndex: Math.min(prevState.selectedIndex + 1, props.messages.length - 1),
            }));
        };
        this.handleSave = () => {
            const { messages, onSave } = this.props;
            if (!onSave) {
                return;
            }
            const { selectedIndex } = this.state;
            const message = messages[selectedIndex];
            onSave({ message });
        };
        this.state = {
            selectedIndex: this.props.selectedIndex,
        };
    }
    render() {
        const { close, messages, onSave, i18n } = this.props;
        const { selectedIndex } = this.state;
        const selectedMessage = messages[selectedIndex];
        const selectedItem = messageToItem(selectedMessage);
        const firstIndex = 0;
        const onPrevious = selectedIndex > firstIndex ? this.handlePrevious : undefined;
        const lastIndex = messages.length - 1;
        const onNext = selectedIndex < lastIndex ? this.handleNext : undefined;
        const objectURL = selectedItem.objectURL || 'images/alert-outline.svg';
        return (react_1.default.createElement(Lightbox_1.Lightbox, { close: close, onPrevious: onPrevious, onNext: onNext, onSave: onSave ? this.handleSave : undefined, objectURL: objectURL, contentType: selectedItem.contentType, i18n: i18n }));
    }
}
LightboxGallery.defaultProps = {
    selectedIndex: 0,
};
exports.LightboxGallery = LightboxGallery;
