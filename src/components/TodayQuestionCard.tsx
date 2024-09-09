import {
  View,
  StyleSheet,
  TouchableOpacity,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Icon, Text } from '.';
import { getTheme, moderateScale, verticalScale } from '../utils';

interface TodayQuestionCardProps {
  randomQuestion: {
    linkId: string;
    type: string;
    text: string;
  };
  onShufflePress?: () => void;
  onAnswerPress?: () => void;
  cardStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  todayTitleStyle?: StyleProp<ViewStyle>;
  todayQuestionStyle?: StyleProp<ViewStyle>;
}

const TodayQuestionCard = ({
  randomQuestion,
  onShufflePress,
  onAnswerPress,
  cardStyle,
  buttonStyle,
  todayTitleStyle,
  todayQuestionStyle,
}: TodayQuestionCardProps) => {
  return (
    <View style={styles.card ?? cardStyle}>
      <Text
        text={"Today's Question"}
        size="xs"
        color={getTheme().colors.black}
        style={todayTitleStyle}
      />
      <Text text={randomQuestion.text} size="md" style={todayQuestionStyle} />
      <View style={styles.buttons ?? buttonStyle}>
        <TouchableOpacity onPress={onShufflePress} activeOpacity={0.8}>
          <Icon icon="shuffle" size={36} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onAnswerPress}
          activeOpacity={0.8}
          disabled={!randomQuestion.text}
        >
          <Icon icon="journalRight" size={36} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { TodayQuestionCard };

const styles = StyleSheet.create({
  card: {
    backgroundColor: getTheme().colors.white,
    padding: moderateScale(20),
    borderRadius: 16,
    gap: verticalScale(6),
    marginTop: verticalScale(20),
  },

  buttons: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(15),
  },
});
