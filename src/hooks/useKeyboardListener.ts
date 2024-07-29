import { useEffect, useCallback } from 'react';
import { Keyboard, Platform } from 'react-native';

const useKeyboardListener = (onShow: () => void, onHide: () => void) => {
  const handleKeyboardDidShow = useCallback(() => {
    if (onShow) {
      onShow();
    }
  }, [onShow]);

  const handleKeyboardDidHide = useCallback(() => {
    if (onHide) {
      onHide();
    }
  }, [onHide]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
      handleKeyboardDidShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
      handleKeyboardDidHide
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [handleKeyboardDidShow, handleKeyboardDidHide]);
};

export { useKeyboardListener };
