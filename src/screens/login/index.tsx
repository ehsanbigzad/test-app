import React from 'react';
import {StyleSheet, ScrollView, SafeAreaView, Pressable} from 'react-native';

import Text from 'ui/text';
import type {ScreenProps} from 'types/screens';
import LoginForm from './components/login-form';

export default function LoginScreen({navigation}: ScreenProps) {
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <LoginForm />
        <Pressable
          style={styles.createAccount}
          onPress={() => navigation.navigate('Signup')}>
          <Text>Create account</Text>
        </Pressable>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
  createAccount: {
    marginTop: 50,
  },
});
