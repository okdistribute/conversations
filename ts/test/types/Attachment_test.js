"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Attachment = __importStar(require("../../types/Attachment"));
const MIME = __importStar(require("../../types/MIME"));
// @ts-ignore
const string_to_array_buffer_1 = require("../../../js/modules/string_to_array_buffer");
describe('Attachment', () => {
    describe('getFileExtension', () => {
        it('should return file extension from content type', () => {
            const input = {
                data: string_to_array_buffer_1.stringToArrayBuffer('foo'),
                contentType: MIME.IMAGE_GIF,
            };
            chai_1.assert.strictEqual(Attachment.getFileExtension(input), 'gif');
        });
        it('should return file extension for QuickTime videos', () => {
            const input = {
                data: string_to_array_buffer_1.stringToArrayBuffer('foo'),
                contentType: MIME.VIDEO_QUICKTIME,
            };
            chai_1.assert.strictEqual(Attachment.getFileExtension(input), 'mov');
        });
    });
    describe('getSuggestedFilename', () => {
        context('for attachment with filename', () => {
            it('should return existing filename if present', () => {
                const attachment = {
                    fileName: 'funny-cat.mov',
                    data: string_to_array_buffer_1.stringToArrayBuffer('foo'),
                    contentType: MIME.VIDEO_QUICKTIME,
                };
                const actual = Attachment.getSuggestedFilename({ attachment });
                const expected = 'funny-cat.mov';
                chai_1.assert.strictEqual(actual, expected);
            });
        });
        context('for attachment without filename', () => {
            it('should generate a filename based on timestamp', () => {
                const attachment = {
                    data: string_to_array_buffer_1.stringToArrayBuffer('foo'),
                    contentType: MIME.VIDEO_QUICKTIME,
                };
                const timestamp = new Date(new Date(0).getTimezoneOffset() * 60 * 1000);
                const actual = Attachment.getSuggestedFilename({
                    attachment,
                    timestamp,
                });
                const expected = 'signal-attachment-1970-01-01-000000.mov';
                chai_1.assert.strictEqual(actual, expected);
            });
        });
    });
    describe('isVisualMedia', () => {
        it('should return true for images', () => {
            const attachment = {
                fileName: 'meme.gif',
                data: string_to_array_buffer_1.stringToArrayBuffer('gif'),
                contentType: MIME.IMAGE_GIF,
            };
            chai_1.assert.isTrue(Attachment.isVisualMedia(attachment));
        });
        it('should return true for videos', () => {
            const attachment = {
                fileName: 'meme.mp4',
                data: string_to_array_buffer_1.stringToArrayBuffer('mp4'),
                contentType: MIME.VIDEO_MP4,
            };
            chai_1.assert.isTrue(Attachment.isVisualMedia(attachment));
        });
        it('should return false for voice message attachment', () => {
            const attachment = {
                fileName: 'Voice Message.aac',
                data: string_to_array_buffer_1.stringToArrayBuffer('voice message'),
                contentType: MIME.AUDIO_AAC,
            };
            chai_1.assert.isFalse(Attachment.isVisualMedia(attachment));
        });
        it('should return false for other attachments', () => {
            const attachment = {
                fileName: 'foo.json',
                data: string_to_array_buffer_1.stringToArrayBuffer('{"foo": "bar"}'),
                contentType: MIME.APPLICATION_JSON,
            };
            chai_1.assert.isFalse(Attachment.isVisualMedia(attachment));
        });
    });
    describe('isFile', () => {
        it('should return true for JSON', () => {
            const attachment = {
                fileName: 'foo.json',
                data: string_to_array_buffer_1.stringToArrayBuffer('{"foo": "bar"}'),
                contentType: MIME.APPLICATION_JSON,
            };
            chai_1.assert.isTrue(Attachment.isFile(attachment));
        });
        it('should return false for images', () => {
            const attachment = {
                fileName: 'meme.gif',
                data: string_to_array_buffer_1.stringToArrayBuffer('gif'),
                contentType: MIME.IMAGE_GIF,
            };
            chai_1.assert.isFalse(Attachment.isFile(attachment));
        });
        it('should return false for videos', () => {
            const attachment = {
                fileName: 'meme.mp4',
                data: string_to_array_buffer_1.stringToArrayBuffer('mp4'),
                contentType: MIME.VIDEO_MP4,
            };
            chai_1.assert.isFalse(Attachment.isFile(attachment));
        });
        it('should return false for voice message attachment', () => {
            const attachment = {
                fileName: 'Voice Message.aac',
                data: string_to_array_buffer_1.stringToArrayBuffer('voice message'),
                contentType: MIME.AUDIO_AAC,
            };
            chai_1.assert.isFalse(Attachment.isFile(attachment));
        });
    });
});
