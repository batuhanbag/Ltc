import {
  TouchableOpacity,
  View,
  StyleSheet,
  type StyleProp,
  type TextStyle,
} from 'react-native';
import { Icon, type IconTypes } from './Icon';
import { Text } from './Text';
import { getTheme, moderateScale, scale, verticalScale, width } from '../utils';

export interface QuestionnaireDataTypes {
  icon: IconTypes;
  name: string;
  duration: number;
  value: string;
}

interface QuestionnaireListProps {
  item: QuestionnaireDataTypes;
  onPress: () => void;
  nameTextStyle?: StyleProp<TextStyle>;
  durationTextStyle?: StyleProp<TextStyle>;
  isVisibleDuration?: boolean;
  iconSize?: number;
}

const QuestionnaireList = ({
  item,
  onPress,
  nameTextStyle,
  durationTextStyle,
  isVisibleDuration = true,
  iconSize = 40,
}: QuestionnaireListProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.root}>
      <View style={styles.questionnaireBody}>
        <Icon icon={item.icon as IconTypes} size={iconSize} />
        <View style={styles.textContainer}>
          <Text style={nameTextStyle} text={item.name} size="sm" />
          {isVisibleDuration && (
            <Text
              style={durationTextStyle}
              text={`${item.duration} minutes`}
              size="sm"
            />
          )}
        </View>
      </View>
      <Icon icon="chevronRight" size={20} />
    </TouchableOpacity>
  );
};

export { QuestionnaireList };

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: getTheme().colors.primary,
    width: width - scale(40),
    paddingHorizontal: scale(10),
  },
  questionnaireBody: { flexDirection: 'row', alignItems: 'center' },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: verticalScale(4),
    marginLeft: scale(10),
  },
});
