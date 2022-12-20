import React, {memo, useRef, useState} from 'react';
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

interface TextFieldProps extends TextInputProps {
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

function TextField({
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
}: TextFieldProps) {
  const inputRef = useRef<TextInput>(null);
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
            onPress={() =>
              onStartWidgetPress
                ? onStartWidgetPress()
                : inputRef.current?.focus()
            }
            style={styles.startWidgetWrapper}>
            {startWidget}
          </Pressable>
        )}
        <TextInput
          ref={inputRef}
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
            onPress={() =>
              onEndWidgetPress ? onEndWidgetPress() : inputRef.current?.focus()
            }
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
    alignItems: 'center',
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
    justifyContent: 'center',
    paddingEnd: mScale(7),
  },
  textField: {
    flex: 1,
    height: mScale(45),
    fontSize: font.base,
    color: colors.black,
  },
  endWidgetWrapper: {
    alignSelf: 'stretch',
    justifyContent: 'center',
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

export default memo(TextField);
