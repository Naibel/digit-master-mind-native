import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Modal, ModalProps } from "../../components";
import { buttonStyle } from "../../styles/buttons";
import { textStyle } from "../../styles/text";

const JoinGameModal = ({
  navigation,
  visible,
  onClose,
  openGames,
}: ModalProps) => (
  <Modal visible={visible} onClose={onClose}>
    {openGames && openGames.length > 0 ? (
      <>
        <Text style={textStyle.modalTitle}>Choisis la partie à rejoindre</Text>
        {openGames.map((game, index) => (
          <TouchableOpacity
            style={[buttonStyle.button, buttonStyle.dark, { marginBottom: 20 }]}
            onPress={() => {
              navigation.navigate("GameScreen", {
                id: game.id,
                mode: "join",
              });
              onClose();
            }}
          >
            <Text style={[buttonStyle.whiteText, buttonStyle.text]}>
              Partie N°{index + 1}
            </Text>
            <Text style={[buttonStyle.whiteText, buttonStyle.smallText]}>
              Id : {game.id}
            </Text>
          </TouchableOpacity>
        ))}
      </>
    ) : (
      <>
        <Text style={textStyle.modalTitle}>
          Aucune partie en cours pour le moment.
        </Text>
        <Text style={textStyle.h6}>(Bon, faut en créer une, maintenant !)</Text>
      </>
    )}
  </Modal>
);

export default JoinGameModal;
