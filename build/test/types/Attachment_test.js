"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var Attachment = __importStar(require("../../types/Attachment"));
var MIME = __importStar(require("../../types/MIME"));
// @ts-ignore
var string_to_array_buffer_1 = require("../../../js/modules/string_to_array_buffer");
describe('Attachment', function () {
    describe('getFileExtension', function () {
        it('should return file extension from content type', function () {
            var input = {
                data: string_to_array_buffer_1.stringToArrayBuffer('foo'),
                contentType: MIME.IMAGE_GIF,
            };
            chai_1.assert.strictEqual(Attachment.getFileExtension(input), 'gif');
        });
        it('should return file extension for QuickTime videos', function () {
            var input = {
                data: string_to_array_buffer_1.stringToArrayBuffer('foo'),
                contentType: MIME.VIDEO_QUICKTIME,
            };
            chai_1.assert.strictEqual(Attachment.getFileExtension(input), 'mov');
        });
    });
    describe('getSuggestedFilename', function () {
        context('for attachment with filename', function () {
            it('should return existing filename if present', function () {
                var attachment = {
                    fileName: 'funny-cat.mov',
                    data: string_to_array_buffer_1.stringToArrayBuffer('foo'),
                    contentType: MIME.VIDEO_QUICKTIME,
                };
                var actual = Attachment.getSuggestedFilename({ attachment: attachment });
                var expected = 'funny-cat.mov';
                chai_1.assert.strictEqual(actual, expected);
            });
        });
        context('for attachment without filename', function () {
            it('should generate a filename based on timestamp', function () {
                var attachment = {
                    data: string_to_array_buffer_1.stringToArrayBuffer('foo'),
                    contentType: MIME.VIDEO_QUICKTIME,
                };
                var timestamp = new Date(new Date(0).getTimezoneOffset() * 60 * 1000);
                var actual = Attachment.getSuggestedFilename({
                    attachment: attachment,
                    timestamp: timestamp,
                });
                var expected = 'signal-attachment-1970-01-01-000000.mov';
                chai_1.assert.strictEqual(actual, expected);
            });
        });
    });
    describe('isVisualMedia', function () {
        it('should return true for images', function () {
            var attachment = {
                fileName: 'meme.gif',
                data: string_to_array_buffer_1.stringToArrayBuffer('gif'),
                contentType: MIME.IMAGE_GIF,
            };
            chai_1.assert.isTrue(Attachment.isVisualMedia(attachment));
        });
        it('should return true for videos', function () {
            var attachment = {
                fileName: 'meme.mp4',
                data: string_to_array_buffer_1.stringToArrayBuffer('mp4'),
                contentType: MIME.VIDEO_MP4,
            };
            chai_1.assert.isTrue(Attachment.isVisualMedia(attachment));
        });
        it('should return false for voice message attachment', function () {
            var attachment = {
                fileName: 'Voice Message.aac',
                data: string_to_array_buffer_1.stringToArrayBuffer('voice message'),
                contentType: MIME.AUDIO_AAC,
            };
            chai_1.assert.isFalse(Attachment.isVisualMedia(attachment));
        });
        it('should return false for other attachments', function () {
            var attachment = {
                fileName: 'foo.json',
                data: string_to_array_buffer_1.stringToArrayBuffer('{"foo": "bar"}'),
                contentType: MIME.APPLICATION_JSON,
            };
            chai_1.assert.isFalse(Attachment.isVisualMedia(attachment));
        });
    });
    describe('isFile', function () {
        it('should return true for JSON', function () {
            var attachment = {
                fileName: 'foo.json',
                data: string_to_array_buffer_1.stringToArrayBuffer('{"foo": "bar"}'),
                contentType: MIME.APPLICATION_JSON,
            };
            chai_1.assert.isTrue(Attachment.isFile(attachment));
        });
        it('should return false for images', function () {
            var attachment = {
                fileName: 'meme.gif',
                data: string_to_array_buffer_1.stringToArrayBuffer('gif'),
                contentType: MIME.IMAGE_GIF,
            };
            chai_1.assert.isFalse(Attachment.isFile(attachment));
        });
        it('should return false for videos', function () {
            var attachment = {
                fileName: 'meme.mp4',
                data: string_to_array_buffer_1.stringToArrayBuffer('mp4'),
                contentType: MIME.VIDEO_MP4,
            };
            chai_1.assert.isFalse(Attachment.isFile(attachment));
        });
        it('should return false for voice message attachment', function () {
            var attachment = {
                fileName: 'Voice Message.aac',
                data: string_to_array_buffer_1.stringToArrayBuffer('voice message'),
                contentType: MIME.AUDIO_AAC,
            };
            chai_1.assert.isFalse(Attachment.isFile(attachment));
        });
    });
});
