"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
var lodash_1 = require("lodash");
exports.groupMessagesByDate = function (timestamp, messages) {
    var referenceDateTime = moment_1.default.utc(timestamp);
    var sortedMessages = lodash_1.sortBy(messages, function (message) { return -message.received_at; });
    var messagesWithSection = sortedMessages.map(withSection(referenceDateTime));
    var groupedMessages = lodash_1.groupBy(messagesWithSection, 'type');
    var yearMonthMessages = Object.values(lodash_1.groupBy(groupedMessages.yearMonth, 'order')).reverse();
    return lodash_1.compact([
        toSection(groupedMessages.today),
        toSection(groupedMessages.yesterday),
        toSection(groupedMessages.thisWeek),
        toSection(groupedMessages.thisMonth)
    ].concat(yearMonthMessages.map(toSection)));
};
var toSection = function (messagesWithSection) {
    if (!messagesWithSection || messagesWithSection.length === 0) {
        return null;
    }
    var firstMessageWithSection = messagesWithSection[0];
    if (!firstMessageWithSection) {
        return null;
    }
    var messages = messagesWithSection.map(function (messageWithSection) { return messageWithSection.message; });
    switch (firstMessageWithSection.type) {
        case 'today':
        case 'yesterday':
        case 'thisWeek':
        case 'thisMonth':
            return {
                type: firstMessageWithSection.type,
                messages: messages,
            };
        case 'yearMonth':
            return {
                type: firstMessageWithSection.type,
                year: firstMessageWithSection.year,
                month: firstMessageWithSection.month,
                messages: messages,
            };
        default:
            // NOTE: Investigate why we get the following error:
            // error TS2345: Argument of type 'any' is not assignable to parameter
            // of type 'never'.
            // return missingCaseError(firstMessageWithSection.type);
            return null;
    }
};
var withSection = function (referenceDateTime) { return function (message) {
    var today = moment_1.default(referenceDateTime).startOf('day');
    var yesterday = moment_1.default(referenceDateTime)
        .subtract(1, 'day')
        .startOf('day');
    var thisWeek = moment_1.default(referenceDateTime).startOf('isoWeek');
    var thisMonth = moment_1.default(referenceDateTime).startOf('month');
    var messageReceivedDate = moment_1.default.utc(message.received_at);
    if (messageReceivedDate.isAfter(today)) {
        return {
            order: 0,
            type: 'today',
            message: message,
        };
    }
    if (messageReceivedDate.isAfter(yesterday)) {
        return {
            order: 1,
            type: 'yesterday',
            message: message,
        };
    }
    if (messageReceivedDate.isAfter(thisWeek)) {
        return {
            order: 2,
            type: 'thisWeek',
            message: message,
        };
    }
    if (messageReceivedDate.isAfter(thisMonth)) {
        return {
            order: 3,
            type: 'thisMonth',
            message: message,
        };
    }
    var month = messageReceivedDate.month();
    var year = messageReceivedDate.year();
    return {
        order: year * 100 + month,
        type: 'yearMonth',
        month: month,
        year: year,
        message: message,
    };
}; };
