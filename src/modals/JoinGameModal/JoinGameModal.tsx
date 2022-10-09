import React from "react";
import { Button, Text, View } from "react-native";
import { Modal, ModalProps, styles } from "../../components";

const JoinGameModal = ({ visible, onClose, openGames }: ModalProps) => {
  return (
    <Modal visible={visible} onClose={onClose}>
      <Text style={styles.modalTitle}>Join Game</Text>
      {openGames &&
        openGames.map((game) => (
          <View key={game.id}>
            <Button onPress={() => console.log("test")} title={game.id} />
          </View>
        ))}
    </Modal>
  );
};

export default JoinGameModal;
