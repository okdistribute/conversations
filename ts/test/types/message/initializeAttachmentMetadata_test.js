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
const chai_1 = require("chai");
const Message = __importStar(require("../../../../ts/types/message/initializeAttachmentMetadata"));
const MIME = __importStar(require("../../../../ts/types/MIME"));
// @ts-ignore
const string_to_array_buffer_1 = require("../../../../js/modules/string_to_array_buffer");
describe('Message', () => {
    describe('initializeAttachmentMetadata', () => {
        it('should classify visual media attachments', () => __awaiter(this, void 0, void 0, function* () {
            const input = {
                type: 'incoming',
                conversationId: 'foo',
                id: '11111111-1111-1111-1111-111111111111',
                timestamp: 1523317140899,
                received_at: 1523317140899,
                sent_at: 1523317140800,
                attachments: [
                    {
                        contentType: MIME.IMAGE_JPEG,
                        data: string_to_array_buffer_1.stringToArrayBuffer('foo'),
                        fileName: 'foo.jpg',
                        size: 1111,
                    },
                ],
            };
            const expected = {
                type: 'incoming',
                conversationId: 'foo',
                id: '11111111-1111-1111-1111-111111111111',
                timestamp: 1523317140899,
                received_at: 1523317140899,
                sent_at: 1523317140800,
                attachments: [
                    {
                        contentType: MIME.IMAGE_JPEG,
                        data: string_to_array_buffer_1.stringToArrayBuffer('foo'),
                        fileName: 'foo.jpg',
                        size: 1111,
                    },
                ],
                hasAttachments: 1,
                hasVisualMediaAttachments: 1,
                hasFileAttachments: undefined,
            };
            const actual = yield Message.initializeAttachmentMetadata(input);
            chai_1.assert.deepEqual(actual, expected);
        }));
        it('should classify file attachments', () => __awaiter(this, void 0, void 0, function* () {
            const input = {
                type: 'incoming',
                conversationId: 'foo',
                id: '11111111-1111-1111-1111-111111111111',
                timestamp: 1523317140899,
                received_at: 1523317140899,
                sent_at: 1523317140800,
                attachments: [
                    {
                        contentType: MIME.APPLICATION_OCTET_STREAM,
                        data: string_to_array_buffer_1.stringToArrayBuffer('foo'),
                        fileName: 'foo.bin',
                        size: 1111,
                    },
                ],
            };
            const expected = {
                type: 'incoming',
                conversationId: 'foo',
                id: '11111111-1111-1111-1111-111111111111',
                timestamp: 1523317140899,
                received_at: 1523317140899,
                sent_at: 1523317140800,
                attachments: [
                    {
                        contentType: MIME.APPLICATION_OCTET_STREAM,
                        data: string_to_array_buffer_1.stringToArrayBuffer('foo'),
                        fileName: 'foo.bin',
                        size: 1111,
                    },
                ],
                hasAttachments: 1,
                hasVisualMediaAttachments: undefined,
                hasFileAttachments: 1,
            };
            const actual = yield Message.initializeAttachmentMetadata(input);
            chai_1.assert.deepEqual(actual, expected);
        }));
        it('should classify voice message attachments', () => __awaiter(this, void 0, void 0, function* () {
            const input = {
                type: 'incoming',
                conversationId: 'foo',
                id: '11111111-1111-1111-1111-111111111111',
                timestamp: 1523317140899,
                received_at: 1523317140899,
                sent_at: 1523317140800,
                attachments: [
                    {
                        contentType: MIME.AUDIO_AAC,
                        data: string_to_array_buffer_1.stringToArrayBuffer('foo'),
                        fileName: 'Voice Message.aac',
                        size: 1111,
                    },
                ],
            };
            const expected = {
                type: 'incoming',
                conversationId: 'foo',
                id: '11111111-1111-1111-1111-111111111111',
                timestamp: 1523317140899,
                received_at: 1523317140899,
                sent_at: 1523317140800,
                attachments: [
                    {
                        contentType: MIME.AUDIO_AAC,
                        data: string_to_array_buffer_1.stringToArrayBuffer('foo'),
                        fileName: 'Voice Message.aac',
                        size: 1111,
                    },
                ],
                hasAttachments: 1,
                hasVisualMediaAttachments: undefined,
                hasFileAttachments: undefined,
            };
            const actual = yield Message.initializeAttachmentMetadata(input);
            chai_1.assert.deepEqual(actual, expected);
        }));
    });
});
