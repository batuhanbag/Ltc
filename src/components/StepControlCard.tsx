import React from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { getTheme, moderateScale, scale, verticalScale } from '../utils';
import { Icon, type IconTypes } from './Icon';
import { Text, type Sizes } from './Text';

interface StepData {
  icon: IconTypes;
  title: string;
  time: string;
}

interface StepControlCardProps {
  data: StepData[];
  containerStyle?: ViewStyle;
  iconSize?: number;
  titleFontFamily?: string;
  titleFontSize?: Sizes;
  timeFontFamily?: string;
  timeFontSize?: Sizes;
  timeColor?: string;
  itemSpacing?: number;
}

const StepControlCard: React.FC<StepControlCardProps> = ({
  data,
  containerStyle,
  iconSize = 32,
  titleFontSize = 'sm',
  timeFontSize = 'sm',
  timeColor = getTheme().colors.secondary,
  itemSpacing = scale(8),
}) => {
  const styles = createStyles(itemSpacing);

  return (
    <View style={[styles.stepInfoContainer, containerStyle]}>
      {data.map((step: StepData, index: number) => (
        <View key={`breathingStep-${index}`} style={styles.stepItemContainer}>
          <Icon icon={step.icon} size={iconSize} />
          <View style={styles.textContainer}>
            <Text text={step.title} size={titleFontSize} />
            <Text text={step.time} size={timeFontSize} color={timeColor} />
          </View>
        </View>
      ))}
    </View>
  );
};

const createStyles = (itemSpacing: number) =>
  StyleSheet.create({
    stepInfoContainer: {
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: getTheme().colors.white,
      borderRadius: moderateScale(16),
      paddingHorizontal: scale(8),
      paddingVertical: verticalScale(16),
    },
    stepItemContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: itemSpacing / 2,
    },
    textContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: verticalScale(8),
      gap: verticalScale(2),
    },
  });

export { StepControlCard };
