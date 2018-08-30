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
// import classNames from 'classnames';
var lodash_1 = require("lodash");
var ContactName_1 = require("./ContactName");
var Intl_1 = require("../Intl");
var missingCaseError_1 = require("../../util/missingCaseError");
var GroupNotification = /** @class */ (function (_super) {
    __extends(GroupNotification, _super);
    function GroupNotification() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GroupNotification.prototype.renderChange = function (change) {
        var isMe = change.isMe, contacts = change.contacts, type = change.type, newName = change.newName;
        var i18n = this.props.i18n;
        var people = lodash_1.compact(lodash_1.flatten((contacts || []).map(function (contact, index) {
            var element = (react_1.default.createElement("span", { key: "external-" + contact.phoneNumber, className: "module-group-notification__contact" },
                react_1.default.createElement(ContactName_1.ContactName, { i18n: i18n, phoneNumber: contact.phoneNumber, profileName: contact.profileName, name: contact.name })));
            return [index > 0 ? ', ' : null, element];
        })));
        switch (type) {
            case 'name':
                return i18n('titleIsNow', [newName || '']);
            case 'add':
                if (!contacts || !contacts.length) {
                    throw new Error('Group update is missing contacts');
                }
                return (react_1.default.createElement(Intl_1.Intl, { i18n: i18n, id: contacts.length > 1 ? 'multipleJoinedTheGroup' : 'joinedTheGroup', components: [people] }));
            case 'remove':
                if (!contacts || !contacts.length) {
                    throw new Error('Group update is missing contacts');
                }
                if (isMe) {
                    return i18n('youLeftTheGroup');
                }
                return (react_1.default.createElement(Intl_1.Intl, { i18n: i18n, id: contacts.length > 1 ? 'multipleLeftTheGroup' : 'leftTheGroup', components: [people] }));
            case 'general':
                return i18n('updatedTheGroup');
            default:
                throw missingCaseError_1.missingCaseError(type);
        }
    };
    GroupNotification.prototype.render = function () {
        var _this = this;
        var changes = this.props.changes;
        return (react_1.default.createElement("div", { className: "module-group-notification" }, (changes || []).map(function (change, index) { return (react_1.default.createElement("div", { key: index, className: "module-group-notification__change" }, _this.renderChange(change))); })));
    };
    return GroupNotification;
}(react_1.default.Component));
exports.GroupNotification = GroupNotification;
