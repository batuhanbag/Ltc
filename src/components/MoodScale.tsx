import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  type ImageStyle,
  type ViewStyle,
} from 'react-native';
import { Slider } from 'react-native-awesome-slider';

interface MoodScaleProps {
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
  setValue,
  image,

  sliderWidth = 300,
  sliderHeight = 50,
  imageSize = { width: 150, height: 150 },
  customStyles = {},
  sliderTheme = {},
  renderCustomThumb,
  progress,
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

  const defaultThumb = (
    <View
      style={{
        width: 28,
        height: 28,
        borderRadius: 1234,
        backgroundColor: '#5956FF',
        shadowColor: '#5956FF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
      }}
    />
  );

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
        style={[
          styles.slider,
          { width: sliderWidth, height: sliderHeight },
          customStyles.slider,
        ]}
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        theme={mergedTheme}
        markStyle={{
          backgroundColor: '#5956FF',
          width: 10,
          height: 10,
          borderRadius: 10,
        }}
        renderBubble={() => <></>}
        renderThumb={renderCustomThumb || (() => defaultThumb)}
        disableTapEvent
        sliderHeight={13}
        onValueChange={setValue}
        containerStyle={{
          backgroundColor: '#ECECEC',
          borderRadius: 10,
        }}
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
