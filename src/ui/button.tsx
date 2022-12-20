import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';

import Text from './text';
import {colors} from 'styles';
import {mScale, withOpacity} from 'styles/mixins';

interface ButtonProps {
  label?: string;
  loading?: boolean;
  disabled?: boolean;
  onPress: () => void;
  size?: 'small' | 'medium';
  textStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode | string;
  containerStyle?: StyleProp<ViewStyle>;
  type?: 'primary' | 'outline' | 'danger' | 'success' | 'warning';
}

export default function Button({
  label,
  onPress,
  loading,
  disabled,
  children,
  textStyle,
  containerStyle,
  size = 'medium',
  type = 'primary',
}: ButtonProps) {
  const _textStyle = styles[`${type}Text` as keyof typeof styles];
  const _sizeStyle = styles[`${size}Container` as keyof typeof styles];
  const _typeStyle = styles[`${type}Container` as keyof typeof styles];
  const _highlightStyle = styles[`${type}Highlight` as keyof typeof styles];

  const _indicatorColor: string = {
    danger: colors.white,
    success: colors.white,
    warning: colors.black,
    primary: colors.white,
    outline: colors.black,
  }[type];

  if (!label && !children) {
    throw new Error('Button must have either label or children');
  }

  return (
    <Pressable
      disabled={disabled || loading}
      onPress={() => !disabled && !loading && onPress && onPress()}
      style={({pressed}) => [
        _typeStyle as ViewStyle,
        _sizeStyle as ViewStyle,
        (pressed || disabled || loading) && (_highlightStyle as ViewStyle),
        containerStyle,
      ]}>
      {loading ? (
        <ActivityIndicator size="small" color={_indicatorColor} />
      ) : children ? (
        children
      ) : (
        label && <Text style={[_textStyle, textStyle]}>{label}</Text>
      )}
    </Pressable>
  );
}

const buttonStyle: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
};

const styles = StyleSheet.create({
  primaryContainer: {
    ...buttonStyle,
    backgroundColor: colors.primary.default,
  },
  primaryHighlight: {
    backgroundColor: withOpacity(colors.primary.default, 0.85),
  },
  outlineContainer: {
    ...buttonStyle,
    borderWidth: 1,
    borderColor: colors.primary.default,
  },
  outlineHighlight: {
    borderColor: withOpacity(colors.primary.default, 0.5),
  },
  dangerContainer: {
    ...buttonStyle,
    backgroundColor: colors.danger.s400,
  },
  dangerHighlight: {
    backgroundColor: withOpacity(colors.danger.s400, 0.85),
  },
  successContainer: {
    ...buttonStyle,
    backgroundColor: colors.success.s400,
  },
  successHighlight: {
    backgroundColor: withOpacity(colors.success.s400, 0.85),
  },
  warningContainer: {
    ...buttonStyle,
    backgroundColor: colors.warning.s400,
  },
  warningHighlight: {
    backgroundColor: withOpacity(colors.warning.s400, 0.85),
  },
  smallContainer: {
    maxHeight: mScale(38),
    minHeight: mScale(38),
    borderRadius: mScale(5),
  },
  mediumContainer: {
    maxHeight: mScale(48),
    minHeight: mScale(48),
    borderRadius: mScale(10),
  },
  primaryText: {
    color: colors.white,
  },
  outlineText: {
    color: colors.black,
  },
  dangerText: {
    color: colors.white,
  },
  successText: {
    color: colors.white,
  },
  warningText: {
    color: colors.black,
  },
});
