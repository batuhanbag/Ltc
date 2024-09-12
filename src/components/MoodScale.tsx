import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  type ImageStyle,
  type ViewStyle,
} from 'react-native';
interface MoodScaleProps {
  value: number;
  setValue: (value: number) => void;
  image: string;
  imageSize?: { width: number; height: number };
  customStyles?: {
    container?: ViewStyle;
    slider?: ViewStyle;
    image?: ImageStyle;
  };
  sliderComponent: React.ReactNode;
}

const MoodScale: React.FC<MoodScaleProps> = ({
  image,
  imageSize = { width: 150, height: 150 },
  customStyles = {},
  sliderComponent,
}) => {
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
      {sliderComponent}
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
