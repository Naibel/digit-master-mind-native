import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import firestore from "@react-native-firebase/firestore";

import { DigitInput, Modal } from "../../../components";
import { buttonStyle } from "../../../styles/buttons";
import { textStyle } from "../../../styles/text";

export type UserBGameModalProps = {
  route: any;
  navigation: any;
  visible: boolean;
  onClose: () => void;
};

const UserBGameModal = ({
  route,
  navigation,
  visible,
  onClose,
}: UserBGameModalProps) => {
  const { id } = route.params;

  const [value, setValue] = useState<string>("");
  const isDisabled = value.length < 4;

  const games = firestore().collection("games");

  //Only when joining a game
  const onPress = () => {
    games.doc(id).update({
      isOpen: false,
      b_digit: value,
    });
    onClose();
  };

  const onChange = (value: string) => {
    setValue(value);
  };

  const onModalClose = () => {
    setValue("");
    onClose();
    navigation.goBack();
  };

  return (
    <Modal visible={visible} onClose={onModalClose}>
      <Text style={textStyle.modalTitle}>
        Allez hop ! Donnez-nous votre numéro secret !
      </Text>
      <DigitInput onDigitChange={onChange} />
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

export default UserBGameModal;
