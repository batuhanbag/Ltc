import { View, StyleSheet } from 'react-native';
import { Text } from '.';
import { scale, verticalScale } from '../utils';

interface AuthLineProps {
  text: string;
}

const AuthLine = ({ text }: AuthLineProps) => {
  return (
    <View style={styles.lineContainer}>
      <View style={styles.line} />
      <Text text={text} size="xs" color={'#b5b4b3'} />
      <View style={styles.line} />
    </View>
  );
};

export { AuthLine };

const styles = StyleSheet.create({
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(10),
    marginTop: verticalScale(50),
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#c8c6c6',
  },
});
