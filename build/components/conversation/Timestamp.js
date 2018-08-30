"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var moment_1 = __importDefault(require("moment"));
var formatRelativeTime_1 = require("../../util/formatRelativeTime");
var UPDATE_FREQUENCY = 60 * 1000;
var Timestamp = /** @class */ (function (_super) {
    __extends(Timestamp, _super);
    function Timestamp(props) {
        var _this = _super.call(this, props) || this;
        _this.interval = null;
        return _this;
    }
    Timestamp.prototype.componentDidMount = function () {
        var _this = this;
        var update = function () {
            _this.setState({
                lastUpdated: Date.now(),
            });
        };
        this.interval = setInterval(update, UPDATE_FREQUENCY);
    };
    Timestamp.prototype.componentWillUnmount = function () {
        if (this.interval) {
            clearInterval(this.interval);
        }
    };
    Timestamp.prototype.render = function () {
        var _a = this.props, direction = _a.direction, i18n = _a.i18n, module = _a.module, timestamp = _a.timestamp, withImageNoCaption = _a.withImageNoCaption, extended = _a.extended;
        var moduleName = module || 'module-timestamp';
        if (timestamp === null || timestamp === undefined) {
            return null;
        }
        return (react_1.default.createElement("span", { className: classnames_1.default(moduleName, direction ? moduleName + "--" + direction : null, withImageNoCaption ? moduleName + "--with-image-no-caption" : null), title: moment_1.default(timestamp).format('llll') }, formatRelativeTime_1.formatRelativeTime(timestamp, { i18n: i18n, extended: extended })));
    };
    return Timestamp;
}(react_1.default.Component));
exports.Timestamp = Timestamp;
