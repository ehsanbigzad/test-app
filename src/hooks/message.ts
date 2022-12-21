import {useCallback, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {showNotification} from 'utils/notification';

export default function useMessaging() {
  const register = useCallback(async () => {
    await messaging().registerDeviceForRemoteMessages();
  }, []);

  useEffect(() => {
    register();
    messaging().subscribeToTopic('general');

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      showNotification(
        remoteMessage.notification?.title,
        remoteMessage.notification?.body,
      );
    });
    return unsubscribe;
  }, [register]);
}
