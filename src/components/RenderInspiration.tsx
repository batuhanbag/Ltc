import {
  ImageBackground,
  Pressable,
  StyleSheet,
  type ImageSourcePropType,
  type ImageStyle,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { Text } from './Text';
import { scale, width } from '../utils';

interface RenderInspirationProps {
  index: number;
  containerStyle?: StyleProp<ViewStyle>;
  imageContainerStyle?: StyleProp<ImageStyle>;
  onPress: () => void;
  uri: string;
  text: string;
  textStyles?: StyleProp<TextStyle>;
}

const RenderInspiration = ({
  index,
  containerStyle,
  imageContainerStyle,
  onPress,
  uri,
  text,
  textStyles,
}: RenderInspirationProps) => {
  return (
    <Pressable style={[styles.renderItem, containerStyle]} onPress={onPress}>
      <ImageBackground
        key={`${index}-image`}
        style={[styles.renderItem, imageContainerStyle]}
        source={uri as ImageSourcePropType}
      >
        <Text text={text} style={[styles.renderText, textStyles]} />
      </ImageBackground>
    </Pressable>
  );
};

export { RenderInspiration };

const styles = StyleSheet.create({
  renderItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width,
  },
  renderText: {
    alignSelf: 'flex-start',
    color: 'white',
    fontSize: 35,
    marginLeft: scale(20),
  },
});
