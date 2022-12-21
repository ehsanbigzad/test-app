import React, {useCallback} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import notifee from '@notifee/react-native';

export default function MemoScreen() {
  const showNotification = useCallback(async () => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    });
  }, []);

  return (
    <View style={styles.container}>
      <Pressable onPress={showNotification}>
        <Text>Show notification</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
