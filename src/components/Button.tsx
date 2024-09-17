import React from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  type GestureResponderEvent,
  Text,
} from 'react-native';
import { getTheme } from '../utils/init';
import { getFontSize, scale, verticalScale } from '../utils/window';

const styles = {
  baseStyle: {
    borderRadius: 60,
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(9),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textStyle: {
    fontSize: getFontSize(15),
  },
  withIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
  },
  large: {
    width: '100%',
  },
  medium: {
    width: '50%',
  },
  pill: {
    width: '40%',
  },
};

interface ButtonProps {
  type?: 'primary' | 'secondary' | 'tertiary' | 'pill';
  withIcon?: React.ReactNode;
  size?: 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  text: string;
  styles?: any;
  buttonFontFamily?: string;
}

interface DefualtButtonProps {
  buttonStyle?: any;
  textStyle?: any;
  backgroundColor: string;
  color: string;
  withIcon?: React.ReactNode;
  size: 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  text: string;
  textColor?: string;
  activityIndicatorColor: string;
  onPress?: (event: GestureResponderEvent) => void;
  type: string;
  externalStyle?: any;
  buttonFontFamily?: string;
}

const { colors } = getTheme();

const buttonOptions = (type: string | undefined) => {
  switch (type) {
    case 'secondary':
      return {
        component: SecondaryButton,
        backgroundColor: colors.secondary,
        color: colors.primary,
      };
    case 'tertiary':
      return {
        component: TertiaryButton,
        backgroundColor: 'transparent',
        color: colors.primary,
      };
    case 'primary':
      return {
        component: PrimaryButton,
        backgroundColor: colors.primary,
        color: colors.white,
      };
    case 'pill':
      return {
        component: PillButton,
        backgroundColor: 'transparent',
        color: colors.primary,
      };
    default:
      return {
        component: PrimaryButton,
        backgroundColor: colors.primary,
        color: colors.white,
      };
  }
};

const Button: React.FC<ButtonProps> = ({
  type = 'primary',
  withIcon,
  size = 'large',
  loading = false,
  disabled = false,
  onPress,
  text,
  buttonFontFamily,
}) => {
  const {
    component: ButtonComponent,
    backgroundColor,
    color,
  } = buttonOptions(type);

  return (
    <ButtonComponent
      backgroundColor={backgroundColor as string}
      color={color}
      withIcon={withIcon}
      size={size}
      disabled={disabled}
      loading={loading}
      onPress={onPress}
      text={text}
      type={type}
      externalStyle={styles}
      activityIndicatorColor={
        type === 'primary' ? colors.white : colors.primary
      }
      buttonFontFamily={buttonFontFamily}
    />
  );
};

const ButtonComponent: React.FC<DefualtButtonProps> = ({
  backgroundColor,
  color,
  withIcon,
  size,
  disabled,
  loading,
  text,
  textColor,
  activityIndicatorColor,
  onPress,
  type,
  externalStyle,
  buttonFontFamily,
}) => {
  const buttonStyle = () => [
    styles.baseStyle,
    withIcon ? styles.withIcon : {},
    { backgroundColor },
    size === 'large'
      ? styles.large
      : size === 'medium'
        ? styles.medium
        : styles.pill,
    disabled && { backgroundColor: '#ECECEC' },
    (type === 'tertiary' || type === 'pill') && {
      borderWidth: 1,
      borderColor: disabled ? colors.gray : colors.primary,
      backgroundColor: 'transparent',
    },
  ];
  const textStyle = () => [
    styles.textStyle,

    {
      color: textColor || color,
      fontSize: type === 'pill' ? getFontSize(14) : getFontSize(16),
      fontFamily: buttonFontFamily,
    },
    disabled && { color: colors.gray },
  ];

  return (
    <TouchableOpacity
      style={[buttonStyle(), externalStyle ? { ...externalStyle } : {}]}
      disabled={disabled}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator size="small" color={activityIndicatorColor} />
      ) : (
        <>
          <Text style={textStyle()}>{text}</Text>
          {withIcon && withIcon}
        </>
      )}
    </TouchableOpacity>
  );
};

const PrimaryButton = (props: DefualtButtonProps) => (
  <ButtonComponent {...props} />
);
const SecondaryButton = (props: DefualtButtonProps) => (
  <ButtonComponent {...props} />
);
const TertiaryButton = (props: DefualtButtonProps) => (
  <ButtonComponent {...props} />
);

const PillButton = (props: DefualtButtonProps) => (
  <ButtonComponent {...props} />
);

export { Button };
