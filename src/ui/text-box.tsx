import React, {memo, useState} from 'react';
import {
  View,
  ViewStyle,
  TextInput,
  TextStyle,
  StyleProp,
  TextInputProps,
  StyleSheet,
  Pressable,
} from 'react-native';

import Text from './text';
import {colors, font} from 'styles';
import {mScale} from 'styles/mixins';

interface TextBoxProps extends TextInputProps {
  label: string;
  error?: string;
  description?: string;
  style?: StyleProp<TextStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  endWidget?: JSX.Element;
  startWidget?: JSX.Element;
  onEndWidgetPress?: () => void;
  onStartWidgetPress?: () => void;
}

function TextBox({
  label,
  error,
  style,
  wrapperStyle,
  description,
  containerStyle,
  endWidget,
  onFocus,
  onBlur,
  startWidget,
  onEndWidgetPress,
  onStartWidgetPress,
  ...rest
}: TextBoxProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.textFieldWrapper,
          isFocused ? styles.textFieldWrapperFocused : null,
          wrapperStyle,
        ]}>
        {startWidget && (
          <Pressable
            onPress={() => onStartWidgetPress && onStartWidgetPress()}
            style={styles.startWidgetWrapper}>
            {startWidget}
          </Pressable>
        )}
        <TextInput
          multiline={true}
          numberOfLines={10}
          onFocus={e => {
            setIsFocused(true);
            onFocus && onFocus(e);
          }}
          onBlur={e => {
            setIsFocused(false);
            onBlur && onBlur(e);
          }}
          allowFontScaling={false}
          style={[styles.textField, style]}
          clearButtonMode={'while-editing'}
          cursorColor={colors.primary.default}
          {...rest}
        />
        {endWidget && (
          <Pressable
            hitSlop={10}
            onPress={() => onEndWidgetPress && onEndWidgetPress()}
            style={styles.endWidgetWrapper}>
            {endWidget}
          </Pressable>
        )}
      </View>
      {(error || description) && (
        <View style={styles.messageWrapper}>
          {error ? (
            <Text style={styles.messageError}>{error}</Text>
          ) : (
            <Text style={styles.message}>{description ?? ''}</Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: mScale(15),
  },
  label: {
    marginBottom: mScale(7.5),
  },
  textFieldWrapper: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.gray.s300,
    borderRadius: mScale(8.5),
    paddingHorizontal: mScale(10),
  },
  textFieldWrapperFocused: {
    borderColor: colors.gray.s700,
  },
  startWidgetWrapper: {
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    paddingEnd: mScale(7),
  },
  textField: {
    flex: 1,
    fontSize: font.base,
    color: colors.black,
    textAlignVertical: 'top',
  },
  endWidgetWrapper: {
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    paddingStart: mScale(5),
  },
  messageWrapper: {
    marginTop: mScale(5),
  },
  message: {
    fontSize: font.sm,
  },
  messageError: {
    fontSize: font.sm,
    color: colors.danger.s400,
  },
});

export default memo(TextBox);
