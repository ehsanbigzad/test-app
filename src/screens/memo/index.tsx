import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function MemoScreen() {
  return (
    <View style={styles.container}>
      <Text>Memo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
