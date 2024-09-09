import {
  Image,
  StyleSheet,
  View,
  type ImageStyle,
  type StyleProp,
  type TextStyle,
} from 'react-native';

import { Text } from './Text';
import { verticalScale } from '../utils';

interface BreathingSelectHeaderProps {
  headerImg: any;
  text: string;
  textStyle?: StyleProp<TextStyle>;
  imgStyle?: StyleProp<ImageStyle>;
}

const BreathingSelectHeader = ({
  headerImg,
  text,
  textStyle,
  imgStyle,
}: BreathingSelectHeaderProps) => {
  return (
    <View style={styles.header}>
      <Image source={headerImg} style={imgStyle} />
      <Text style={textStyle} text={text} size="sm" color={'#373748'} />
    </View>
  );
};

export { BreathingSelectHeader };

const styles = StyleSheet.create({
  header: {
    marginTop: verticalScale(20),
    gap: verticalScale(20),
  },
});
