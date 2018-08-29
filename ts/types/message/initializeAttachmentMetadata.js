"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Attachment = __importStar(require("../Attachment"));
const IndexedDB = __importStar(require("../IndexedDB"));
const hasAttachment = (predicate) => (message) => IndexedDB.toIndexablePresence(message.attachments.some(predicate));
const hasFileAttachment = hasAttachment(Attachment.isFile);
const hasVisualMediaAttachment = hasAttachment(Attachment.isVisualMedia);
exports.initializeAttachmentMetadata = (message) => __awaiter(this, void 0, void 0, function* () {
    if (message.type === 'verified-change') {
        return message;
    }
    const hasAttachments = IndexedDB.toIndexableBoolean(message.attachments.length > 0);
    const hasFileAttachments = hasFileAttachment(message);
    const hasVisualMediaAttachments = hasVisualMediaAttachment(message);
    return Object.assign({}, message, { hasAttachments,
        hasFileAttachments,
        hasVisualMediaAttachments });
});
