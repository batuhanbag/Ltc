import { useMemo } from 'react';
import {
  StyleSheet,
  type ViewStyle,
  type TextStyle,
  type ImageStyle,
} from 'react-native';

type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

function makeStyles<
  T extends NamedStyles<T> | NamedStyles<any>,
  TProps = unknown,
>(
  styleArgs:
    | T
    | NamedStyles<T>
    | ((props: TProps, theme: any) => T | NamedStyles<T>)
) {
  return function useStyles(props?: any): T {
    let styles: any = null;

    if (typeof styleArgs === 'function') {
      styles = styleArgs(props, {});
    } else {
      styles = styleArgs as T | NamedStyles<T>;
    }

    return useMemo(() => StyleSheet.create(styles), [styles]);
  };
}

export { makeStyles };
