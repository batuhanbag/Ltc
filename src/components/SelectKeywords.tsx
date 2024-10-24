import { useCallback, useMemo } from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { getTheme, moderateScale, scale, verticalScale } from '../utils';
import { Text } from './Text';
import { Icon } from './Icon';

interface QuestionnaireAnswersItem {
  linkId: string;
  type: string;
  text: string;
  answerOption?: AnswerOption[];
  repeats?: boolean;
}

interface AnswerOption {
  valueString: string;
}

interface SelectKeywordsProps {
  keywords: QuestionnaireAnswersItem[];
  selectedAnswers?: Record<number, string[]>;
  setSelectedAnswers?: (answers: Record<number, string[]>) => void;
  currentQuestion: number;
  questionsLength: number;
  valueTextStyle?: StyleProp<TextStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  descriptionTextStyle?: StyleProp<TextStyle>;
  questionContainerStyle?: StyleProp<ViewStyle>;
  questionTextStyle?: StyleProp<TextStyle>;
  question: string;
  title?: string;
  description: string;
  multiple?: boolean;
  maxMultipleSelection?: number;
}

const SelectKeywords: React.FC<SelectKeywordsProps> = ({
  keywords,
  currentQuestion,
  selectedAnswers = {},
  setSelectedAnswers,
  questionsLength,
  valueTextStyle,
  titleTextStyle,
  descriptionTextStyle,
  questionContainerStyle,
  questionTextStyle,
  question,
  title,
  description,
  multiple = false,
  maxMultipleSelection = 2,
}) => {
  const handleSelectKeywords = useCallback(
    (value: string) => {
      const currentSelected = selectedAnswers[currentQuestion] || [];
      let newSelected;

      if (multiple) {
        if (currentSelected.includes(value)) {
          newSelected = currentSelected.filter((item) => item !== value);
        } else {
          if (currentSelected.length < maxMultipleSelection) {
            newSelected = [...currentSelected, value];
          } else {
            return;
          }
        }
      } else {
        newSelected = [value];
      }

      setSelectedAnswers?.({
        ...selectedAnswers,
        [currentQuestion]: newSelected,
      });
    },
    [
      currentQuestion,
      selectedAnswers,
      setSelectedAnswers,
      multiple,
      maxMultipleSelection,
    ]
  );

  const renderAnswers = useCallback(
    ({ item }: { item: AnswerOption }) => {
      const isSelected = selectedAnswers[currentQuestion]?.includes(
        item.valueString
      );

      return (
        <TouchableOpacity
          onPress={() => handleSelectKeywords(item.valueString)}
          style={[styles.keyword, isSelected && styles.selectedKeyword]}
        >
          <Icon icon={isSelected ? 'checkCircle' : 'noCheckCircle'} size={24} />
          <Text
            text={item.valueString}
            size="sm"
            color="black"
            style={valueTextStyle}
          />
        </TouchableOpacity>
      );
    },
    [currentQuestion, selectedAnswers, handleSelectKeywords, valueTextStyle]
  );

  const keyExtractor = useCallback(
    (_item: AnswerOption, index: number) => `${index}-keywords`,
    []
  );

  const currentKeywords = useMemo(
    () => keywords[currentQuestion - 1]?.answerOption,
    [keywords, currentQuestion]
  );

  return (
    <FlatList
      data={currentKeywords}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.keywordsContainer}
      renderItem={renderAnswers}
      scrollEnabled={false}
      ListHeaderComponent={
        <>
          {title && (
            <View style={styles.progressBarContainer}>
              <Text
                text={`${title} ${currentQuestion}/${questionsLength}`}
                size="sm"
                color={getTheme().colors.primary}
                style={titleTextStyle}
              />
            </View>
          )}
          <View style={styles.currentQuestion}>
            <Text
              text={description}
              size="xs"
              color={getTheme().colors.gray}
              style={descriptionTextStyle}
            />
          </View>
          <View style={questionContainerStyle}>
            <Text text={question} style={questionTextStyle} />
          </View>
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  keywordsContainer: {
    gap: verticalScale(20),
    paddingVertical: verticalScale(20),
    backgroundColor: getTheme().colors.white,
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScale(24),
    shadowColor: getTheme().colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
  },
  keyword: {
    width: scale(280),
    paddingVertical: verticalScale(10),
    alignItems: 'center',
    borderRadius: moderateScale(50),
    backgroundColor: getTheme().colors.secondary,
    flexDirection: 'row',
    gap: scale(10),
    paddingHorizontal: scale(20),
    borderWidth: 2,
    borderColor: getTheme().colors.secondary,
  },
  selectedKeyword: {
    borderColor: getTheme().colors.primary,
  },
  progressBarContainer: {
    gap: verticalScale(10),
    width: scale(300),
  },
  currentQuestion: {
    gap: verticalScale(15),
  },
  answerContainer: {
    gap: verticalScale(10),
  },
});

export { SelectKeywords };
