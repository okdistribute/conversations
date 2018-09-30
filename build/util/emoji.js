"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var emoji_js_clean_1 = __importDefault(require("emoji-js-clean"));
var instance = new emoji_js_clean_1.default();
instance.init_unified();
instance.init_colons();
instance.img_sets.apple.path =
    'node_modules/emoji-datasource-apple/img/apple/64/';
instance.include_title = true;
instance.replace_mode = 'img';
instance.supports_css = false; // needed to avoid spans with background-image
function getRegex() {
    return instance.rx_unified;
}
exports.getRegex = getRegex;
function getTitle(value) {
    return instance.data[value][3][0];
}
exports.getTitle = getTitle;
function findImage(value, variation) {
    return instance.find_image(value, variation);
}
exports.findImage = findImage;
function replaceColons(str) {
    return str.replace(instance.rx_colons, function (m) {
        var name = m.substr(1, m.length - 2);
        var code = instance.map.colons[name];
        if (code) {
            return instance.data[code][0][0];
        }
        return m;
    });
}
exports.replaceColons = replaceColons;
function getCountOfAllMatches(str, regex) {
    var match = regex.exec(str);
    var count = 0;
    if (!regex.global) {
        return match ? 1 : 0;
    }
    while (match) {
        count += 1;
        match = regex.exec(str);
    }
    return count;
}
function hasNormalCharacters(str) {
    var noEmoji = str.replace(instance.rx_unified, '').trim();
    return noEmoji.length > 0;
}
function getSizeClass(str) {
    if (hasNormalCharacters(str)) {
        return '';
    }
    var emojiCount = getCountOfAllMatches(str, instance.rx_unified);
    if (emojiCount > 8) {
        return '';
    }
    else if (emojiCount > 6) {
        return 'small';
    }
    else if (emojiCount > 4) {
        return 'medium';
    }
    else if (emojiCount > 2) {
        return 'large';
    }
    else {
        return 'jumbo';
    }
}
exports.getSizeClass = getSizeClass;
var VARIATION_LOOKUP = {
    '\uD83C\uDFFB': '1f3fb',
    '\uD83C\uDFFC': '1f3fc',
    '\uD83C\uDFFD': '1f3fd',
    '\uD83C\uDFFE': '1f3fe',
    '\uD83C\uDFFF': '1f3ff',
};
// Taken from emoji-js/replace_unified
function getReplacementData(m, p1, p2) {
    var unified = instance.map.unified[p1];
    if (unified) {
        var variation = VARIATION_LOOKUP[p2 || ''];
        if (variation) {
            return {
                value: unified,
                variation: variation,
            };
        }
        return {
            value: unified,
        };
    }
    var unifiedVars = instance.map.unified_vars[p1];
    if (unifiedVars) {
        return {
            value: unifiedVars[0],
            variation: unifiedVars[1],
        };
    }
    return m;
}
exports.getReplacementData = getReplacementData;
