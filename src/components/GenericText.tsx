import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { verticalScale } from '../utils';

interface GenericTextProps {
  text: string;
  boldWords: string[];
  onPress?: (word: string) => void;
}

const GenericText: React.FC<GenericTextProps> = ({
  text,
  boldWords,
  onPress,
}) => {
  const renderTextWithBoldWords = (text: string, boldWords: string[]) => {
    let parts = [];
    let remainingText = text;

    boldWords.forEach((boldWord: string, index: number) => {
      const indexInText = remainingText
        .toLowerCase()
        .indexOf(boldWord.toLowerCase());

      if (indexInText > -1) {
        parts.push(remainingText.substring(0, indexInText));
        parts.push(
          <TouchableOpacity
            key={index}
            disabled={!onPress}
            onPress={() => onPress && onPress(boldWord)}
          >
            <Text style={styles.bold}>
              {remainingText.substr(indexInText, boldWord.length)}
            </Text>
          </TouchableOpacity>
        );
        remainingText = remainingText.substring(indexInText + boldWord.length);
      }
    });

    parts.push(remainingText);
    return parts;
  };

  return (
    <Text style={styles.container}>
      {renderTextWithBoldWords(text, boldWords)}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    fontWeight: 'normal',
    lineHeight: verticalScale(20),
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export { GenericText };
