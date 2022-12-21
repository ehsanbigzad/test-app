import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import Button from 'ui/button';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Button
        label="Logout"
        onPress={() => {
          auth()
            .signOut()
            .then(() => console.log('User signed out!'));
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
