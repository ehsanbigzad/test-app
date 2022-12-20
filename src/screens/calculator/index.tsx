import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function CalculatorScreen() {
  return (
    <View style={styles.container}>
      <Text>Calculator</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
