import React, {useState} from 'react';
import {View, StyleSheet, ToastAndroid, Pressable} from 'react-native';
import * as MailChecker from 'mailchecker';
import auth from '@react-native-firebase/auth';
import {Eye, EyeSlash} from 'iconsax-react-native';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';

import Text from 'ui/text';
import {colors} from 'styles';
import Button from 'ui/button';
import {mScale} from 'styles/mixins';
import TextField from 'ui/text-field';
import type {ScreenProps} from 'types/screens';
import {firebaseError} from 'constants/firebase';
import KeyboardShift from 'components/keyboard-shift';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const navigation = useNavigation<ScreenProps['navigation']>();

  const [loading, setLoading] = useState<boolean>(false);
  const [passwordHidden, setPasswordHidden] = useState<boolean>(true);

  const {
    control,
    setError,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginFormData>();

  const onSubmit = handleSubmit(async payload => {
    setLoading(true);

    auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .catch(error => {
        setLoading(false);

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
      <Controller
        name="password"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Enter your password.',
          },
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
      <View style={styles.forgotPasswordWrapper}>
        <Pressable
          onPress={() => navigation.navigate('ForgotPassword')}
          hitSlop={10}>
          <Text>Forgot your password?</Text>
        </Pressable>
      </View>
      <Button
        label="Get in to account"
        onPress={onSubmit}
        loading={loading}
        containerStyle={styles.button}
      />
    </KeyboardShift>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: mScale(15),
  },
  forgotPasswordWrapper: {
    marginBottom: mScale(5),
  },
});
