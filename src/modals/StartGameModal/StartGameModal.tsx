import React from 'react';
import {Text} from 'react-native';
import Modal, {ModalProps, styles} from '../../components/Modal';

const StartGameModal = ({visible, onClose}: ModalProps) => {
  return (
    <Modal visible={visible} onClose={onClose}>
      <Text style={styles.modalTitle}>Start Game</Text>
    </Modal>
  );
};

export default StartGameModal;
