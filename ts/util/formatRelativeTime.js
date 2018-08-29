"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const getExtendedFormats = (i18n) => ({
    y: 'lll',
    M: `${i18n('timestampFormat_M') || 'MMM D'} LT`,
    d: 'ddd LT',
});
const getShortFormats = (i18n) => ({
    y: 'll',
    M: i18n('timestampFormat_M') || 'MMM D',
    d: 'ddd',
});
function isToday(timestamp) {
    const today = moment_1.default().format('ddd');
    const targetDay = moment_1.default(timestamp).format('ddd');
    return today === targetDay;
}
function isYear(timestamp) {
    const year = moment_1.default().format('YYYY');
    const targetYear = moment_1.default(timestamp).format('YYYY');
    return year === targetYear;
}
function formatRelativeTime(rawTimestamp, options) {
    const { extended, i18n } = options;
    const formats = extended ? getExtendedFormats(i18n) : getShortFormats(i18n);
    const timestamp = moment_1.default(rawTimestamp);
    const now = moment_1.default();
    const diff = moment_1.default.duration(now.diff(timestamp));
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
        const key = extended ? 'hoursAgo' : 'hoursAgoShort';
        return i18n(key, [String(diff.hours())]);
    }
    else if (diff.minutes() >= 1) {
        const key = extended ? 'minutesAgo' : 'minutesAgoShort';
        return i18n(key, [String(diff.minutes())]);
    }
    return i18n('justNow');
}
exports.formatRelativeTime = formatRelativeTime;
