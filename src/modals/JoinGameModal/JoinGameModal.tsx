import React from "react";
import { Button, Text, View } from "react-native";
import { Modal, ModalProps, styles } from "../../components";

const JoinGameModal = ({
  navigation,
  visible,
  onClose,
  openGames,
}: ModalProps) => {
  return (
    <Modal visible={visible} onClose={onClose}>
      <Text style={styles.modalTitle}>Join Game</Text>
      {openGames &&
        openGames.map((game) => (
          <View key={game.id}>
            <Button
              onPress={() => {
                navigation.navigate("StartGamePlay", {
                  id: game.id,
                });
              }}
              title={game.id}
            />
          </View>
        ))}
    </Modal>
  );
};

export default JoinGameModal;
