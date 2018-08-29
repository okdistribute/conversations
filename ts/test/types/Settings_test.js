"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const sinon_1 = __importDefault(require("sinon"));
const chai_1 = require("chai");
const Settings = __importStar(require("../../../ts/types/Settings"));
describe('Settings', () => {
    const sandbox = sinon_1.default.createSandbox();
    describe('isAudioNotificationSupported', () => {
        context('on macOS', () => {
            beforeEach(() => {
                sandbox.stub(process, 'platform').value('darwin');
            });
            afterEach(() => {
                sandbox.restore();
            });
            it('should return true', () => {
                chai_1.assert.isTrue(Settings.isAudioNotificationSupported());
            });
        });
        context('on Windows', () => {
            context('version 7', () => {
                beforeEach(() => {
                    sandbox.stub(process, 'platform').value('win32');
                    sandbox.stub(os_1.default, 'release').returns('7.0.0');
                });
                afterEach(() => {
                    sandbox.restore();
                });
                it('should return false', () => {
                    chai_1.assert.isFalse(Settings.isAudioNotificationSupported());
                });
            });
            context('version 8+', () => {
                beforeEach(() => {
                    sandbox.stub(process, 'platform').value('win32');
                    sandbox.stub(os_1.default, 'release').returns('8.0.0');
                });
                afterEach(() => {
                    sandbox.restore();
                });
                it('should return true', () => {
                    chai_1.assert.isTrue(Settings.isAudioNotificationSupported());
                });
            });
        });
        context('on Linux', () => {
            beforeEach(() => {
                sandbox.stub(process, 'platform').value('linux');
            });
            afterEach(() => {
                sandbox.restore();
            });
            it('should return false', () => {
                chai_1.assert.isFalse(Settings.isAudioNotificationSupported());
            });
        });
    });
    describe('isNotificationGroupingSupported', () => {
        context('on macOS', () => {
            beforeEach(() => {
                sandbox.stub(process, 'platform').value('darwin');
            });
            afterEach(() => {
                sandbox.restore();
            });
            it('should return true', () => {
                chai_1.assert.isTrue(Settings.isNotificationGroupingSupported());
            });
        });
        context('on Windows', () => {
            context('version 7', () => {
                beforeEach(() => {
                    sandbox.stub(process, 'platform').value('win32');
                    sandbox.stub(os_1.default, 'release').returns('7.0.0');
                });
                afterEach(() => {
                    sandbox.restore();
                });
                it('should return false', () => {
                    chai_1.assert.isFalse(Settings.isNotificationGroupingSupported());
                });
            });
            context('version 8+', () => {
                beforeEach(() => {
                    sandbox.stub(process, 'platform').value('win32');
                    sandbox.stub(os_1.default, 'release').returns('8.0.0');
                });
                afterEach(() => {
                    sandbox.restore();
                });
                it('should return true', () => {
                    chai_1.assert.isTrue(Settings.isNotificationGroupingSupported());
                });
            });
        });
        context('on Linux', () => {
            beforeEach(() => {
                sandbox.stub(process, 'platform').value('linux');
            });
            afterEach(() => {
                sandbox.restore();
            });
            it('should return true', () => {
                chai_1.assert.isTrue(Settings.isNotificationGroupingSupported());
            });
        });
    });
});
