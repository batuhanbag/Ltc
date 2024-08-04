import { type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import { Day } from 'react-native-gifted-chat';
import { getFontSize, verticalScale, scale, makeStyles } from '../utils';

interface ChatDayProps {
  dateFormat: string;
  containerStyle?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  backgroundColor?: string;
  borderRadius?: number;
  textColor?: string;
  textSize?: number;
}
const ChatDay: React.FC<ChatDayProps> = ({
  wrapperStyle,
  textStyle,
  containerStyle,
  ...props
}) => {
  const styles = useStyles(props);
  return (
    <Day
      {...props}
      dateFormat="DD.MM.YYYY"
      textStyle={textStyle || styles.textStyle}
      wrapperStyle={wrapperStyle || styles.wrapperStyle}
      containerStyle={containerStyle || {}}
    />
  );
};

export { ChatDay };

const useStyles = makeStyles((_props: ChatDayProps) => ({
  textStyle: {
    color: _props.textColor || '#6C6A68',
    fontSize: getFontSize(_props.textSize as number) || getFontSize(10),
  },
  wrapperStyle: {
    backgroundColor: _props.backgroundColor || '#FFFF',
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(4),
    shadowColor: 'rgba(191, 191, 191, 0.20)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    borderRadius: _props.borderRadius || 32,
  },
}));
