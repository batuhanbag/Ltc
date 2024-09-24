import {
  StyleSheet,
  View,
  TouchableOpacity,
  type StyleProp,
  type TextStyle,
} from 'react-native';
import { Icon, Text, type IconTypes } from '.';
import { scale, verticalScale } from '../utils/window';
import { getTheme } from '../utils';

interface HeaderProps {
  type:
    | 'single'
    | 'singleWithRightIcon'
    | 'singleCenter'
    | 'singleWithLeftIcon'
    | 'double';
  title: string;
  rightIcon?: IconTypes;
  leftIcon?: IconTypes;
  rightIconPress?: () => void;
  leftIconPress?: () => void;
  iconColor?: string;
  textStyle?: StyleProp<TextStyle>;
}

const Header = ({
  title,
  type,
  rightIcon,
  leftIcon,
  rightIconPress,
  leftIconPress,
  iconColor,
  textStyle,
}: HeaderProps) => {
  const renderIcon = (icon?: IconTypes, onPress?: () => void) =>
    icon ? (
      <TouchableOpacity onPress={onPress}>
        <Icon icon={icon} color={iconColor} size={24} />
      </TouchableOpacity>
    ) : (
      <View style={styles.iconPlaceholder} />
    );

  const getHeaderStyle = () => {
    switch (type) {
      case 'singleCenter':
        return styles.singleCenter;
      case 'single':
        return styles.single;
      case 'double':
        return styles.double;
      default:
        return styles.headerContainer;
    }
  };

  return (
    <View style={[styles.headerContainer, getHeaderStyle()]}>
      {(type === 'singleWithLeftIcon' || type === 'double') &&
        renderIcon(leftIcon, leftIconPress)}
      <Text text={title} color={getTheme().colors.primary} style={textStyle} />
      {(type === 'singleWithRightIcon' || type === 'double') &&
        renderIcon(rightIcon, rightIconPress)}
      {type !== 'single' && type !== 'singleCenter' && (
        <View style={styles.skeletonView} />
      )}
    </View>
  );
};

export { Header };

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: verticalScale(40),
    paddingHorizontal: scale(20),
  },
  single: {
    justifyContent: 'flex-start',
  },
  double: {
    justifyContent: 'space-between',
    width: '100%',
  },
  singleCenter: {
    justifyContent: 'center',
  },
  iconPlaceholder: {
    width: 24,
  },
  skeletonView: {
    width: 24,
  },
});
