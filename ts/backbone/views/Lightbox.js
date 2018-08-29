"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.show = (element) => {
    const container = document.querySelector('.lightbox-container');
    if (container === null) {
        throw new TypeError("'.lightbox-container' is required");
    }
    // tslint:disable-next-line:no-inner-html
    container.innerHTML = '';
    container.style.display = 'block';
    container.appendChild(element);
};
exports.hide = () => {
    const container = document.querySelector('.lightbox-container');
    if (container === null) {
        return;
    }
    // tslint:disable-next-line:no-inner-html
    container.innerHTML = '';
    container.style.display = 'none';
};
