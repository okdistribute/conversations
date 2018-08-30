"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INDEXABLE_FALSE = 0;
exports.INDEXABLE_TRUE = 1;
exports.toIndexableBoolean = function (value) {
    return value ? exports.INDEXABLE_TRUE : exports.INDEXABLE_FALSE;
};
exports.toIndexablePresence = function (value) {
    return value ? exports.INDEXABLE_TRUE : undefined;
};
