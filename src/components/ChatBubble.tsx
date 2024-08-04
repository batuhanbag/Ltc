import { type TextStyle, type ViewStyle } from 'react-native';
import { Bubble, type LeftRightStyle } from 'react-native-gifted-chat';
import { makeStyles, moderateScale, verticalScale } from '../utils';

interface ChatBubbleProps {
  leftTextColor: string;
  rightTextColor: string;
  leftTextSize: number;
  rightTextSize: number;
  rightBackgroundColor: string;
  leftBackgroundColor: string;
  leftBorderRadius: number;
  rightBorderRadius: number;
  wrapperStyle?: LeftRightStyle<ViewStyle>;
  textStyle: LeftRightStyle<TextStyle>;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  wrapperStyle,
  textStyle,
  ...props
}) => {
  const styles = useStyles(props);

  return (
    <Bubble
      {...props}
      textStyle={
        textStyle || {
          right: styles.right,
          left: styles.left,
        }
      }
      wrapperStyle={
        wrapperStyle || {
          left: styles.wrapperLeft,
          right: styles.wrapperRight,
        }
      }
    />
  );
};

export { ChatBubble };

const useStyles = makeStyles((_props: ChatBubbleProps) => ({
  left: {
    color: _props.leftTextColor,
    fontSize: _props.leftTextSize,
    lineHeight: moderateScale(20),
  },
  right: {
    color: _props.rightTextColor,
    fontSize: _props.rightTextSize,
    lineHeight: moderateScale(20),
  },
  wrapperLeft: {
    backgroundColor: _props.leftBackgroundColor || '#F4F4F4',
    borderRadius: _props.leftBorderRadius || 16,
    shadowColor: 'rgba(191, 191, 191, 0.20)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    marginTop: verticalScale(10),
  },
  wrapperRight: {
    backgroundColor: _props.rightBackgroundColor || '#ECEBFF',
    borderRadius: _props.rightBorderRadius || 16,
    shadowColor: 'rgba(191, 191, 191, 0.20)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    marginTop: verticalScale(10),
  },
}));
