import React from 'react';
import {StyleSheet, ScrollView, SafeAreaView} from 'react-native';

import SignupForm from './components/signup-form';

export default function SignupScreen() {
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <SignupForm />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
});
