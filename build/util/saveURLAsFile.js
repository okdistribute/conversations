"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @prettier
 */
exports.saveURLAsFile = function (_a) {
    var filename = _a.filename, url = _a.url, document = _a.document;
    var anchorElement = document.createElement('a');
    anchorElement.href = url;
    anchorElement.download = filename;
    anchorElement.click();
};
