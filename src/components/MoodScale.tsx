import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  type ImageStyle,
  type ViewStyle,
} from 'react-native';
import Slider from '@react-native-community/slider';
interface MoodScaleProps {
  value: number;
  setValue: (value: number) => void;
  image: string;
  sliderWidth?: number;
  sliderHeight?: number;
  imageSize?: { width: number; height: number };
  customStyles?: {
    container?: ViewStyle;
    slider?: ViewStyle;
    image?: ImageStyle;
  };
  sliderTheme?: {
    disableMinTrackTintColor?: string;
    maximumTrackTintColor?: string;
    minimumTrackTintColor?: string;
    cacheTrackTintColor?: string;
  };
  renderCustomThumb?: () => React.ReactNode;
  progress?: number;
  min?: number;
  max?: number;
}

const MoodScale: React.FC<MoodScaleProps> = ({
  value,
  setValue,
  image,
  imageSize = { width: 150, height: 150 },
  customStyles = {},
  sliderTheme = {},
  min,
  max,
}) => {
  const defaultTheme = {
    disableMinTrackTintColor: 'red',
    maximumTrackTintColor: 'green',
    minimumTrackTintColor: '#8C8AFF',
    cacheTrackTintColor: 'black',
  };

  const mergedTheme = { ...defaultTheme, ...sliderTheme };

  return (
    <View style={[styles.body, customStyles.container]}>
      <Image
        source={{ uri: image }}
        style={[
          styles.moodImage,
          { width: imageSize.width, height: imageSize.height },
          customStyles.image,
        ]}
      />
      <Slider
        style={[styles.slider, customStyles.slider]}
        minimumValue={min}
        maximumValue={max}
        minimumTrackTintColor={mergedTheme.minimumTrackTintColor}
        maximumTrackTintColor={mergedTheme.maximumTrackTintColor}
        onValueChange={(value) => setValue(value)}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    gap: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  moodImage: {
    resizeMode: 'contain',
  },
  slider: {},
});

export { MoodScale };