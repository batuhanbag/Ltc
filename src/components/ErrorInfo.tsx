import { StyleSheet, View, type StyleProp, type TextStyle } from 'react-native';
import { getTheme } from '../utils/init';
import { scale, verticalScale } from '../utils/window';
import { Icon } from './Icon';
import { Text } from './Text';

interface ErrorInfoProps {
  error: string;
  errorTextStyle?: StyleProp<TextStyle>;
}

const { colors } = getTheme();

const ErrorInfo = ({ error, errorTextStyle }: ErrorInfoProps) => {
  return (
    <View style={styles.errorContainer}>
      <Icon icon="inputWarning" size={16} />
      <Text
        style={[styles.errorText, errorTextStyle]}
        size="xxs"
        color={colors.error}
        textAlign="left"
      >
        {error}
      </Text>
    </View>
  );
};

export { ErrorInfo };

const styles = StyleSheet.create({
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: verticalScale(8),
    gap: scale(5),
  },
  errorText: {
    flex: 1,
    flexWrap: 'wrap',
  },
});
