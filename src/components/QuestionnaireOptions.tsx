import { TouchableOpacity, View, StyleSheet } from 'react-native';
import React from 'react';
import { getTheme, moderateScale, scale, verticalScale } from '../utils';
import { Text } from './Text';
import type { IconTypes } from './Icon';

interface AnswerOption {
  valueString: string;
}
interface QuestionnaireOptionsProps {
  item: AnswerOption;
  index: number;
  handleSelectAnswer: (answer: string) => void;
  selectedAnswers: any;
  currentQuestion: number;
  checkIcon: string | IconTypes;
}

const QuestionnaireOptions = ({
  index,
  item,
  selectedAnswers,
  currentQuestion,
  handleSelectAnswer,
  checkIcon,
}: QuestionnaireOptionsProps) => {
  const isSelected = React.useMemo(() => {
    return selectedAnswers[currentQuestion] === item.valueString;
  }, [currentQuestion, item.valueString, selectedAnswers]);

  return (
    <TouchableOpacity
      key={`${index}-answer`}
      onPress={() => {
        handleSelectAnswer(item.valueString);
      }}
    >
      <View
        style={[
          styles.anwerTextContainer,
          isSelected ? styles.selectedAnswerTextContainer : {},
        ]}
      >
        {checkIcon}
        <Text
          text={item?.valueString}
          size="xs"
          color={isSelected ? getTheme().colors.white : getTheme().colors.black}
          style={styles.answerText}
        />
      </View>
    </TouchableOpacity>
  );
};

export { QuestionnaireOptions };

const styles = StyleSheet.create({
  anwerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: getTheme().colors.primary,
    width: scale(300),
    paddingLeft: scale(10),
    gap: scale(10),
  },
  selectedAnswerTextContainer: {
    backgroundColor: getTheme().colors.primary,
  },
  answerText: {
    flex: 1,
    maxWidth: scale(250),
  },
});
