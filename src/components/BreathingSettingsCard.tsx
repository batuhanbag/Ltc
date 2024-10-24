import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';
import { Icon, type IconTypes } from './Icon';
import { getTheme, moderateScale } from '../utils';
import { Text } from './Text';

interface BreathingSettingsCardProps {
  value: number;
  backgroundColor?: string;
  leftIcon: IconTypes;
  rightIcon: IconTypes;
  iconSize?: number;
  containerStyle?: ViewStyle;
  valueContainerStyle?: ViewStyle;
  valueTextStyle?: ViewStyle;
  breathsTextStyle?: ViewStyle;
  buttonContainerStyle?: ViewStyle;
  minValue?: number;
  maxValue?: number;
  leftIconPress?: () => void;
  rightIconPress?: () => void;
  disabled?: boolean;
  breathsText?: string;
}

const BreathingSettingsCard: React.FC<BreathingSettingsCardProps> = ({
  value,
  backgroundColor = '#FFFFFF',
  leftIcon,
  rightIcon,
  iconSize = 45,
  containerStyle,
  valueContainerStyle,
  valueTextStyle,
  breathsTextStyle,
  buttonContainerStyle,
  maxValue = Infinity,
  leftIconPress,
  rightIconPress,
  disabled = false,
  breathsText,
}) => {
  const styles = createStyles(backgroundColor);

  return (
    <View style={[styles.settingsContainer, containerStyle]}>
      <TouchableOpacity
        onPress={leftIconPress}
        style={[styles.settingsButtonContainer, buttonContainerStyle]}
        disabled={disabled}
      >
        <Icon icon={leftIcon} size={iconSize} />
      </TouchableOpacity>
      <View style={[styles.valueContainer, valueContainerStyle]}>
        <Text
          text={value.toString()}
          color={getTheme().colors.primary}
          size="xxl"
          style={valueTextStyle}
        />
        <Text
          text={breathsText}
          color={getTheme().colors.gray}
          size="xxs"
          style={breathsTextStyle}
        />
      </View>
      <TouchableOpacity
        onPress={rightIconPress}
        style={[styles.settingsButtonContainer, buttonContainerStyle]}
      >
        <Icon
          icon={rightIcon}
          size={iconSize}
          color={value >= maxValue ? getTheme().colors.gray : undefined}
          onPress={rightIconPress}
        />
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (backgroundColor: string) =>
  StyleSheet.create({
    settingsContainer: {
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: backgroundColor,
      borderRadius: moderateScale(16),
      padding: moderateScale(8),
      width: '100%',
    },
    valueContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    settingsButtonContainer: {},
  });

export { BreathingSettingsCard };
