import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Icon, Text, type IconTypes } from '.';
import { scale, verticalScale } from '../utils/window';

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
}

const Header = ({
  title,
  type,
  rightIcon,
  leftIcon,
  rightIconPress,
  leftIconPress,
  iconColor,
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
      default:
        return styles.headerContainer;
    }
  };

  return (
    <View style={[styles.headerContainer, getHeaderStyle()]}>
      {(type === 'singleWithLeftIcon' || type === 'double') &&
        renderIcon(leftIcon, leftIconPress)}
      <Text text={title} />
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
