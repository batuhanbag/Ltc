import { Image, StyleSheet, View } from 'react-native';

import { Text } from './Text';
import { verticalScale } from '../utils';

interface BreathingSelectHeaderProps {
  headerImg: any;
  text: string;
}

const BreathingSelectHeader = ({
  headerImg,
  text,
}: BreathingSelectHeaderProps) => {
  return (
    <View style={styles.header}>
      <Image source={headerImg} />
      <Text text={text} size="sm" color={'#373748'} />
    </View>
  );
};

export { BreathingSelectHeader };

const styles = StyleSheet.create({
  header: {
    marginTop: verticalScale(20),
    gap: verticalScale(20),
  },
});
