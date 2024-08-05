import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Text } from '.';
import moment from 'moment';
import { getTheme, moderateScale, scale, verticalScale } from 'src/utils';
import { truncateText } from '../utils/truncateText';

interface AnswerDetailProps {
  item: any | undefined;
  index: number;
  navigation?: any;
  onAnswerPress?: () => void;
}

const AnswerDetail = ({ index, item, onAnswerPress }: AnswerDetailProps) => {
  const today = moment().format('YYYY-MM-DD');

  const dateManipulation = React.useCallback(
    (date: string) => {
      if (date === today) {
        return 'Today';
      } else if (date === moment().subtract(1, 'days').format('YYYY-MM-DD')) {
        return 'Yesterday';
      } else {
        return moment(date).format('DD.MM.YYYY');
      }
    },
    [today]
  );

  return (
    <TouchableOpacity
      onPress={onAnswerPress}
      key={`${index}-answer-detail-card`}
      style={styles.card}
    >
      <Text
        text={dateManipulation(item?.date ?? '')}
        color={getTheme().colors.black}
        size="sm"
      />
      <Text text={item?.text.trim()} size="sm" style={styles.questionText} />

      <Text
        text={truncateText(item?.answer, 142)}
        color={getTheme().colors.black}
        size="xs"
        style={styles.answerText}
      />
    </TouchableOpacity>
  );
};

export { AnswerDetail };

const styles = StyleSheet.create({
  card: {
    backgroundColor: getTheme().colors.white,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(10),
    borderRadius: 16,
    marginTop: verticalScale(10),
    gap: verticalScale(10),
  },
  questionText: {
    lineHeight: moderateScale(22.4),
    maxWidth: scale(230),
  },
  answerText: {
    lineHeight: moderateScale(19.6),
  },
});
