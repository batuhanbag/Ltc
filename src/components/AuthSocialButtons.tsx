import { View, StyleSheet } from 'react-native';
import { SocialButton } from './SocialButton';
import { scale, verticalScale } from '../utils';

interface AuthSocialButtonsProps {
  onGooglePress: () => void;
  onApplePress: () => void;
}

const AuthSocialButtons = ({
  onApplePress,
  onGooglePress,
}: AuthSocialButtonsProps) => {
  return (
    <View style={styles.socialButtonContainer}>
      <SocialButton platform="google" onPress={onGooglePress} type="signin" />
      <SocialButton platform="apple" onPress={onApplePress} type="signin" />
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
