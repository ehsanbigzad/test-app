import React, {useState} from 'react';
import {View, StyleSheet, ToastAndroid} from 'react-native';
import * as MailChecker from 'mailchecker';
import auth from '@react-native-firebase/auth';
import {Eye, EyeSlash} from 'iconsax-react-native';
import {useForm, Controller} from 'react-hook-form';

import {colors} from 'styles';
import Button from 'ui/button';
import {mScale} from 'styles/mixins';
import TextField from 'ui/text-field';
import {firebaseError} from 'constants/firebase';
import {validatePasswordWithMessage} from 'utils/validation';

interface SignupFormData {
  email: string;
  password: string;
}

export default function SignupForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordHidden, setPasswordHidden] = useState<boolean>(true);

  const {
    control,
    setError,
    handleSubmit,
    formState: {errors},
  } = useForm<SignupFormData>();

  const onSubmit = handleSubmit(async payload => {
    setLoading(true);

    auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .catch(error => {
        setLoading(false);

        if (error.code === firebaseError.EMAIL_IN_USE) {
          setError('email', {
            message: 'This email already exist.',
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
    <View>
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
      <Controller
        name="password"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Enter your password.',
          },
          validate: validatePasswordWithMessage,
        }}
        render={({field: {onChange, onBlur, value}}) => {
          return (
            <TextField
              label="Password"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              secureTextEntry={passwordHidden}
              error={errors.password?.message}
              onEndWidgetPress={() => setPasswordHidden(prev => !prev)}
              endWidget={
                passwordHidden ? (
                  <Eye color={colors.gray.s600} size={mScale(22)} />
                ) : (
                  <EyeSlash color={colors.gray.s600} size={mScale(22)} />
                )
              }
            />
          );
        }}
      />
      <Button
        label="Create my account"
        containerStyle={styles.button}
        onPress={onSubmit}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: mScale(15),
  },
});
