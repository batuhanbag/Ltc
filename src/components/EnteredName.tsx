import { StyleSheet, View } from 'react-native';
import React, { useRef } from 'react';
import { TextInput } from './TextInput';
import { scale, width } from '../utils';

interface EnteredNameProps {
  name: string;
  setName: (name: string) => void;
}

const EnteredName = ({ name, setName }: EnteredNameProps) => {
  const inputRef = useRef<any>(null);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.root}>
      <TextInput
        leftIcon="userInput"
        value={name}
        onChangeText={setName}
        placeholder="E.g Helen"
        autoFocus={true}
        ref={inputRef}
      />
    </View>
  );
};

export { EnteredName };
const styles = StyleSheet.create({
  root: {
    width: width - scale(40),
  },
});
