import { View, StyleSheet } from 'react-native';
import { Text } from '.';
import { scale, verticalScale } from '../utils/window';

interface AuthHeaderProps {
  text: string;
  name: string;
  textColor?: string;
  nameColor?: string;
}

const AuthHeader = ({ text, name, textColor, nameColor }: AuthHeaderProps) => {
  return (
    <View style={styles.headerText}>
      <Text text={text} size="xl" color={textColor} />
      <Text text={name} size="xl" color={nameColor} />
    </View>
  );
};

export { AuthHeader };

const styles = StyleSheet.create({
  headerText: {
    flexDirection: 'row',
    gap: scale(5),
    marginTop: verticalScale(30),
  },
});
