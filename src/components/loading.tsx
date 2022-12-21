import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

import {colors} from 'styles';

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.primary.default} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
