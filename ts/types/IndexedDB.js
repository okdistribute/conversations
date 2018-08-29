"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INDEXABLE_FALSE = 0;
exports.INDEXABLE_TRUE = 1;
exports.toIndexableBoolean = (value) => value ? exports.INDEXABLE_TRUE : exports.INDEXABLE_FALSE;
exports.toIndexablePresence = (value) => value ? exports.INDEXABLE_TRUE : undefined;
