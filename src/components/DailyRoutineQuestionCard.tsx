import {
  View,
  StyleSheet,
  FlatList,
  type StyleProp,
  type TextStyle,
} from 'react-native';
import { AnswerDetail } from '.';
interface DailyRoutineQuestionCardProps {
  index: number;
  item: any | undefined;
  onAnswerPress: () => void;
  dateTextStyle?: StyleProp<TextStyle>;
  questionTextStyle?: StyleProp<TextStyle>;
  answerTextStyle?: StyleProp<TextStyle>;
}

const DailyRoutineQuestionCard = ({
  index,
  item,
  onAnswerPress,
  dateTextStyle,
  questionTextStyle,
  answerTextStyle,
}: DailyRoutineQuestionCardProps) => {
  return (
    <View style={styles.card} key={`${index}-question`}>
      <FlatList
        data={item?.questions}
        // eslint-disable-next-line @typescript-eslint/no-shadow
        keyExtractor={(index) => `${index}-answer-detail`}
        // eslint-disable-next-line @typescript-eslint/no-shadow
        renderItem={({ item, index }) => {
          return (
            <AnswerDetail
              item={item}
              index={index}
              onAnswerPress={onAnswerPress}
              dateTextStyle={dateTextStyle}
              questionTextStyle={questionTextStyle}
              answerTextStyle={answerTextStyle}
            />
          );
        }}
      />
    </View>
  );
};

export { DailyRoutineQuestionCard };

const styles = StyleSheet.create({
  card: {},
});
