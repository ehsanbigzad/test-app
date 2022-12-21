import React from 'react';
import {View, StyleSheet} from 'react-native';
import {mScale} from 'styles/mixins';
import Button from 'ui/button';
import Text from 'ui/text';

interface OperatorSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function OperatorSelector({
  value,
  onChange,
}: OperatorSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Operator</Text>
      <View style={styles.wrapper}>
        <Button
          label="+"
          containerStyle={styles.btn}
          onPress={() => onChange('+')}
          type={value === '+' ? 'primary' : 'outline'}
        />
        <View style={styles.spacer} />
        <Button
          label="-"
          containerStyle={styles.btn}
          onPress={() => onChange('-')}
          type={value === '-' ? 'primary' : 'outline'}
        />
        <View style={styles.spacer} />
        <Button
          label="*"
          containerStyle={styles.btn}
          onPress={() => onChange('*')}
          type={value === '*' ? 'primary' : 'outline'}
        />
        <View style={styles.spacer} />
        <Button
          label="/"
          containerStyle={styles.btn}
          onPress={() => onChange('/')}
          type={value === '/' ? 'primary' : 'outline'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
  btn: {
    flex: 1,
  },
  spacer: {
    width: mScale(15),
  },
  label: {
    marginBottom: mScale(7.5),
  },
  container: {
    marginBottom: mScale(15),
  },
});
