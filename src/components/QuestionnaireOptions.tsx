import { TouchableOpacity, View, StyleSheet } from 'react-native';
import React, { type ReactNode } from 'react';
import { getTheme, moderateScale, scale, verticalScale } from '../utils';
import { Text } from './Text';

interface AnswerOption {
  valueString: string;
}
interface QuestionnaireOptionsProps {
  item: AnswerOption;
  index: number;
  handleSelectAnswer: (answer: string) => void;
  selectedAnswers: any;
  currentQuestion: number;
  checkIconComponent: ReactNode;
  isSelected: boolean;
}

const QuestionnaireOptions = ({
  index,
  item,
  handleSelectAnswer,
  checkIconComponent,
  isSelected,
}: QuestionnaireOptionsProps) => {
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
        {checkIconComponent}
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
