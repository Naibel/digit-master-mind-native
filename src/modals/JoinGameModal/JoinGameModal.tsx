import React from 'react';
import {Text} from 'react-native';
import Modal, {ModalProps, styles} from '../../components/Modal';

const JoinGameModal = ({visible, onClose}: ModalProps) => {
  return (
    <Modal visible={visible} onClose={onClose}>
      <Text style={styles.modalTitle}>Join Game</Text>
    </Modal>
  );
};

export default JoinGameModal;
