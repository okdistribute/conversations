"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const lodash_1 = require("lodash");
exports.groupMessagesByDate = (timestamp, messages) => {
    const referenceDateTime = moment_1.default.utc(timestamp);
    const sortedMessages = lodash_1.sortBy(messages, message => -message.received_at);
    const messagesWithSection = sortedMessages.map(withSection(referenceDateTime));
    const groupedMessages = lodash_1.groupBy(messagesWithSection, 'type');
    const yearMonthMessages = Object.values(lodash_1.groupBy(groupedMessages.yearMonth, 'order')).reverse();
    return lodash_1.compact([
        toSection(groupedMessages.today),
        toSection(groupedMessages.yesterday),
        toSection(groupedMessages.thisWeek),
        toSection(groupedMessages.thisMonth),
        ...yearMonthMessages.map(toSection),
    ]);
};
const toSection = (messagesWithSection) => {
    if (!messagesWithSection || messagesWithSection.length === 0) {
        return null;
    }
    const firstMessageWithSection = messagesWithSection[0];
    if (!firstMessageWithSection) {
        return null;
    }
    const messages = messagesWithSection.map(messageWithSection => messageWithSection.message);
    switch (firstMessageWithSection.type) {
        case 'today':
        case 'yesterday':
        case 'thisWeek':
        case 'thisMonth':
            return {
                type: firstMessageWithSection.type,
                messages,
            };
        case 'yearMonth':
            return {
                type: firstMessageWithSection.type,
                year: firstMessageWithSection.year,
                month: firstMessageWithSection.month,
                messages,
            };
        default:
            // NOTE: Investigate why we get the following error:
            // error TS2345: Argument of type 'any' is not assignable to parameter
            // of type 'never'.
            // return missingCaseError(firstMessageWithSection.type);
            return null;
    }
};
const withSection = (referenceDateTime) => (message) => {
    const today = moment_1.default(referenceDateTime).startOf('day');
    const yesterday = moment_1.default(referenceDateTime)
        .subtract(1, 'day')
        .startOf('day');
    const thisWeek = moment_1.default(referenceDateTime).startOf('isoWeek');
    const thisMonth = moment_1.default(referenceDateTime).startOf('month');
    const messageReceivedDate = moment_1.default.utc(message.received_at);
    if (messageReceivedDate.isAfter(today)) {
        return {
            order: 0,
            type: 'today',
            message,
        };
    }
    if (messageReceivedDate.isAfter(yesterday)) {
        return {
            order: 1,
            type: 'yesterday',
            message,
        };
    }
    if (messageReceivedDate.isAfter(thisWeek)) {
        return {
            order: 2,
            type: 'thisWeek',
            message,
        };
    }
    if (messageReceivedDate.isAfter(thisMonth)) {
        return {
            order: 3,
            type: 'thisMonth',
            message,
        };
    }
    const month = messageReceivedDate.month();
    const year = messageReceivedDate.year();
    return {
        order: year * 100 + month,
        type: 'yearMonth',
        month,
        year,
        message,
    };
};
