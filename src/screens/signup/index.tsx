import React, {useMemo} from 'react';
import {
  View,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import {ArrowLeft} from 'iconsax-react-native';

import Text from 'ui/text';
import {colors} from 'styles';
import {mScale} from 'styles/mixins';
import type {ScreenProps} from 'types/screens';
import SignupForm from './components/signup-form';

export default function SignupScreen({navigation}: ScreenProps) {
  const {width} = useWindowDimensions();

  const renderCloseBtn = useMemo(() => {
    return (
      <Pressable
        hitSlop={20}
        style={styles.closeBtn}
        onPress={() => navigation.goBack()}>
        <ArrowLeft color={'#fff'} size={20} />
      </Pressable>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.patternWrapper, {height: width * 0.8}]}>
        <Image
          source={require('@assets/images/pattern3.png')}
          style={[styles.pattern, {height: width * 0.8, width}]}
        />
        {renderCloseBtn}
      </View>
      <View style={styles.formWrapper}>
        <Text type="h3" style={styles.title}>
          Signup
        </Text>
        <SignupForm />
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
  closeBtn: {
    top: mScale(20),
    start: mScale(20),
    width: mScale(40),
    height: mScale(40),
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary.t30,
  },
  title: {
    marginBottom: mScale(25),
  },
});
