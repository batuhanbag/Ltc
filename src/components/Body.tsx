import { StyleSheet, View } from 'react-native';
import React from 'react';
import { scale } from 'src/utils';

interface BodyProps {
  children: React.ReactNode;
}

const Body = ({ children }: BodyProps) => {
  return <View style={styles.root}>{children}</View>;
};

export { Body };

const styles = StyleSheet.create({
  root: {
    marginHorizontal: scale(20),
  },
});
