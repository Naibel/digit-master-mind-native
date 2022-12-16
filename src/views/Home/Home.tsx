import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import firestore from "@react-native-firebase/firestore";

import { HowToPlayModal, JoinGameModal, StartGameModal } from "../../modals";

const HomeModals = ({
  navigation,
  onClose,
  onBegin,
  onDigitChange,
  openGames,
  startModalVisible,
  joinModalVisible,
  htpModalVisible,
}: {
  navigation: any;
  onClose: () => void;
  onBegin: () => void;
  onDigitChange: (value: string) => void;
  openGames: any[];
  startModalVisible: boolean;
  joinModalVisible: boolean;
  htpModalVisible: boolean;
}) => (
  <>
    <StartGameModal
      onDigitChange={onDigitChange}
      onBegin={onBegin}
      visible={startModalVisible}
      onClose={onClose}
    />
    <JoinGameModal
      navigation={navigation}
      openGames={openGames}
      visible={joinModalVisible}
      onClose={onClose}
    />
    <HowToPlayModal visible={htpModalVisible} onClose={onClose} />
  </>
);

const Home = ({ navigation }: any) => {
  const [digit, setDigit] = useState("");
  const [modalOpened, setModalOpened] = useState<
    "start" | "join" | "htp" | null
  >(null);
  const [openGames, setOpenGames] = useState<any[]>([]);

  const games = firestore().collection("games");

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

  const startGame = () => {
    games
      .add({
        isOpen: true,
        a_digit: digit,
      })
      .then((docRef) => {
        navigation.navigate("GameScreen", {
          id: docRef.id,
          mode: "start",
        });
        setModalOpened(null);
        console.log(docRef.id);
      })
      .catch((error) => console.error("Error adding Tutorial: ", error));
  };

  return (
    <View style={styles.centeredView}>
      <HomeModals
        navigation={navigation}
        onClose={() => setModalOpened(null)}
        onBegin={startGame}
        onDigitChange={setDigit}
        openGames={openGames}
        startModalVisible={modalOpened === "start"}
        joinModalVisible={modalOpened === "join"}
        htpModalVisible={modalOpened === "htp"}
      />
      <View style={styles.menu}>
        <ImageBackground
          style={{ flex: 1, justifyContent: "center" }}
          source={require("../../../assets/img/clouds.png")}
        >
          <Image
            style={{
              width: 318,
              height: 214,
              alignSelf: "center",
            }}
            source={require("../../../assets/img/logo.png")}
          />
        </ImageBackground>
        <ImageBackground
          style={{ flex: 1.5, justifyContent: "flex-end", padding: 20 }}
          source={require("../../../assets/img/grass_bg_high.png")}
          resizeMode="cover"
        >
          <View style={styles.gameButtons}>
            <Pressable
              style={[styles.gameButton, styles.shadow]}
              onPress={() => setModalOpened("start")}
            >
              <Text style={styles.gameButtonText}>Commencer une partie</Text>
            </Pressable>
            <Pressable
              style={[styles.gameButton, styles.shadow]}
              onPress={() => setModalOpened("join")}
            >
              <Text style={styles.gameButtonText}>Rejoindre une partie</Text>
            </Pressable>
          </View>
          <View>
            <Pressable
              style={[styles.ruleButton]}
              onPress={() => setModalOpened("htp")}
            >
              <Image
                style={{
                  width: 61,
                  height: 61,
                  alignSelf: "center",
                  marginRight: 24,
                }}
                source={require("../../../assets/img/help_icon.png")}
              />
              <Text style={styles.ruleButtonText}>Comment jouer ?</Text>
            </Pressable>
          </View>
          <View>
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontFamily: "AutourOne-Regular",
                marginTop: 80,
              }}
            >
              2022 by Chawki & Dorian
            </Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: "#78C6FF",
  },
  menu: {
    padding: 0,
    flex: 1,
    justifyContent: "space-around",
    alignItems: "stretch",
    alignContent: "center",
  },
  title: {
    fontFamily: "AutourOne-Regular",
    color: "white",
    fontSize: 36,
    textAlign: "center",
  },
  gameButtons: {
    flexDirection: "row",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  gameButton: {
    backgroundColor: "#F9E5B4",
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  gameButtonText: {
    fontFamily: "AutourOne-Regular",
    color: "#7A693C",
    textAlign: "center",
    fontSize: 16,
  },
  ruleButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E7E2D",
    margin: 10,
    height: 46,
    borderRadius: 6,
    elevation: 3,
    shadowColor: "#000",
  },
  ruleButtonText: {
    fontFamily: "AutourOne-Regular",
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#38ada9",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    fontFamily: "AutourOne-Regular",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontFamily: "AutourOne-Regular",
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Home;
