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
var os_1 = __importDefault(require("os"));
var sinon_1 = __importDefault(require("sinon"));
var chai_1 = require("chai");
var Settings = __importStar(require("../../../ts/types/Settings"));
describe('Settings', function () {
    var sandbox = sinon_1.default.createSandbox();
    describe('isAudioNotificationSupported', function () {
        context('on macOS', function () {
            beforeEach(function () {
                sandbox.stub(process, 'platform').value('darwin');
            });
            afterEach(function () {
                sandbox.restore();
            });
            it('should return true', function () {
                chai_1.assert.isTrue(Settings.isAudioNotificationSupported());
            });
        });
        context('on Windows', function () {
            context('version 7', function () {
                beforeEach(function () {
                    sandbox.stub(process, 'platform').value('win32');
                    sandbox.stub(os_1.default, 'release').returns('7.0.0');
                });
                afterEach(function () {
                    sandbox.restore();
                });
                it('should return false', function () {
                    chai_1.assert.isFalse(Settings.isAudioNotificationSupported());
                });
            });
            context('version 8+', function () {
                beforeEach(function () {
                    sandbox.stub(process, 'platform').value('win32');
                    sandbox.stub(os_1.default, 'release').returns('8.0.0');
                });
                afterEach(function () {
                    sandbox.restore();
                });
                it('should return true', function () {
                    chai_1.assert.isTrue(Settings.isAudioNotificationSupported());
                });
            });
        });
        context('on Linux', function () {
            beforeEach(function () {
                sandbox.stub(process, 'platform').value('linux');
            });
            afterEach(function () {
                sandbox.restore();
            });
            it('should return false', function () {
                chai_1.assert.isFalse(Settings.isAudioNotificationSupported());
            });
        });
    });
    describe('isNotificationGroupingSupported', function () {
        context('on macOS', function () {
            beforeEach(function () {
                sandbox.stub(process, 'platform').value('darwin');
            });
            afterEach(function () {
                sandbox.restore();
            });
            it('should return true', function () {
                chai_1.assert.isTrue(Settings.isNotificationGroupingSupported());
            });
        });
        context('on Windows', function () {
            context('version 7', function () {
                beforeEach(function () {
                    sandbox.stub(process, 'platform').value('win32');
                    sandbox.stub(os_1.default, 'release').returns('7.0.0');
                });
                afterEach(function () {
                    sandbox.restore();
                });
                it('should return false', function () {
                    chai_1.assert.isFalse(Settings.isNotificationGroupingSupported());
                });
            });
            context('version 8+', function () {
                beforeEach(function () {
                    sandbox.stub(process, 'platform').value('win32');
                    sandbox.stub(os_1.default, 'release').returns('8.0.0');
                });
                afterEach(function () {
                    sandbox.restore();
                });
                it('should return true', function () {
                    chai_1.assert.isTrue(Settings.isNotificationGroupingSupported());
                });
            });
        });
        context('on Linux', function () {
            beforeEach(function () {
                sandbox.stub(process, 'platform').value('linux');
            });
            afterEach(function () {
                sandbox.restore();
            });
            it('should return true', function () {
                chai_1.assert.isTrue(Settings.isNotificationGroupingSupported());
            });
        });
    });
});
