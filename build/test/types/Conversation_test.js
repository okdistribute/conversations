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
var Conversation = __importStar(require("../../types/Conversation"));
describe('Conversation', function () {
    describe('createLastMessageUpdate', function () {
        it('should reset last message if conversation has no messages', function () {
            var input = {
                currentLastMessageText: null,
                currentTimestamp: null,
                lastMessage: null,
                lastMessageStatus: null,
                lastMessageNotificationText: null,
            };
            var expected = {
                lastMessage: '',
                lastMessageStatus: null,
                timestamp: null,
            };
            var actual = Conversation.createLastMessageUpdate(input);
            chai_1.assert.deepEqual(actual, expected);
        });
        context('for regular message', function () {
            it('should update last message text and timestamp', function () {
                var input = {
                    currentLastMessageText: 'Existing message',
                    currentTimestamp: 555,
                    lastMessageStatus: 'read',
                    lastMessage: {
                        type: 'outgoing',
                        conversationId: 'foo',
                        sent_at: 666,
                        timestamp: 666,
                    },
                    lastMessageNotificationText: 'New outgoing message',
                };
                var expected = {
                    lastMessage: 'New outgoing message',
                    lastMessageStatus: 'read',
                    timestamp: 666,
                };
                var actual = Conversation.createLastMessageUpdate(input);
                chai_1.assert.deepEqual(actual, expected);
            });
        });
        context('for verified change message', function () {
            it('should skip update', function () {
                var input = {
                    currentLastMessageText: 'bingo',
                    currentTimestamp: 555,
                    lastMessageStatus: null,
                    lastMessage: {
                        type: 'verified-change',
                        conversationId: 'foo',
                        sent_at: 666,
                        timestamp: 666,
                    },
                    lastMessageNotificationText: 'Verified Changed',
                };
                var expected = {
                    lastMessage: 'bingo',
                    lastMessageStatus: null,
                    timestamp: 555,
                };
                var actual = Conversation.createLastMessageUpdate(input);
                chai_1.assert.deepEqual(actual, expected);
            });
        });
        context('for expire timer update from sync', function () {
            it('should update message but not timestamp (to prevent bump to top)', function () {
                var input = {
                    currentLastMessageText: 'I am expired',
                    currentTimestamp: 555,
                    lastMessageStatus: null,
                    lastMessage: {
                        type: 'incoming',
                        conversationId: 'foo',
                        sent_at: 666,
                        timestamp: 666,
                        expirationTimerUpdate: {
                            expireTimer: 111,
                            fromSync: true,
                            source: '+12223334455',
                        },
                    },
                    lastMessageNotificationText: 'Last message before expired',
                };
                var expected = {
                    lastMessage: 'Last message before expired',
                    lastMessageStatus: null,
                    timestamp: 555,
                };
                var actual = Conversation.createLastMessageUpdate(input);
                chai_1.assert.deepEqual(actual, expected);
            });
        });
    });
});
