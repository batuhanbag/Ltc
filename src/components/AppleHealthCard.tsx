import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  type StyleProp,
  type TextStyle,
} from 'react-native';
import { Icon, Text, type IconTypes } from '.';
import { Images } from '../constants';
import { getTheme, moderateScale, scale, verticalScale, width } from '../utils';

interface AppleHealthCardProps {
  step: number;
  titleTextStyles?: StyleProp<TextStyle>;
  stepsTextStyles?: StyleProp<TextStyle>;
  onPress?: () => void;
}

const AppleHealthCard = ({
  step,
  stepsTextStyles,
  titleTextStyles,
  onPress,
}: AppleHealthCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.taskCard}>
      <View>
        <Text text="Physical Activity" size="sm" style={titleTextStyles} />
        <Text
          text={`Steps: ${Math.round(step)}`}
          size="xs"
          style={[styles.taskResult, stepsTextStyles]}
        />
      </View>
      <View style={styles.taskDetail}>
        <Icon icon={'appleHealthIcon' as IconTypes} size={30} />
        <Image
          source={{
            uri: Images.nonChecked,
          }}
          style={styles.checkIcon}
        />
      </View>
    </TouchableOpacity>
  );
};

export default AppleHealthCard;

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
    marginBottom: verticalScale(40),
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
