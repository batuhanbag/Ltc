import { View, StyleSheet, type TextStyle, type StyleProp } from 'react-native';
import { SocialButton } from './SocialButton';
import { scale, verticalScale } from '../utils';

interface AuthSocialButtonsProps {
  onGooglePress: () => void;
  onApplePress: () => void;
  buttonTextStyle?: StyleProp<TextStyle>;
}

const AuthSocialButtons = ({
  onApplePress,
  onGooglePress,
  buttonTextStyle,
}: AuthSocialButtonsProps) => {
  return (
    <View style={styles.socialButtonContainer}>
      <SocialButton
        buttonTextStyle={buttonTextStyle}
        platform="google"
        onPress={onGooglePress}
        type="signin"
      />
      <SocialButton
        buttonTextStyle={buttonTextStyle}
        platform="apple"
        onPress={onApplePress}
        type="signin"
      />
    </View>
  );
};

export { AuthSocialButtons };

const styles = StyleSheet.create({
  socialButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: verticalScale(25),
    gap: scale(10),
  },
});
