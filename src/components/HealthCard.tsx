import {
  StyleSheet,
  TouchableOpacity,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { Icon, Text, type IconTypes } from '.';

import { getTheme, moderateScale, scale, verticalScale, width } from '../utils';

interface HealthCardProps {
  step: number;
  cardTitle?: string;
  cardSubTitle?: string;
  titleTextStyles?: StyleProp<TextStyle>;
  stepsTextStyles?: StyleProp<TextStyle>;
  rootStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  cardIcon?: IconTypes;
}

const HealthCard = ({
  step,
  stepsTextStyles,
  titleTextStyles,
  onPress,
  rootStyle,
  cardTitle,
  cardSubTitle,
  cardIcon = 'appleHealthIcon',
}: HealthCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.taskCard, rootStyle]}>
      <View>
        <Text text={cardTitle} size="sm" style={titleTextStyles} />
        <Text
          text={`${cardSubTitle} ${Math.round(step)}`}
          size="xs"
          style={[styles.taskResult, stepsTextStyles]}
        />
      </View>
      <View style={styles.taskDetail}>
        <Icon icon={cardIcon} size={30} />
      </View>
    </TouchableOpacity>
  );
};

export { HealthCard };

const styles = StyleSheet.create({
  taskCard: {
    borderWidth: 1,
    borderColor: getTheme().colors.white,
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(16),
    gap: verticalScale(15),
    width: width / 2 - scale(30),
    backgroundColor: getTheme().colors.white,
    marginRight: scale(20),
  },
  taskName: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    maxWidth: scale(100),
  },
  checkIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
  },
  taskIcon: {
    width: moderateScale(40),
    height: moderateScale(40),
    marginTop: verticalScale(10),
  },

  taskDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskResult: {
    color: '##363534',
    marginTop: verticalScale(5),
  },
});
