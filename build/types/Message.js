"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserMessage = function (message) {
    return message.type === 'incoming' || message.type === 'outgoing';
};
exports.hasExpiration = function (message) {
    if (!exports.isUserMessage(message)) {
        return false;
    }
    var expireTimer = message.expireTimer;
    return typeof expireTimer === 'number' && expireTimer > 0;
};
