import {
  StyleSheet,
  View,
  TouchableOpacity,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { Icon, type IconTypes } from './Icon';
import { Text, type Sizes } from './Text';
import { getTheme, verticalScale } from '../utils';

interface Props {
  title: string;
  leftIcon: IconTypes;
  rightIcon?: IconTypes;
  leftIconPressed: () => void;
  rightIconPressed?: () => void;
  iconSize?: number;
  textStyle?: StyleProp<TextStyle>;
  textSize?: Sizes;
  textColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const BreathingHeader: React.FC<Props> = ({
  title,
  leftIcon,
  rightIcon,
  leftIconPressed,
  rightIconPressed,
  ...props
}) => {
  return (
    <View style={[styles.header, props.containerStyle ?? {}]}>
      <TouchableOpacity onPress={leftIconPressed}>
        <Icon icon={leftIcon} size={props.iconSize ?? 24} />
      </TouchableOpacity>
      <Text
        text={title}
        size={props.textSize ?? 'md'}
        color={props.textColor ?? getTheme().colors.primary}
      />
      {rightIcon ? (
        <TouchableOpacity onPress={rightIconPressed}>
          <Icon icon={rightIcon} size={props.iconSize ?? 24} />
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: verticalScale(40),
  },
});

export { BreathingHeader };
