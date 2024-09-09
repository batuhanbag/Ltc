import React from 'react';
import {
  FlatList,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { Text, type Sizes } from './Text';
import { ProfileItem, type ProfileItemProps } from './ProfileItem';
import { makeStyles, moderateScale, verticalScale } from '../utils';
import type { IconTypes } from './Icon';

export interface ProfileSectionType {
  title?: string;
  items: ProfileMockDataItem[];
}

export interface ProfileMockDataItem {
  id: number | string;
  title: string;
  icon: IconTypes;
  onPress?: () => void;
  stack?: string;
  screen?: string;
  [key: string]: any;
}

interface ProfileSectionProps {
  item: ProfileSectionType;
  index: number;
  handlePress: (item: ProfileMockDataItem) => void;
  sectionTextStyle?: StyleProp<TextStyle>;
  sectionTextSize?: Sizes;
  containerStyle?: StyleProp<ViewStyle>;
  sectionStyle?: StyleProp<ViewStyle>;
  separatorStyle?: StyleProp<ViewStyle>;
  itemProps?: Partial<ProfileItemProps>;
  ListHeaderComponent?: React.ReactElement;
  ListFooterComponent?: React.ReactElement;
  profileItemTextStyles?: StyleProp<TextStyle>;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  item,
  index,
  handlePress,
  sectionTextStyle,
  sectionTextSize = 'sm',
  containerStyle,
  sectionStyle,
  separatorStyle,
  itemProps,
  ListHeaderComponent,
  ListFooterComponent,
  profileItemTextStyles,
}) => {
  const styles = useStyles();

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.section, sectionStyle]}>
        {item.title && (
          <Text
            size={sectionTextSize}
            style={[styles.sectionTitle, sectionTextStyle]}
          >
            {item.title}
          </Text>
        )}
        <FlatList
          data={item.items}
          renderItem={({ item: subItem, index: subIndex }) => (
            <ProfileItem
              item={subItem}
              index={subIndex}
              handlePress={handlePress}
              textStyle={profileItemTextStyles}
              {...itemProps}
            />
          )}
          ItemSeparatorComponent={() => (
            <View style={[styles.separator, separatorStyle]} />
          )}
          keyExtractor={(subItem, idx) => `${index}-${idx}-${subItem.id}`}
          scrollEnabled={false}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={ListFooterComponent}
        />
      </View>
    </View>
  );
};

export { ProfileSection };

const useStyles = makeStyles(() => ({
  container: {},
  section: { marginBottom: verticalScale(20) },
  sectionTitle: {
    marginBottom: verticalScale(15),
    marginHorizontal: moderateScale(10),
    marginTop: verticalScale(10),
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
}));
