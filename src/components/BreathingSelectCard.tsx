import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  type ImageSourcePropType,
} from 'react-native';
import { Text } from './Text';
import { getTheme, moderateScale, scale, verticalScale } from '../utils';

interface BreathingSelectCardProps {
  index: number;
  onPress: () => void;
  item: {
    icon: ImageSourcePropType;
    title: string;
    goodFor: string;
  };
}

const BreathingSelectCard = ({
  index,
  onPress,
  item,
}: BreathingSelectCardProps) => {
  return (
    <TouchableOpacity
      key={index}
      onPress={onPress}
      style={styles.breathingMethod}
    >
      <Image source={item.icon as ImageSourcePropType} />
      <View style={styles.breathingMethodTextContainer}>
        <Text text={item.title} size="md" color={getTheme().colors.black} />
        <View style={styles.goodFor}>
          <Text text="Good for:" size="xs" color={getTheme().colors.black} />
          <Text
            text={item.goodFor}
            size="xs"
            color={getTheme().colors.primary}
          />
        </View>
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
    elevation: 5,
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
