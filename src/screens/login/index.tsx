import React from 'react';
import {
  View,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';

import Text from 'ui/text';
import {mScale} from 'styles/mixins';
import type {ScreenProps} from 'types/screens';
import LoginForm from './components/login-form';

export default function LoginScreen({navigation}: ScreenProps) {
  const {width} = useWindowDimensions();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.patternWrapper, {height: width * 0.8}]}>
        <Image
          source={require('@assets/images/pattern3.png')}
          style={[styles.pattern, {height: width * 0.8, width}]}
        />
      </View>
      <View style={styles.formWrapper}>
        <Text type="h3" style={styles.title}>
          Login
        </Text>
        <LoginForm />
        <View style={styles.signupWrapper}>
          <Text type="caption">Not a member?</Text>
          <Pressable
            hitSlop={15}
            style={styles.signup}
            onPress={() => navigation.navigate('Signup')}>
            <Text>Create account</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: mScale(25),
  },
  patternWrapper: {
    overflow: 'hidden',
    marginBottom: mScale(30),
  },
  pattern: {
    resizeMode: 'cover',
    position: 'absolute',
  },
  formWrapper: {
    paddingHorizontal: mScale(30),
  },
  title: {
    marginBottom: mScale(25),
  },
  signupWrapper: {
    flex: 1,
    marginTop: mScale(20),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signup: {
    padding: 1,
    marginStart: mScale(5),
  },
});
