import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { Icon } from './Icon';
import { getTheme, moderateScale, scale, verticalScale } from '../utils';

const SocialButton = ({
  platform,
  onPress,
  type,
}: {
  platform: 'apple' | 'google';
  onPress: () => void;
  type: 'signin' | 'continue';
}) => {
  const isApple = platform === 'apple';

  let buttonText = '';
  if (type === 'signin') {
    buttonText = isApple ? 'Apple' : 'Google';
  } else if (type === 'continue') {
    buttonText = isApple ? 'Apple ' : 'Google';
  }
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isApple ? styles.appleButton : styles.googleButton,
      ]}
      onPress={onPress}
    >
      <Icon icon={isApple ? 'apple' : 'google'} size={moderateScale(24)} />
      <Text
        style={
          (styles.buttonText, !isApple ? { color: '#000' } : { color: '#FFF' })
        }
      >
        {buttonText}
      </Text>
      <View />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: scale(35),
    paddingVertical: verticalScale(6),
    gap: scale(10),
  },

  appleButton: {
    backgroundColor: getTheme().colors.black,
  },
  googleButton: {
    backgroundColor: getTheme().colors.white,
    borderWidth: 1,
    borderColor: getTheme().colors.black,
  },
  buttonText: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
});

export { SocialButton };
