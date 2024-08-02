import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { Icon, type IconTypes } from './Icon';
import { getTheme } from '../utils';

interface NestedCirclesProps {
  icon: IconTypes;
  iconSize: number;
  outerCircleSize?: number;
  innerCircleSize?: number;
  outerCircleColor?: string;
  innerCircleColor?: string;
  borderColor?: string;
  rotationDegree?: number;
  style?: ViewStyle;
}

const NestedCircles: React.FC<NestedCirclesProps> = ({
  icon,
  iconSize,
  outerCircleSize = 144,
  innerCircleSize = 100,
  outerCircleColor = 'transparent',
  innerCircleColor = getTheme().colors.primary,
  borderColor = getTheme().colors.primary,
  rotationDegree = 300,
  style,
}) => {
  const styles = createStyles(
    outerCircleSize,
    innerCircleSize,
    outerCircleColor,
    innerCircleColor,
    borderColor,
    rotationDegree
  );

  return (
    <View style={[styles.container, style]}>
      <View style={styles.outerCircle}>
        <View style={styles.innerCircle}>
          <View style={styles.content}>
            <Icon icon={icon} size={iconSize} />
          </View>
        </View>
      </View>
    </View>
  );
};

const createStyles = (
  outerSize: number,
  innerSize: number,
  outerColor: string,
  innerColor: string,
  borderColor: string,
  rotationDegree: number
) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 24,
    },
    outerCircle: {
      width: outerSize,
      height: outerSize,
      borderRadius: outerSize / 2,
      borderWidth: 30,
      borderColor: borderColor,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopColor: outerColor,
      transform: [{ rotate: `${rotationDegree}deg` }],
    },
    innerCircle: {
      width: innerSize,
      height: innerSize,
      borderRadius: innerSize / 2,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: innerColor,
      borderColor: borderColor,
    },
    content: { transform: [{ rotate: `${-rotationDegree}deg` }] },
  });

export { NestedCircles };
