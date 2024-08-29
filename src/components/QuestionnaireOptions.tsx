import { TouchableOpacity, View, StyleSheet } from 'react-native';

import { getTheme, moderateScale, scale, verticalScale } from '../utils';
import { Text } from './Text';
import type { ReactNode } from 'react';

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
  optionWidth: number;
}

const QuestionnaireOptions = ({
  index,
  item,
  handleSelectAnswer,
  checkIconComponent,
  isSelected,
  optionWidth,
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
          { width: optionWidth },
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
    backgroundColor: getTheme().colors.secondary,
    borderRadius: moderateScale(32),
    borderWidth: 1,
    borderColor: getTheme().colors.primary,

    paddingLeft: scale(10),
    gap: scale(10),
  },
  selectedAnswerTextContainer: {
    backgroundColor: getTheme().colors.secondary,
    borderColor: getTheme().colors.primary,
  },
  answerText: {
    flex: 1,
    maxWidth: scale(250),
  },
});
