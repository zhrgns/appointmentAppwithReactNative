import * as Notifications from 'expo-notifications';

export function configureNotifications() {

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        }),
    });

}

export const handleNotification = (titleContent, bodyContent) => {

    const notificationContent = {
        title: titleContent,
        body: bodyContent,
    };
    Notifications.scheduleNotificationAsync({
        content: notificationContent,
        trigger: {
            seconds: 5, // Kaç saniye sonra bildirimin gösterileceği
        },
    });
};


