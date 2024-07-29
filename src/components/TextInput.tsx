/* eslint-disable react-native/no-inline-styles */
import { View, TextInput as RNTextInput, StyleSheet } from 'react-native';
import React from 'react';
import { getTheme } from '../utils/init';
import type { IconTypes } from './Icon';
import { Text } from './Text';
import { getFontSize, scale, verticalScale } from '../utils/window';
import { Icon } from './Icon';
import ErrorInfo from './ErrorInfo';

const { colors } = getTheme();

interface TextInputProps {
  ref?: any;
  value?: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  autoFocus?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  style?: object;
  containerStyle?: object;
  inputStyle?: object;
  label?: string;
  rightIcon?: IconTypes;
  leftIcon?: IconTypes;
  rightIconPress?: () => void;
  leftIconPress?: () => void;
  error?: string;
  editable?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  onEndEditing?: () => void;
  onSubmitEditing?: () => void;
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
  textArea?: boolean;
}

const TextInput = (props: TextInputProps) => {
  const {
    ref,
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    keyboardType,
    autoCapitalize,
    autoCorrect,
    autoFocus,
    multiline,
    numberOfLines,
    maxLength,
    style,
    containerStyle,
    inputStyle,
    label,
    rightIcon,
    leftIcon,
    rightIconPress,
    leftIconPress,
    error,
    editable = true,
    onBlur,
    onFocus,
    onEndEditing,
    onSubmitEditing,
    returnKeyType,
    textArea,
  } = props;
  const [isFocused, setIsFocused] = React.useState(false);
  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) {
      onFocus();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) {
      onBlur();
    }
  };

  const handleRightIconPress = () => {
    if (rightIconPress) {
      rightIconPress();
    }
  };

  const handleLeftIconPress = () => {
    if (leftIconPress) {
      leftIconPress();
    }
  };

  return (
    <React.Fragment>
      <View>
        {label && <Text style={styles.label}>{label}</Text>}
        <View
          style={[
            styles.container,
            containerStyle,
            {
              borderColor: error
                ? 'red'
                : isFocused
                  ? colors.primary
                  : '#BFBFBF',
              borderWidth: isFocused ? 1 : 1,
              minHeight: textArea ? verticalScale(100) : verticalScale(20),
              borderRadius: textArea ? 20 : 60,
              alignItems: textArea ? 'flex-start' : 'center',
              backgroundColor: editable ? colors.white : colors.nonEditable,
            },
          ]}
        >
          {leftIcon && (
            <Icon icon={leftIcon} onPress={handleLeftIconPress} size={24} />
          )}
          <RNTextInput
            ref={ref}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            multiline={multiline}
            autoFocus={autoFocus}
            placeholderTextColor={colors.placeholder}
            numberOfLines={numberOfLines}
            maxLength={maxLength}
            style={[styles.input, inputStyle, style]}
            editable={editable}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onEndEditing={onEndEditing}
            onSubmitEditing={onSubmitEditing}
            returnKeyType={returnKeyType}
            textAlignVertical="top"
          />
          {rightIcon && (
            <Icon icon={rightIcon} onPress={handleRightIconPress} size={24} />
          )}
        </View>
        {error && <ErrorInfo error={error} />}
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(8),
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray,
    paddingHorizontal: scale(10),
  },
  input: {
    flex: 1,
    fontSize: getFontSize(16),
    color: colors.placeholder,
    paddingHorizontal: scale(10),
    width: '100%',
    height: '100%',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: getFontSize(14),
    color: '#000',
    marginBottom: verticalScale(10),
  },
});

export { TextInput };
