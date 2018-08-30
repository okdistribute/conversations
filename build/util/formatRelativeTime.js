"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
var getExtendedFormats = function (i18n) { return ({
    y: 'lll',
    M: (i18n('timestampFormat_M') || 'MMM D') + " LT",
    d: 'ddd LT',
}); };
var getShortFormats = function (i18n) { return ({
    y: 'll',
    M: i18n('timestampFormat_M') || 'MMM D',
    d: 'ddd',
}); };
function isToday(timestamp) {
    var today = moment_1.default().format('ddd');
    var targetDay = moment_1.default(timestamp).format('ddd');
    return today === targetDay;
}
function isYear(timestamp) {
    var year = moment_1.default().format('YYYY');
    var targetYear = moment_1.default(timestamp).format('YYYY');
    return year === targetYear;
}
function formatRelativeTime(rawTimestamp, options) {
    var extended = options.extended, i18n = options.i18n;
    var formats = extended ? getExtendedFormats(i18n) : getShortFormats(i18n);
    var timestamp = moment_1.default(rawTimestamp);
    var now = moment_1.default();
    var diff = moment_1.default.duration(now.diff(timestamp));
    if (diff.years() >= 1 || !isYear(timestamp)) {
        return timestamp.format(formats.y);
    }
    else if (diff.months() >= 1 || diff.days() > 6) {
        return timestamp.format(formats.M);
    }
    else if (diff.days() >= 1 || !isToday(timestamp)) {
        return timestamp.format(formats.d);
    }
    else if (diff.hours() >= 1) {
        var key = extended ? 'hoursAgo' : 'hoursAgoShort';
        return i18n(key, [String(diff.hours())]);
    }
    else if (diff.minutes() >= 1) {
        var key = extended ? 'minutesAgo' : 'minutesAgoShort';
        return i18n(key, [String(diff.minutes())]);
    }
    return i18n('justNow');
}
exports.formatRelativeTime = formatRelativeTime;
