import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {View, StyleSheet, ScrollView, ToastAndroid} from 'react-native';

import Text from 'ui/text';
import Button from 'ui/button';
import {postHttp} from 'utils/http';
import {mScale} from 'styles/mixins';
import TextField from 'ui/text-field';
import KeyboardShift from 'components/keyboard-shift';
import OperatorSelector from 'components/operator-selector';

interface CalculatorFormData {
  x: string;
  y: string;
  operator: string;
}

export default function CalculatorScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<CalculatorFormData>({
    defaultValues: {
      operator: '+',
    },
  });

  const onSubmit = handleSubmit(async payload => {
    setLoading(true);

    try {
      const response = await postHttp('/calculate', payload);
      setResult(response.result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      ToastAndroid.show('Something went wrong, try later.', ToastAndroid.SHORT);
    }
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <KeyboardShift>
        <Controller
          name="x"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Enter x value.',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextField
              label="Value for X"
              value={value}
              returnKeyType="default"
              autoComplete="off"
              autoCapitalize="none"
              keyboardType="number-pad"
              onBlur={onBlur}
              onChangeText={onChange}
              error={errors.x?.message}
            />
          )}
        />
        <Controller
          name="y"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Enter y value.',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextField
              label="Value for Y"
              value={value}
              returnKeyType="default"
              autoComplete="off"
              autoCapitalize="none"
              keyboardType="number-pad"
              onBlur={onBlur}
              onChangeText={onChange}
              error={errors.y?.message}
            />
          )}
        />
        <Controller
          name="operator"
          control={control}
          render={({field: {onChange, value}}) => (
            <OperatorSelector value={value} onChange={onChange} />
          )}
        />
        <Button
          label="Calculate"
          onPress={onSubmit}
          loading={loading}
          containerStyle={styles.button}
        />
        {result ? (
          <View style={styles.result}>
            <Text type="title">Result: {result}</Text>
          </View>
        ) : null}
      </KeyboardShift>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: mScale(25),
  },
  button: {
    marginTop: mScale(15),
  },
  result: {
    marginTop: mScale(25),
    alignItems: 'center',
  },
});
