import React, { useState } from "react";
import { Pressable, Text } from "react-native";
import { DigitInput, Modal, ModalProps, styles } from "../../components";

const StartGameModal = ({
  onDigitChange,
  onBegin,
  visible,
  onClose,
}: ModalProps) => {
  const [value, setValue] = useState<string>("");

  const onChange = (value: string) => {
    setValue(value);
    onDigitChange && onDigitChange(value);
  };

  const onModalClose = () => {
    setValue("");
    onDigitChange && onDigitChange("");
    onClose();
  };

  return (
    <Modal visible={visible} onClose={onModalClose}>
      <Text style={styles.modalTitle}>Start Game</Text>
      <Text>Choose a 4-digit number</Text>
      <Text>All the digits are different.</Text>
      <Text>Secret number cannot start with zero.</Text>
      <DigitInput onDigitChange={onChange} />
      <Pressable
        disabled={value.length < 4}
        style={[styles.button, styles.buttonClose]}
        onPress={onBegin}
      >
        <Text style={styles.textStyle}>Démarrer la partie</Text>
      </Pressable>
    </Modal>
  );
};

export default StartGameModal;
