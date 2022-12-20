import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function PhotoScreen() {
  return (
    <View style={styles.container}>
      <Text>Photo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
