import React from 'react';
import {
  TouchableOpacity,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { getTheme, makeStyles, moderateScale, scale } from '../utils';
import { Icon, type IconTypes } from './Icon';
import type { ProfileMockDataItem } from './ProfileSection';
import { Text, type Sizes } from './Text';

export interface ProfileItemProps {
  handlePress: (item: ProfileMockDataItem) => void;
  item: ProfileMockDataItem;
  index: number;
  iconColor?: string;
  iconSize?: number;
  textStyle?: StyleProp<TextStyle>;
  textSize?: Sizes;
  itemStyle?: StyleProp<ViewStyle>;
  rightIconProps?: {
    color?: string;
    icon?: IconTypes;
    size?: number;
  };
}

const ProfileItem: React.FC<ProfileItemProps> = ({
  handlePress,
  item,
  index,
  iconColor,
  iconSize = 24,
  textStyle,
  textSize = 'md',
  itemStyle,
  rightIconProps,
}) => {
  const styles = useStyles();
  const theme = getTheme();

  const defaultRightIconProps = {
    color: '#918E8D',
    icon: 'profileRight' as IconTypes,
    size: 28,
  };

  const mergedRightIconProps = { ...defaultRightIconProps, ...rightIconProps };

  return (
    <TouchableOpacity
      onPress={() => handlePress(item)}
      key={`${index}-profile-item`}
      style={[
        styles.item,
        {
          borderTopRightRadius: item.id === 1 ? moderateScale(16) : 0,
          borderTopLeftRadius: item.id === 1 ? moderateScale(16) : 0,
          borderBottomRightRadius: item.id === 4 ? moderateScale(16) : 0,
          borderBottomLeftRadius: item.id === 4 ? moderateScale(16) : 0,
        },
        itemStyle,
      ]}
    >
      <Icon
        color={iconColor ?? theme.colors.black}
        icon={item.icon}
        style={[styles.icon]}
        size={iconSize}
      />
      <Text
        color={theme.colors.black}
        style={[styles.itemTitle, textStyle]}
        size={textSize}
      >
        {item.title}
      </Text>
      <Icon
        icon={mergedRightIconProps.icon}
        color={mergedRightIconProps.color}
        size={mergedRightIconProps.size}
      />
    </TouchableOpacity>
  );
};

export { ProfileItem };

const useStyles = makeStyles(() => ({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: moderateScale(10),
    backgroundColor: getTheme().colors.white,
  },
  icon: { marginRight: moderateScale(16) },
  itemTitle: { flex: 1 },
}));
