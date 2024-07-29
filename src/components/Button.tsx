import React from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  type GestureResponderEvent,
  Text,
} from 'react-native';

interface ButtonProps {
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
}

const Button: React.FC<ButtonProps> = ({ ...props }) => {
  return (
    <TouchableOpacity disabled={props?.disabled} onPress={props?.onPress}>
      {props?.loading ? (
        <ActivityIndicator size="small" color={props?.activityIndicatorColor} />
      ) : (
        <>
          <Text>{props?.text}</Text>
          {props?.withIcon && props?.withIcon}
        </>
      )}
    </TouchableOpacity>
  );
};

export { Button };
