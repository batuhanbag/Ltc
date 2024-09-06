import { View, StyleSheet } from 'react-native';
import { Text } from '.';
import { scale, verticalScale } from '../utils/window';
import { getTheme } from '../utils';

interface AuthHeaderProps {
  text: string;
  name: string;
}

const AuthHeader = ({ text, name }: AuthHeaderProps) => {
  return (
    <View style={styles.headerText}>
      <Text text={text} size="xl" color={getTheme().colors.black} />

      <Text text={name} size="xl" color={getTheme().colors.primary} />
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
