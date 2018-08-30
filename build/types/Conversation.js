"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLastMessageUpdate = function (_a) {
    var currentLastMessageText = _a.currentLastMessageText, currentTimestamp = _a.currentTimestamp, lastMessage = _a.lastMessage, lastMessageStatus = _a.lastMessageStatus, lastMessageNotificationText = _a.lastMessageNotificationText;
    if (lastMessage === null) {
        return {
            lastMessage: '',
            lastMessageStatus: null,
            timestamp: null,
        };
    }
    var type = lastMessage.type, expirationTimerUpdate = lastMessage.expirationTimerUpdate;
    var isVerifiedChangeMessage = type === 'verified-change';
    var isExpireTimerUpdateFromSync = expirationTimerUpdate && expirationTimerUpdate.fromSync;
    var shouldUpdateTimestamp = !isVerifiedChangeMessage && !isExpireTimerUpdateFromSync;
    var newTimestamp = shouldUpdateTimestamp
        ? lastMessage.sent_at
        : currentTimestamp;
    var shouldUpdateLastMessageText = !isVerifiedChangeMessage;
    var newLastMessageText = shouldUpdateLastMessageText
        ? lastMessageNotificationText
        : currentLastMessageText;
    return {
        lastMessage: newLastMessageText,
        lastMessageStatus: lastMessageStatus,
        timestamp: newTimestamp,
    };
};
