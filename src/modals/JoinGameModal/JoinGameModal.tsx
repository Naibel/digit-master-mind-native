import React from "react";
import { Button, Text, View } from "react-native";
import { Modal, ModalProps, styles } from "../../components";

const JoinGameModal = ({
  navigation,
  visible,
  onClose,
  openGames,
}: ModalProps) => (
  <Modal visible={visible} onClose={onClose}>
    <Text style={styles.modalTitle}>Choisis la partie à rejoindre</Text>
    {openGames &&
      openGames.map((game) => (
        <View key={game.id}>
          <Button
            onPress={() => {
              navigation.navigate("GameScreen", {
                id: game.id,
                mode: "join",
              });
              onClose();
            }}
            title={game.id}
          />
        </View>
      ))}
  </Modal>
);

export default JoinGameModal;
