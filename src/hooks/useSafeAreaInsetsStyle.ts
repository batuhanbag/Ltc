import { type FlexStyle } from 'react-native';
import { type Edge, useSafeAreaInsets } from 'react-native-safe-area-context';

export type ExtendedEdge = Edge | 'start' | 'end';

const propertySuffixMap = {
  top: 'Top',
  bottom: 'Bottom',
  left: 'Start',
  right: 'End',
  start: 'Start',
  end: 'End',
};

const edgeInsetMap: Record<string, Edge> = {
  start: 'left',
  end: 'right',
};

function useSafeAreaInsetsStyle(
  safeAreaEdges: ExtendedEdge[] = [],
  property: 'padding' | 'margin' = 'padding'
): Pick<
  FlexStyle,
  | 'marginBottom'
  | 'marginEnd'
  | 'marginStart'
  | 'marginTop'
  | 'paddingBottom'
  | 'paddingEnd'
  | 'paddingStart'
  | 'paddingTop'
> {
  const insets = useSafeAreaInsets();

  return safeAreaEdges.reduce((acc, e) => {
    const value = edgeInsetMap[e] ?? e;
    //@ts-ignore
    return { ...acc, [`${property}${propertySuffixMap[e]}`]: insets[value] };
  }, {});
}
export { useSafeAreaInsetsStyle };
