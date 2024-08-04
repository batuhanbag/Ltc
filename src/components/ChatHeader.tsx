import React from 'react';
import { View, type ImageSourcePropType } from 'react-native';
import { Icon, type IconTypes } from './Icon';
import { getTheme, makeStyles, moderateScale, verticalScale } from '../utils';
import { AutoImage } from './AutoImage';
import { Text, type TextProps } from './Text';

interface ChatHeaderProps {
  onBackHandler: () => void;
  backIcon?: IconTypes;
  backIconSize?: number;
  backIconColor?: string;
  name: string;
  avatar?: ImageSourcePropType;
  onlineStatus?: string;
  backgroundColor?: string;
  isBorderLess?: boolean;
  borderColor?: string;
  nameColor: string;
  nameTextSize: TextProps['size'];
  avatarSize: number;
  avatarBorderRadius: number;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  onBackHandler,
  name,
  backIcon = 'arrowLeft',
  backIconSize = 24,
  avatar,
  backIconColor,
  onlineStatus,
  nameTextSize,
  ...props
}) => {
  const styles = useStyles(props);
  const { colors } = getTheme();

  return (
    <View style={styles.header}>
      <View style={styles.headerBody}>
        <Icon
          icon={backIcon ?? 'arrowLeft'}
          color={backIconColor ?? colors.black}
          size={backIconSize ?? 24}
          onPress={onBackHandler}
          style={styles.icon}
        />
        <View style={styles.info}>
          {!!avatar && <AutoImage style={styles.avatar} source={avatar} />}

          <View>
            {!!name && (
              <Text text={name} style={styles.name} size={nameTextSize} />
            )}
            {!!onlineStatus && <Text text={onlineStatus} size="xs" />}
          </View>
        </View>
      </View>
    </View>
  );
};

export { ChatHeader };

const useStyles = makeStyles((_props: ChatHeaderProps) => ({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: _props.backgroundColor || '#F7F7FF',
    paddingHorizontal: moderateScale(16),
    justifyContent: 'space-between',
    borderBottomWidth: _props.isBorderLess ? 0 : 1,
    borderBottomColor: _props.borderColor || 'gray',
    width: '100%',

    paddingVertical: verticalScale(10),
  },
  headerBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(20),
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
    right: moderateScale(10),
  },
  name: {
    color: _props.nameColor || '#000',
    marginBottom: moderateScale(8),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: _props.avatarSize || moderateScale(52),
    height: _props.avatarSize || moderateScale(52),
    borderRadius: _props.avatarBorderRadius || 30,
  },
  icon: { marginRight: moderateScale(10) },
}));
