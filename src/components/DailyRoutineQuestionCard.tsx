import { View, StyleSheet, FlatList } from 'react-native';
import { AnswerDetail } from '.';
interface DailyRoutineQuestionCardProps {
  index: number;
  item: any | undefined;
}

const DailyRoutineQuestionCard = ({
  index,
  item,
}: DailyRoutineQuestionCardProps) => {
  return (
    <View style={styles.card} key={`${index}-question`}>
      <FlatList
        data={item?.questions}
        // eslint-disable-next-line @typescript-eslint/no-shadow
        keyExtractor={(index) => `${index}-answer-detail`}
        // eslint-disable-next-line @typescript-eslint/no-shadow
        renderItem={({ item, index }) => {
          return <AnswerDetail item={item} index={index} />;
        }}
      />
    </View>
  );
};

export { DailyRoutineQuestionCard };

const styles = StyleSheet.create({
  card: {},
});
