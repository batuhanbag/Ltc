import React from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Send, type IMessage, type SendProps } from 'react-native-gifted-chat';
import { moderateScale, verticalScale } from '../utils';

type ChatSendButtonProps = {
  isTypingUser: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  buttonContainer?: StyleProp<ViewStyle>;
  handleSendMessage?: () => void;
  SendIcon: React.FC;
} & SendProps<IMessage>;

export const ChatSendButton: React.FC<ChatSendButtonProps> = ({
  isTypingUser,
  containerStyle,
  SendIcon,
  buttonContainer,
  handleSendMessage,
  ...props
}) => {
  const handleSend = () => {
    props?.onSend?.({ text: props?.text?.trim() } as Partial<IMessage>, true);
    handleSendMessage && handleSendMessage?.();
    Keyboard.dismiss();
  };
  return (
    <Send
      {...props}
      containerStyle={containerStyle || classes.containerStyle}
      disabled={!isTypingUser}
    >
      <TouchableOpacity
        accessible
        accessibilityLabel="send"
        disabled={!isTypingUser}
        onPress={handleSend}
        style={buttonContainer || classes.sendContainer}
        {...props}
      >
        <TouchableOpacity onPress={handleSend} disabled={!isTypingUser}>
          <SendIcon />
        </TouchableOpacity>
      </TouchableOpacity>
    </Send>
  );
};

const classes = StyleSheet.create({
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: moderateScale(45),
    bottom: verticalScale(7),
  },
});
