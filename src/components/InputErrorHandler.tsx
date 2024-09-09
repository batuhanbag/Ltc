import { StyleSheet, View, type StyleProp, type TextStyle } from 'react-native';
import { Icon, Text } from '.';
import { getTheme, scale, verticalScale } from '../utils';

interface ErrorHandlerProps {
  error: string;
  errorTextStyle?: StyleProp<TextStyle>;
}

const InputErrorHandler = ({ error, errorTextStyle }: ErrorHandlerProps) => {
  return (
    <View style={styles.errorContainer}>
      <Icon icon="inputWarning" size={16} />
      <Text
        style={[styles.errorText, errorTextStyle]}
        size="xxs"
        color={getTheme().colors.error}
        textAlign="left"
      >
        {error}
      </Text>
    </View>
  );
};

export { InputErrorHandler };

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
