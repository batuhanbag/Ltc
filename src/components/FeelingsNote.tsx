import { View, StyleSheet, type StyleProp, type TextStyle } from 'react-native';

import { Text } from './Text';
import { TextInput } from './TextInput';
import { verticalScale } from '../utils';

interface FeelingsNoteProps {
  note: string;
  setNote: (text: string) => void;
  headerTextStyle?: StyleProp<TextStyle>;
}

const FeelingsNote = ({
  note,
  setNote,
  headerTextStyle,
}: FeelingsNoteProps) => {
  return (
    <View style={styles.input}>
      <Text text="How did this come about?" size="md" style={headerTextStyle} />
      <TextInput
        textArea
        placeholder="Write your feelings here"
        multiline
        value={note}
        onChangeText={(text) => setNote(text)}
      />
    </View>
  );
};

export { FeelingsNote };

const styles = StyleSheet.create({
  input: { marginTop: verticalScale(20), gap: verticalScale(20) },
});
