"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLastMessageUpdate = ({ currentLastMessageText, currentTimestamp, lastMessage, lastMessageStatus, lastMessageNotificationText, }) => {
    if (lastMessage === null) {
        return {
            lastMessage: '',
            lastMessageStatus: null,
            timestamp: null,
        };
    }
    const { type, expirationTimerUpdate } = lastMessage;
    const isVerifiedChangeMessage = type === 'verified-change';
    const isExpireTimerUpdateFromSync = expirationTimerUpdate && expirationTimerUpdate.fromSync;
    const shouldUpdateTimestamp = !isVerifiedChangeMessage && !isExpireTimerUpdateFromSync;
    const newTimestamp = shouldUpdateTimestamp
        ? lastMessage.sent_at
        : currentTimestamp;
    const shouldUpdateLastMessageText = !isVerifiedChangeMessage;
    const newLastMessageText = shouldUpdateLastMessageText
        ? lastMessageNotificationText
        : currentLastMessageText;
    return {
        lastMessage: newLastMessageText,
        lastMessageStatus,
        timestamp: newTimestamp,
    };
};
