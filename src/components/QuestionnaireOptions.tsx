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
          // eslint-disable-next-line react-native/no-inline-styles
          {
            borderWidth: isSelected ? 1 : 0,
            borderColor: isSelected ? getTheme().colors.primary : 'transparent',
          },
        ]}
      >
        {checkIconComponent}
        <Text
          text={item?.valueString}
          size="xs"
          color={getTheme().colors.black}
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
