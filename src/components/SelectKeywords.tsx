import { useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getTheme, moderateScale, scale, verticalScale, width } from '../utils';
import { Icon } from './Icon';
import { Text } from './Text';

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
  selectedAnswers?: Record<number, string>;
  setSelectedAnswers?: (answers: Record<number, string>) => void;
  currentQuestion: number;
}

const SelectKeywords: React.FC<SelectKeywordsProps> = ({
  keywords,
  currentQuestion,
  selectedAnswers = {},
  setSelectedAnswers,
}) => {
  const handleSelectKeywords = useCallback(
    (value: string) => {
      setSelectedAnswers?.({
        ...selectedAnswers,
        [currentQuestion]: value,
      });
    },
    [currentQuestion, selectedAnswers, setSelectedAnswers]
  );

  const renderAnswers = useCallback(
    ({ item }: { item: AnswerOption }) => {
      const isSelected = selectedAnswers[currentQuestion] === item.valueString;

      return (
        <TouchableOpacity
          onPress={() => handleSelectKeywords(item.valueString)}
          style={[styles.keyword, isSelected && styles.selectedKeyword]}
        >
          <Icon icon={isSelected ? 'checkCircle' : 'noCheckCircle'} size={24} />
          <Text
            text={item.valueString}
            size="sm"
            color={getTheme().colors.black}
          />
        </TouchableOpacity>
      );
    },
    [currentQuestion, selectedAnswers, handleSelectKeywords]
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
    />
  );
};

const styles = StyleSheet.create({
  keywordsContainer: {
    gap: verticalScale(20),
    flex: 1,
  },
  keyword: {
    width: width - scale(40),
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
});

export { SelectKeywords };
