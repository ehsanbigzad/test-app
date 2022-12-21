import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

export async function showNotification(title?: string, content?: string) {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  await notifee.displayNotification({
    title: title ?? 'Notification',
    body: content ?? 'This is a remote notification',
    android: {
      channelId,
      pressAction: {
        id: 'default',
      },
    },
  });
}

export function onBackgroundNotification() {
  messaging().setBackgroundMessageHandler(async remoteMessage =>
    showNotification(
      remoteMessage.notification?.title,
      remoteMessage.notification?.body,
    ),
  );
}
