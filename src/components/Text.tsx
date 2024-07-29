import {
  Text as RNText,
  type TextProps as RNTextProps,
  type StyleProp,
  type TextStyle,
} from 'react-native';
import React from 'react';
import { getTheme } from '../utils/init';

type Sizes = keyof typeof Sizes;

const { colors } = getTheme();

const Sizes = {
  big: { fontSize: 46 } satisfies TextStyle,
  xxl: { fontSize: 36 } satisfies TextStyle,
  xml: { fontSize: 32 } satisfies TextStyle,
  xsml: { fontSize: 30 } satisfies TextStyle,
  xl: { fontSize: 24 } satisfies TextStyle,
  lg: { fontSize: 20 } satisfies TextStyle,
  md: { fontSize: 18 } satisfies TextStyle,
  sm: { fontSize: 16 } satisfies TextStyle,
  xs: { fontSize: 14 } satisfies TextStyle,
  xxs: { fontSize: 12 } satisfies TextStyle,
};

interface TextProps extends RNTextProps {
  color?: string;
  text?: string;
  style?: StyleProp<TextStyle>;
  size?: Sizes;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  lineHeight?: number;
  textDecoration?:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through';
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  children?: React.ReactNode;
}

const Text = ({
  text,
  size,
  style,
  color,
  textAlign,
  lineHeight,
  textDecoration,
  numberOfLines,
  ellipsizeMode,
  ...props
}: TextProps) => {
  return (
    <RNText
      {...props}
      style={[
        {
          color: color || colors.text,
          ...Sizes[size || 'md'],
          textAlign,
          lineHeight,
          textDecorationLine: textDecoration,
        },
        style,
      ]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
    >
      {text}
      {props.children}
    </RNText>
  );
};

export { Text };
