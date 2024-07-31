import React from 'react';
import {
  TouchableOpacity,
  View,
  type ImageURISource,
  type StyleProp,
  type TextStyle,
} from 'react-native';
import { Text, type TextProps } from './Text';
import {
  moderateScale,
  scale,
  verticalScale,
  width,
  makeStyles,
} from 'src/utils';
import { AutoImage } from './AutoImage';

interface ChatListItemProps {
  onPress: () => void;
  avatar: ImageURISource;
  name: string;
  description?: string;
  nameTextColor?: string;
  nameTextSize?: TextProps['size'];
  nameTextStyle?: StyleProp<TextStyle>;
  descriptionTextColor?: string;
  descriptionTextSize?: TextProps['size'];
  descriptionTextStyle?: StyleProp<TextStyle>;
  backgroundColor: string;
  borderRadius: number;
  avatarWidth: number;
  avatarHeight: number;
}

const ChatListItem: React.FC<ChatListItemProps> = ({
  onPress,
  avatar,
  name,
  description,
  nameTextColor,
  nameTextSize,
  nameTextStyle,
  descriptionTextColor,
  descriptionTextSize,
  descriptionTextStyle,
  ...props
}) => {
  const styles = useStyles(props);

  return (
    <TouchableOpacity onPress={onPress} style={styles.root}>
      <View style={styles.body}>
        {!!avatar && <AutoImage source={avatar} style={styles.avatar} />}

        <View style={styles.textCategory}>
          {!!name && (
            <Text
              text={name}
              style={nameTextStyle}
              size={nameTextSize}
              color={nameTextColor}
            />
          )}
          {!!description && (
            <Text
              text={description}
              size={descriptionTextSize}
              style={descriptionTextStyle}
              adjustsFontSizeToFit
              color={descriptionTextColor}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export { ChatListItem };

const useStyles = makeStyles((_props: ChatListItemProps) => ({
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(_props.borderRadius) || 16,
    backgroundColor: _props.backgroundColor || '#FFF',
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: moderateScale(15),
    width: width - scale(50),
    marginBottom: verticalScale(10),
    paddingTop: verticalScale(5),
  },
  textCategory: {
    marginLeft: moderateScale(12),
    gap: moderateScale(5),
  },
  avatar: {
    width: _props.avatarWidth || 64,
    height: _props.avatarWidth || 64,
    overflow: 'hidden',
    justifyContent: 'center',
  },
}));
