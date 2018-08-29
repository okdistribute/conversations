"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatus = ({ isAppFocused, isAudioNotificationEnabled, isAudioNotificationSupported, isEnabled, numNotifications, userSetting, }) => {
    const type = (() => {
        if (!isEnabled) {
            return 'disabled';
        }
        const hasNotifications = numNotifications > 0;
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
    const shouldPlayNotificationSound = isAudioNotificationSupported && isAudioNotificationEnabled;
    const shouldShowNotifications = type === 'ok';
    const shouldClearNotifications = type === 'appIsFocused';
    return {
        shouldClearNotifications,
        shouldPlayNotificationSound,
        shouldShowNotifications,
        type,
    };
};
