import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  type ImageSourcePropType,
  type ImageStyle,
  type StyleProp,
  type TextStyle,
} from 'react-native';
import { Text } from './Text';
import { getTheme, moderateScale, scale, verticalScale } from '../utils';

interface BreathingSelectCardProps {
  index: number;
  onPress: () => void;
  item: {
    icon: ImageSourcePropType;
    title: string;
    descriptionValue: string;
  };
  titleStyle?: StyleProp<TextStyle>;
  description?: string;
  descriptionStyle?: StyleProp<TextStyle>;
  descriptionValueStyle?: StyleProp<TextStyle>;
  imageStyle?: StyleProp<ImageStyle>;
}

const BreathingSelectCard = ({
  index,
  onPress,
  item,
  titleStyle,
  description,
  descriptionStyle,
  descriptionValueStyle,
  imageStyle,
}: BreathingSelectCardProps) => {
  return (
    <TouchableOpacity
      key={index}
      onPress={onPress}
      style={styles.breathingMethod}
    >
      <Image source={item.icon as ImageSourcePropType} style={imageStyle} />
      <View style={styles.breathingMethodTextContainer}>
        <Text
          style={titleStyle}
          text={item.title}
          size="md"
          color={getTheme().colors.black}
        />
        {description && (
          <View style={styles.goodFor}>
            <Text
              style={descriptionStyle}
              text={description}
              size="xs"
              color={getTheme().colors.black}
            />
            <Text
              style={descriptionValueStyle}
              text={item.descriptionValue}
              size="xs"
              color={getTheme().colors.primary}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export { BreathingSelectCard };

const styles = StyleSheet.create({
  breathingMethod: {
    width: scale(150),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: verticalScale(150),
    borderRadius: scale(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },
    shadowOpacity: 0.01,
    shadowRadius: 3.84,
    padding: moderateScale(10),
  },
  breathingMethodTextContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
  goodFor: {
    flexDirection: 'row',
    gap: scale(5),
    marginTop: verticalScale(5),
  },
});
