import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function SignupScreen() {
  return (
    <View style={styles.container}>
      <Text>Signup</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
