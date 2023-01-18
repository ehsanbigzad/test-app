import React, {useCallback} from 'react';
import {View, StyleSheet, ToastAndroid} from 'react-native';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

import Button from 'ui/button';
import {mScale} from 'styles/mixins';
import {getHttp, postHttp} from 'utils/http';
import type {ScreenProps} from 'types/screens';
import {showNotification} from 'utils/notification';

export default function HomeScreen({navigation}: ScreenProps) {
  /**
   * Show a local notification channel
   */
  const showLocalNotification = useCallback(async () => {
    showNotification('Local notification title', 'Local notification content');
  }, []);

  /**
   * Send notification to me
   */
  const sendNotificationToMe = useCallback(async () => {
    try {
      const token = await messaging().getToken();
      if (token) {
        await postHttp('/notify', {
          token,
        });
        ToastAndroid.show('Please wait a moment.', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Something went wrong, try later.', ToastAndroid.SHORT);
    }
  }, []);

  /**
   * Send notification to all
   */
  const sendNotificationToAll = useCallback(async () => {
    try {
      await getHttp('/notify');
      ToastAndroid.show('Please wait a moment.', ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show('Something went wrong, try later.', ToastAndroid.SHORT);
    }
  }, []);

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
          label="Send notification to all"
        />

        <Button
          type="outline"
          containerStyle={styles.button}
          onPress={async () => {
            await auth().signOut();
          }}
          label="Logout"
        />
        <Button
          containerStyle={styles.button}
          onPress={() => navigation.navigate('Test')}
          label="Go to Test"
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
