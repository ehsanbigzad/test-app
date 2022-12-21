import React, {useState} from 'react';
import {StyleSheet, ToastAndroid} from 'react-native';
import * as MailChecker from 'mailchecker';
import type {ScreenProps} from 'types/screens';
import auth from '@react-native-firebase/auth';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';

import Button from 'ui/button';
import {mScale} from 'styles/mixins';
import TextField from 'ui/text-field';
import {firebaseError} from 'constants/firebase';
import KeyboardShift from 'components/keyboard-shift';

interface ForgotPasswordFormData {
  email: string;
}

export default function ForgotPasswordForm() {
  const navigation = useNavigation<ScreenProps['navigation']>();

  const [loading, setLoading] = useState<boolean>(false);

  const {
    control,
    setError,
    handleSubmit,
    formState: {errors},
  } = useForm<ForgotPasswordFormData>();

  const onSubmit = handleSubmit(async payload => {
    setLoading(true);

    auth()
      .sendPasswordResetEmail(payload.email)
      .then(() => {
        ToastAndroid.show(
          'A rest password link has been sent to your email.',
          ToastAndroid.SHORT,
        );

        navigation.goBack();
      })
      .catch(error => {
        if (error.code === firebaseError.NOT_FOUND) {
          setError('email', {
            message: 'This email does not exist.',
          });
          return;
        }

        if (error.code === firebaseError.INVALID_EMAIL) {
          setError('email', {
            message: 'Email is invalid, try another.',
          });
          return;
        }

        ToastAndroid.show(
          'Something went wrong, try later.',
          ToastAndroid.SHORT,
        );
      });
  });

  return (
    <KeyboardShift>
      <Controller
        name="email"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Enter your email.',
          },
          validate: value => {
            return MailChecker.isValid(value) || 'Enter a valid email.';
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextField
            label="Email"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            error={errors.email?.message}
          />
        )}
      />
      <Button
        label="Send me a reset link"
        containerStyle={styles.button}
        onPress={onSubmit}
        loading={loading}
      />
    </KeyboardShift>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: mScale(15),
  },
});
