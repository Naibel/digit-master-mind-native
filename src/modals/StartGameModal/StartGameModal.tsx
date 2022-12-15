import React, { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
      <Text style={styles.modalTitle}>
        Allez hop ! Donnez-nous votre numéro secret !
      </Text>
      <DigitInput onDigitChange={onChange} />
      <View style={{ marginVertical: 20 }}>
        <Text style={customStyles.text}>
          1) Choisissez un nombre à quatres chiffres.
        </Text>
        <Text style={customStyles.text}>
          2) Tous les chiffres doivent être différents.
        </Text>
        <Text style={customStyles.text}>
          3) Le nombre ne doit pas commencer par zéro.
        </Text>
      </View>
      <View style={{ flex: 1 }} />
      <TouchableOpacity
        style={customStyles.button}
        disabled={value.length < 4}
        onPress={onBegin}
      >
        <Text
          style={{
            fontFamily: "AutourOne-Regular",
            fontSize: 16,
            color: "white",
          }}
        >
          On commence !
        </Text>
      </TouchableOpacity>
    </Modal>
  );
};

export const customStyles = StyleSheet.create({
  text: {
    fontFamily: "AutourOne-Regular",
    textAlign: "left",
    marginVertical: 5,
    fontSize: 12,
    color: "#7A693C",
  },
  button: {
    backgroundColor: "#7A693C",
    borderRadius: 6,
    textAlign: "center",
    alignItems: "center",
    color: "white",
    paddingVertical: 22,
  },
});

export default StartGameModal;
