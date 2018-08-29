"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const qs_1 = __importDefault(require("qs"));
const classnames_1 = __importDefault(require("classnames"));
exports.classNames = classnames_1.default;
// This file provides helpers for the Style Guide, exposed at 'util' in the global scope
//   via the 'context' option in react-styleguidist.
const lodash_1 = __importDefault(require("lodash"));
exports._ = lodash_1.default;
var ConversationContext_1 = require("./ConversationContext");
exports.ConversationContext = ConversationContext_1.ConversationContext;
// TypeScript wants two things when you import:
//   1) a normal typescript file
//   2) a javascript file with type definitions
// Anything else will raise an error, that it can't find the module. And so, we ignore...
// @ts-ignore
const giphy_GVNvOUpeYmI7e_gif_1 = __importDefault(require("../../fixtures/giphy-GVNvOUpeYmI7e.gif"));
exports.gif = giphy_GVNvOUpeYmI7e_gif_1.default;
// 320x240
const gifObjectUrl = makeObjectUrl(giphy_GVNvOUpeYmI7e_gif_1.default, 'image/gif');
exports.gifObjectUrl = gifObjectUrl;
// @ts-ignore
const incompetech_com_Agnus_Dei_X_mp3_1 = __importDefault(require("../../fixtures/incompetech-com-Agnus-Dei-X.mp3"));
exports.mp3 = incompetech_com_Agnus_Dei_X_mp3_1.default;
const mp3ObjectUrl = makeObjectUrl(incompetech_com_Agnus_Dei_X_mp3_1.default, 'audio/mp3');
exports.mp3ObjectUrl = mp3ObjectUrl;
// @ts-ignore
const lorem_ipsum_txt_1 = __importDefault(require("../../fixtures/lorem-ipsum.txt"));
exports.txt = lorem_ipsum_txt_1.default;
const txtObjectUrl = makeObjectUrl(lorem_ipsum_txt_1.default, 'text/plain');
exports.txtObjectUrl = txtObjectUrl;
// @ts-ignore
const pixabay_Soap_Bubble_7141_mp4_1 = __importDefault(require("../../fixtures/pixabay-Soap-Bubble-7141.mp4"));
exports.mp4 = pixabay_Soap_Bubble_7141_mp4_1.default;
const mp4ObjectUrl = makeObjectUrl(pixabay_Soap_Bubble_7141_mp4_1.default, 'video/mp4');
exports.mp4ObjectUrl = mp4ObjectUrl;
// @ts-ignore
const freepngs_2cd43b_bed7d1327e88454487397574d87b64dc_mv2_png_1 = __importDefault(require("../../fixtures/freepngs-2cd43b_bed7d1327e88454487397574d87b64dc_mv2.png"));
exports.png = freepngs_2cd43b_bed7d1327e88454487397574d87b64dc_mv2_png_1.default;
// 800×1200
const pngObjectUrl = makeObjectUrl(freepngs_2cd43b_bed7d1327e88454487397574d87b64dc_mv2_png_1.default, 'image/png');
exports.pngObjectUrl = pngObjectUrl;
// @ts-ignore
const _1000x50_green_jpeg_1 = __importDefault(require("../../fixtures/1000x50-green.jpeg"));
exports.landscapeGreen = _1000x50_green_jpeg_1.default;
const landscapeGreenObjectUrl = makeObjectUrl(_1000x50_green_jpeg_1.default, 'image/jpeg');
exports.landscapeGreenObjectUrl = landscapeGreenObjectUrl;
// @ts-ignore
const _200x50_purple_png_1 = __importDefault(require("../../fixtures/200x50-purple.png"));
exports.landscapePurple = _200x50_purple_png_1.default;
const landscapePurpleObjectUrl = makeObjectUrl(_200x50_purple_png_1.default, 'image/png');
exports.landscapePurpleObjectUrl = landscapePurpleObjectUrl;
// @ts-ignore
const _20x200_yellow_png_1 = __importDefault(require("../../fixtures/20x200-yellow.png"));
exports.portraitYellow = _20x200_yellow_png_1.default;
const portraitYellowObjectUrl = makeObjectUrl(_20x200_yellow_png_1.default, 'image/png');
exports.portraitYellowObjectUrl = portraitYellowObjectUrl;
// @ts-ignore
const _300x1_red_jpeg_1 = __importDefault(require("../../fixtures/300x1-red.jpeg"));
exports.landscapeRed = _300x1_red_jpeg_1.default;
const landscapeRedObjectUrl = makeObjectUrl(_300x1_red_jpeg_1.default, 'image/png');
exports.landscapeRedObjectUrl = landscapeRedObjectUrl;
// @ts-ignore
const _50x1000_teal_jpeg_1 = __importDefault(require("../../fixtures/50x1000-teal.jpeg"));
exports.portraitTeal = _50x1000_teal_jpeg_1.default;
const portraitTealObjectUrl = makeObjectUrl(_50x1000_teal_jpeg_1.default, 'image/png');
exports.portraitTealObjectUrl = portraitTealObjectUrl;
function makeObjectUrl(data, contentType) {
    const blob = new Blob([data], {
        type: contentType,
    });
    return URL.createObjectURL(blob);
}
const query = window.location.search.replace(/^\?/, '');
const urlOptions = qs_1.default.parse(query);
const theme = urlOptions.theme || 'light-theme';
exports.theme = theme;
const ios = urlOptions.ios || false;
exports.ios = ios;
const locale = urlOptions.locale || 'en';
exports.locale = locale;
// @ts-ignore
const messages_json_1 = __importDefault(require("../../_locales/en/messages.json"));
// @ts-ignore
const i18n_1 = require("../../js/modules/i18n");
const i18n = i18n_1.setup(locale, messages_json_1.default);
exports.i18n = i18n;
// Telling Lodash to relinquish _ for use by underscore
// @ts-ignore
lodash_1.default.noConflict();
