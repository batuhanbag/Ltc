import {
  TouchableOpacity,
  View,
  StyleSheet,
  type StyleProp,
  type TextStyle,
} from 'react-native';
import { Text } from '.';
import { getTheme, scale, verticalScale } from '../utils';

interface AuthBottomProps {
  text: string;
  onPress: () => void;
  buttonText: string;
  textStyle?: StyleProp<TextStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
}

const AuthBottom = ({
  text,
  onPress,
  buttonText,
  textStyle,
  buttonTextStyle,
}: AuthBottomProps) => {
  return (
    <View style={styles.bottomContainer}>
      <Text text={text} size="sm" style={textStyle} />
      <TouchableOpacity onPress={onPress}>
        <Text
          text={buttonText}
          size="sm"
          color={getTheme().colors.primary}
          style={buttonTextStyle}
        />
      </TouchableOpacity>
    </View>
  );
};

export { AuthBottom };

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(30),
    gap: scale(5),
  },
});
