/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActivityIndicator,
  StyleSheet,
  View,
  type StyleProp,
  type TextStyle,
} from 'react-native';
import React from 'react';
import { getTheme, height, scale, verticalScale } from '../utils';
import { Text } from './Text';
interface FinalStepProps {
  handleFinish: () => void;
  finishIconComponent: React.ReactNode;
  progressComponent: React.ReactNode;

  fakeLoadingTimeout: (
    setProgress: React.Dispatch<React.SetStateAction<number>>,
    handleFinish: () => void
  ) => void;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  progress: number;
  itemTextStyle?: StyleProp<TextStyle>;
  finalProgressTextStyle?: StyleProp<TextStyle>;
  rootStyle?: StyleProp<TextStyle>;
  stepContent?: {
    text: string;
    isFinish: boolean;
  }[];
  finalProgressText?: string;
}

const FinalStep = ({
  handleFinish,
  finishIconComponent,
  progressComponent,
  fakeLoadingTimeout,
  setProgress,
  progress,
  itemTextStyle,
  finalProgressTextStyle,
  rootStyle,
  stepContent,
  finalProgressText,
}: FinalStepProps) => {
  React.useEffect(() => {
    fakeLoadingTimeout(setProgress, handleFinish);
  }, []);

  return (
    <View style={[styles.root, rootStyle]}>
      <View style={styles.stepContentContainer}>
        {stepContent?.map((item, index) => (
          <View style={styles.steps} key={`stepContent-${index}`}>
            {item.isFinish ? (
              finishIconComponent
            ) : (
              <ActivityIndicator
                color={getTheme().colors.primary}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            )}
            <Text
              text={item.text}
              size="xxs"
              style={[styles.stepsTexts, itemTextStyle]}
            />
          </View>
        ))}
      </View>
      <View />
      <View style={styles.finalProgressContainer}>
        <Text
          text={`${finalProgressText} ${Math.round(progress * 100)}%`}
          size="xxs"
          style={finalProgressTextStyle}
        />
        {progressComponent}
      </View>
    </View>
  );
};

export { FinalStep };

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  stepContentContainer: {
    gap: verticalScale(30),
  },
  steps: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
  },
  stepsTexts: {
    width: scale(275),
  },
  finalProgressContainer: {
    alignItems: 'center',
    gap: verticalScale(10),
    marginTop: height * 0.3,
  },
});
