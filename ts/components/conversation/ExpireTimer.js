"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const lodash_1 = require("lodash");
class ExpireTimer extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.interval = null;
    }
    componentDidMount() {
        const { expirationLength } = this.props;
        const increment = getIncrement(expirationLength);
        const updateFrequency = Math.max(increment, 500);
        const update = () => {
            this.setState({
                lastUpdated: Date.now(),
            });
        };
        this.interval = setInterval(update, updateFrequency);
    }
    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
    render() {
        const { direction, expirationLength, expirationTimestamp, withImageNoCaption, } = this.props;
        const bucket = getTimerBucket(expirationTimestamp, expirationLength);
        return (react_1.default.createElement("div", { className: classnames_1.default('module-expire-timer', `module-expire-timer--${bucket}`, `module-expire-timer--${direction}`, withImageNoCaption
                ? 'module-expire-timer--with-image-no-caption'
                : null) }));
    }
}
exports.ExpireTimer = ExpireTimer;
function getIncrement(length) {
    if (length < 0) {
        return 1000;
    }
    return Math.ceil(length / 12);
}
exports.getIncrement = getIncrement;
function getTimerBucket(expiration, length) {
    const delta = expiration - Date.now();
    if (delta < 0) {
        return '00';
    }
    if (delta > length) {
        return '60';
    }
    const bucket = Math.round(delta / length * 12);
    return lodash_1.padStart(String(bucket * 5), 2, '0');
}
