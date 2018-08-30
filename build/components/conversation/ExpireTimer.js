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
var lodash_1 = require("lodash");
var ExpireTimer = /** @class */ (function (_super) {
    __extends(ExpireTimer, _super);
    function ExpireTimer(props) {
        var _this = _super.call(this, props) || this;
        _this.interval = null;
        return _this;
    }
    ExpireTimer.prototype.componentDidMount = function () {
        var _this = this;
        var expirationLength = this.props.expirationLength;
        var increment = getIncrement(expirationLength);
        var updateFrequency = Math.max(increment, 500);
        var update = function () {
            _this.setState({
                lastUpdated: Date.now(),
            });
        };
        this.interval = setInterval(update, updateFrequency);
    };
    ExpireTimer.prototype.componentWillUnmount = function () {
        if (this.interval) {
            clearInterval(this.interval);
        }
    };
    ExpireTimer.prototype.render = function () {
        var _a = this.props, direction = _a.direction, expirationLength = _a.expirationLength, expirationTimestamp = _a.expirationTimestamp, withImageNoCaption = _a.withImageNoCaption;
        var bucket = getTimerBucket(expirationTimestamp, expirationLength);
        return (react_1.default.createElement("div", { className: classnames_1.default('module-expire-timer', "module-expire-timer--" + bucket, "module-expire-timer--" + direction, withImageNoCaption
                ? 'module-expire-timer--with-image-no-caption'
                : null) }));
    };
    return ExpireTimer;
}(react_1.default.Component));
exports.ExpireTimer = ExpireTimer;
function getIncrement(length) {
    if (length < 0) {
        return 1000;
    }
    return Math.ceil(length / 12);
}
exports.getIncrement = getIncrement;
function getTimerBucket(expiration, length) {
    var delta = expiration - Date.now();
    if (delta < 0) {
        return '00';
    }
    if (delta > length) {
        return '60';
    }
    var bucket = Math.round(delta / length * 12);
    return lodash_1.padStart(String(bucket * 5), 2, '0');
}
