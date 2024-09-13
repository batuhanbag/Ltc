import { Modal } from 'react-native';
import React from 'react';

interface Props {
  visible: boolean;
  close: () => void;
  children?: React.ReactNode;
}

const NotNetworkModal = ({ visible, close, children }: Props) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={close}
    >
      {children}
    </Modal>
  );
};

export { NotNetworkModal };
