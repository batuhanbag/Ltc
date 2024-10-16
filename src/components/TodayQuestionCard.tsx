import {
  View,
  StyleSheet,
  TouchableOpacity,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Icon, Text } from '.';
import { getTheme, verticalScale } from '../utils';
import React from 'react';

interface TodayQuestionCardProps {
  randomQuestion: {
    linkId: string;
    type: string;
    text: string;
  };
  onShufflePress?: () => void;
  onAnswerPress?: () => void;
  cardStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  todayTitleStyle?: StyleProp<ViewStyle>;
  todayQuestionStyle?: StyleProp<ViewStyle>;
  wrapperLinearGradientComponent?: React.ReactNode;
  title?: string;
}

const TodayQuestionCard = ({
  randomQuestion,
  onShufflePress,
  onAnswerPress,
  cardStyle,
  buttonStyle,
  todayTitleStyle,
  todayQuestionStyle,
  wrapperLinearGradientComponent,
  title,
}: TodayQuestionCardProps) => {
  const cardContent = (
    <View style={cardStyle}>
      <Text
        text={title}
        size="xs"
        color={getTheme().colors.black}
        style={todayTitleStyle}
      />
      <Text text={randomQuestion.text} size="md" style={todayQuestionStyle} />
      <View style={styles.buttons ?? buttonStyle}>
        <TouchableOpacity onPress={onShufflePress} activeOpacity={0.8}>
          <Icon icon="shuffle" size={36} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onAnswerPress}
          activeOpacity={0.8}
          disabled={!randomQuestion.text}
        >
          <Icon icon="journalRight" size={36} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View>
      {React.isValidElement(wrapperLinearGradientComponent)
        ? React.cloneElement(wrapperLinearGradientComponent, {}, cardContent)
        : cardContent}
    </View>
  );
};

export { TodayQuestionCard };

const styles = StyleSheet.create({
  buttons: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(15),
  },
});
