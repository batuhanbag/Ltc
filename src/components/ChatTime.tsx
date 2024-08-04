import { StyleSheet, type TextStyle, type ViewStyle } from 'react-native';
import { Time, type LeftRightStyle } from 'react-native-gifted-chat';
import { getFontSize, scale } from '../utils';

interface ChatTimeProps {
  timeFormat?: string;
  containerStyle?: LeftRightStyle<ViewStyle>;
  timeTextStyle?: LeftRightStyle<TextStyle>;
}

const ChatTime: React.FC<ChatTimeProps> = ({
  timeFormat,
  containerStyle,
  timeTextStyle,
  ...props
}) => {
  return (
    <Time
      {...props}
      timeFormat={timeFormat}
      containerStyle={containerStyle || { left: classes.position }}
      timeTextStyle={
        timeTextStyle || {
          left: classes.left,
          right: classes.right,
        }
      }
    />
  );
};

export { ChatTime };

const classes = StyleSheet.create({
  left: {
    color: '#AFAFAF',
    fontSize: getFontSize(10),
    textAlign: 'right',
  },
  position: {
    alignSelf: 'flex-end',
    width: '95%',
    paddingRight: scale(5),
  },
  right: {
    color: '#AFAFAF',
    fontSize: getFontSize(10),
    textAlign: 'right',
  },
});
