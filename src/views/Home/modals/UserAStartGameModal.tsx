import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import firestore from "@react-native-firebase/firestore";

import { DigitInput, Modal } from "../../../components";
import { buttonStyle } from "../../../styles/buttons";
import { textStyle } from "../../../styles/text";
import checkDigit from "../../../utils/checkDigit";

export type UserAStartGameModalProps = {
  navigation: any;
  visible: boolean;
  onClose: () => void;
};

const UserAStartGameModal = ({
  navigation,
  visible,
  onClose,
}: UserAStartGameModalProps) => {
  const [value, setValue] = useState<string>("");
  const isDisabled = value.length < 4;

  const games = firestore().collection("games");

  const onPress = () => {
    games
      .add({
        isOpen: true,
        a_digit: value,
      })
      .then((docRef) => {
        navigation.navigate("GameScreen", {
          id: docRef.id,
          mode: "start",
        });
        console.log(docRef.id);
        onClose();
      })
      .catch((error) => console.error("Error adding Tutorial: ", error));
  };

  const onChange = (newDigit: string) => {
    checkDigit(newDigit, value, () => {
      setValue(newDigit);
    });
  };

  const onModalClose = () => {
    setValue("");
    onClose();
  };

  return (
    <Modal visible={visible} onClose={onModalClose}>
      <Text style={textStyle.modalTitle}>
        Allez hop ! Donnez-nous votre numéro secret !
      </Text>
      <DigitInput digit={value} onDigitChange={onChange} />
      <View style={{ marginVertical: 20 }}>
        <Text style={textStyle.h6}>
          1. Choisissez un nombre à quatres chiffres.
        </Text>
        <Text style={textStyle.h6}>2. Tous les chiffres sont uniques.</Text>
        <Text style={textStyle.h6}>
          3. Le nombre ne doit pas commencer par zéro.
        </Text>
      </View>
      <View style={{ flex: 1 }} />
      <TouchableOpacity
        style={[
          buttonStyle.button,
          buttonStyle.dark,
          isDisabled && buttonStyle.disabled,
        ]}
        disabled={isDisabled}
        onPress={onPress}
      >
        <Text style={[buttonStyle.text, buttonStyle.whiteText]}>
          On commence !
        </Text>
      </TouchableOpacity>
    </Modal>
  );
};

export default UserAStartGameModal;
