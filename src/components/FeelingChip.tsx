import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { Text } from './Text';
import { getTheme } from '../utils';

interface FeelingChipProps {
  index: number;
  handleSelect: (feeling: string) => void;
  feeling: string;
  isSelected: (feeling: string) => boolean;
  containerStyle?: ViewStyle;
  chipStyle?: ViewStyle;
  selectedChipStyle?: ViewStyle;
  textStyle?: TextStyle;
  selectedTextStyle?: TextStyle;
  renderCustomText?: (feeling: string, isSelected: boolean) => React.ReactNode;
}

const FeelingChip: React.FC<FeelingChipProps> = ({
  index,
  handleSelect,
  feeling,
  isSelected,
  containerStyle,
  chipStyle,
  selectedChipStyle,
  textStyle,
  selectedTextStyle,
  renderCustomText,
}) => {
  const selected = isSelected(feeling);

  return (
    <View key={`${index}-feeling`} style={containerStyle}>
      <TouchableOpacity
        onPress={() => handleSelect(feeling)}
        style={[
          styles.feelingSelect,
          chipStyle,
          selected && styles.selectedFeeling,
          selected && selectedChipStyle,
        ]}
      >
        {renderCustomText ? (
          renderCustomText(feeling, selected)
        ) : (
          <Text
            text={feeling}
            style={[
              styles.text,
              textStyle,
              selected && styles.selectedText,
              selected && selectedTextStyle,
            ]}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  feelingSelect: {
    padding: 10,
    borderRadius: 30,
    backgroundColor: getTheme().colors.white,
    margin: 3,
  },
  selectedFeeling: {
    backgroundColor: getTheme().colors.primary,
  },
  text: {
    fontSize: 12,
    fontFamily: 'regular',
    color: getTheme().colors.black,
  },
  selectedText: {
    color: getTheme().colors.white,
  },
});

export { FeelingChip };
