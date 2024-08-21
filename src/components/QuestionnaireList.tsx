import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Icon, type IconTypes } from './Icon';
import { Text } from './Text';
import { getTheme, moderateScale, scale, verticalScale, width } from '../utils';

export interface QuestionnaireDataTypes {
  icon: IconTypes;
  name: string;
  duration: number;
  value:
    | 'gad-7-questionnaire'
    | 'who-5-questionnaire'
    | 'dass-21-questionnaire'
    | 'phq-9-questionnaire';
}

interface QuestionnaireListProps {
  index: number;
  item: QuestionnaireDataTypes;
  goToQuestionnairePlay: () => void;
}

const QuestionnaireList = ({
  index,
  item,
  goToQuestionnairePlay,
}: QuestionnaireListProps) => {
  return (
    <TouchableOpacity
      onPress={goToQuestionnairePlay}
      style={styles.root}
      key={`${index}-${item.value}-questionnaire`}
    >
      <View style={styles.questionnaireBody}>
        <Icon icon={item.icon as IconTypes} size={40} />
        <View style={styles.textContainer}>
          <Text text={item.name} size="sm" />
          <Text text={`${item.duration} minutes`} size="sm" />
        </View>
      </View>
      <Icon icon="chevronRight" size={20} />
    </TouchableOpacity>
  );
};

export { QuestionnaireList };

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: getTheme().colors.primary,
    width: width - scale(40),
    paddingHorizontal: scale(10),
  },
  questionnaireBody: { flexDirection: 'row', alignItems: 'center' },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: verticalScale(4),
    marginLeft: scale(10),
  },
});
