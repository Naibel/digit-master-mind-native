import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import firestore from "@react-native-firebase/firestore";

import { Modal, ModalProps } from "../../../components";
import { buttonStyle } from "../../../styles/buttons";
import { textStyle } from "../../../styles/text";

const JoinGameModal = ({ navigation, visible, onClose }: ModalProps) => {
  const games = firestore().collection("games");
  const [openGames, setOpenGames] = useState<any[]>([]);

  useEffect(() => {
    let unsubscribe = games.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("New game: ", change.doc.id, change.doc.data());
          change.doc.data().isOpen &&
            setOpenGames([
              {
                id: change.doc.id,
                ...change.doc.data(),
              },
              ...openGames,
            ]);
        }
        if (change.type === "modified") {
          console.log("Modified game: ", change.doc.id, change.doc.data());
          !change.doc.data().isOpen &&
            setOpenGames(openGames.filter((game) => game.id !== change.doc.id));
        }
        if (change.type === "removed") {
          console.log("Removed game: ", change.doc.id, change.doc.data());
          setOpenGames(openGames.filter((game) => game.id !== change.doc.id));
        }
      });
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal visible={visible} onClose={onClose}>
      {openGames && openGames.length > 0 ? (
        <>
          <Text style={textStyle.modalTitle}>
            Choisis la partie à rejoindre
          </Text>
          {openGames.map((game, index) => (
            <TouchableOpacity
              key={index + game.id}
              style={[
                buttonStyle.button,
                buttonStyle.dark,
                { marginBottom: 20 },
              ]}
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
          <Text style={textStyle.h6}>
            (Bon, faut en créer une, maintenant !)
          </Text>
        </>
      )}
    </Modal>
  );
};

export default JoinGameModal;
