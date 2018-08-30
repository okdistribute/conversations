"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatus = function (_a) {
    var isAppFocused = _a.isAppFocused, isAudioNotificationEnabled = _a.isAudioNotificationEnabled, isAudioNotificationSupported = _a.isAudioNotificationSupported, isEnabled = _a.isEnabled, numNotifications = _a.numNotifications, userSetting = _a.userSetting;
    var type = (function () {
        if (!isEnabled) {
            return 'disabled';
        }
        var hasNotifications = numNotifications > 0;
        if (!hasNotifications) {
            return 'noNotifications';
        }
        if (isAppFocused) {
            return 'appIsFocused';
        }
        if (userSetting === 'off') {
            return 'userSetting';
        }
        return 'ok';
    })();
    var shouldPlayNotificationSound = isAudioNotificationSupported && isAudioNotificationEnabled;
    var shouldShowNotifications = type === 'ok';
    var shouldClearNotifications = type === 'appIsFocused';
    return {
        shouldClearNotifications: shouldClearNotifications,
        shouldPlayNotificationSound: shouldPlayNotificationSound,
        shouldShowNotifications: shouldShowNotifications,
        type: type,
    };
};
