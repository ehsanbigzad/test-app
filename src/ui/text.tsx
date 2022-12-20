import React, {memo} from 'react';
import {
  TextStyle,
  StyleSheet,
  Text as RNText,
  TextProps as RNTextProps,
} from 'react-native';

import {colors, font} from 'styles';

type TextType =
  | 'text'
  | 'caption'
  | 'label'
  | 'footnote'
  | 'title'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5';

interface TextProps extends RNTextProps {
  type?: TextType;
}

function Text({style, children, type = 'text', ...rest}: TextProps) {
  const textStyle = styles[type as keyof typeof styles];

  return (
    <RNText style={[textStyle, style]} {...rest}>
      {children}
    </RNText>
  );
}

const commonStyle: TextStyle = {
  textAlign: 'left',
  fontSize: font.base,
};

const styles = StyleSheet.create({
  text: {
    ...commonStyle,
    color: colors.gray.s800,
  },
  caption: {
    ...commonStyle,
    color: colors.gray.s600,
  },
  label: {
    ...commonStyle,
    fontWeight: '600',
    color: colors.black,
  },
  footnote: {
    ...commonStyle,
    fontSize: font.sm,
    color: colors.gray.s800,
  },
  title: {
    ...commonStyle,
    fontSize: font.md,
    fontWeight: '700',
    color: colors.black,
  },
  h1: {
    ...commonStyle,
    fontSize: font.lg5,
    fontWeight: '700',
    color: colors.black,
  },
  h2: {
    ...commonStyle,
    fontSize: font.lg4,
    fontWeight: '700',
    color: colors.black,
  },
  h3: {
    ...commonStyle,
    fontSize: font.lg3,
    fontWeight: '700',
    color: colors.black,
  },
  h4: {
    ...commonStyle,
    fontSize: font.lg2,
    fontWeight: '700',
    color: colors.black,
  },
  h5: {
    ...commonStyle,
    fontSize: font.lg,
    fontWeight: '700',
    color: colors.black,
  },
});

export default memo(Text);
