"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @prettier
 */
exports.saveURLAsFile = ({ filename, url, document, }) => {
    const anchorElement = document.createElement('a');
    anchorElement.href = url;
    anchorElement.download = filename;
    anchorElement.click();
};
