import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Text } from '.';
import { getTheme, scale, verticalScale } from '../utils';

interface AuthBottomProps {
  text: string;

  onPress: () => void;

  buttonText: string;
}

const AuthBottom = ({ text, onPress, buttonText }: AuthBottomProps) => {
  return (
    <View style={styles.bottomContainer}>
      <Text text={text} size="sm" />
      <TouchableOpacity onPress={onPress}>
        <Text text={buttonText} size="sm" color={getTheme().colors.primary} />
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
