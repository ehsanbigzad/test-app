import React, {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import notifee from '@notifee/react-native';

import Button from 'ui/button';
import {mScale} from 'styles/mixins';

export default function HomeScreen() {
  /**
   * Show a local notification channel
   */
  const showLocalNotification = useCallback(async () => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.displayNotification({
      title: 'Test Notification',
      body: 'This is a test local notification',
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    });
  }, []);

  const sendNotificationToMe = useCallback(() => {}, []);

  const sendNotificationToAll = useCallback(() => {}, []);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Button
          containerStyle={styles.button}
          onPress={showLocalNotification}
          label="Show a local notification"
        />
        <Button
          containerStyle={styles.button}
          onPress={sendNotificationToMe}
          label="Send a notification to me"
        />
        <Button
          containerStyle={styles.button}
          onPress={sendNotificationToAll}
          label="Send a notification to all"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: mScale(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '100%',
  },
  button: {
    marginBottom: mScale(10),
  },
});
