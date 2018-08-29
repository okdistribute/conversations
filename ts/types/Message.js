"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserMessage = (message) => message.type === 'incoming' || message.type === 'outgoing';
exports.hasExpiration = (message) => {
    if (!exports.isUserMessage(message)) {
        return false;
    }
    const { expireTimer } = message;
    return typeof expireTimer === 'number' && expireTimer > 0;
};
