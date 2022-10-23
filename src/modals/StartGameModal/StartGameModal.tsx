import React, { useState } from "react";
import { Button, Pressable, StyleSheet, Text } from "react-native";
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
      <Text style={styles.modalTitle}>Démarrer une partie</Text>
      <Text style={customStyles.text}>
        1 - Choisissez un nombre à quatres chiffres
      </Text>
      <Text style={customStyles.text}>
        2 - Tous les chiffres doivent être différents.
      </Text>
      <Text style={customStyles.text}>
        3 - Le nombre ne doit pas commencer par zéro
      </Text>
      <DigitInput onDigitChange={onChange} />
      <Button
        disabled={value.length < 4}
        onPress={onBegin}
        title="Démarrer la partie"
      ></Button>
    </Modal>
  );
};

export const customStyles = StyleSheet.create({
  text: {
    textAlign: "center",
    marginVertical: 5,
    fontWeight: "bold",
  },
});

export default StartGameModal;
