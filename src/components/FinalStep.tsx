import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React from 'react';
import { getTheme, height, scale, verticalScale } from '../utils';
import { Text } from './Text';
interface FinalStepProps {
  handleFinish: () => void;
  finishIconComponent: React.ReactNode;
  progressComponent: React.ReactNode;
  fakeLoadingData: (progress: number) => {
    text: string;
    isFinish: boolean;
  }[];
  fakeLoadingTimeout: (
    setProgress: React.Dispatch<React.SetStateAction<number>>,
    handleFinish: () => void
  ) => void;
}

const FinalStep = ({
  handleFinish,
  finishIconComponent,
  progressComponent,
  fakeLoadingData,
  fakeLoadingTimeout,
}: FinalStepProps) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    fakeLoadingTimeout(setProgress, handleFinish);
  }, [fakeLoadingTimeout, handleFinish]);

  const stepContent = React.useMemo(() => {
    return fakeLoadingData(progress);
  }, [fakeLoadingData, progress]);
  return (
    <View>
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
            <Text text={item.text} size="xxs" style={styles.stepsTexts} />
          </View>
        ))}
      </View>
      <View style={styles.finalProgressContainer}>
        <Text
          text={`Almost there.. ${Math.round(progress * 100)}%`}
          size="xxs"
        />
        {progressComponent}
      </View>
    </View>
  );
};

export default FinalStep;

const styles = StyleSheet.create({
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