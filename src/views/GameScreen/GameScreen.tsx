import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import firestore from "@react-native-firebase/firestore";

import usePlay from "../../hooks/usePlay";
import { DigitInput } from "../../components";
import { StartGameModal } from "../../modals";
import { SuccessEndScreen } from "./SuccessEndScreen";
import { Attempts } from "./Attempts";

const GameScreen = ({ route, navigation }: any) => {
  const { play } = usePlay();

  const [finished, setFinished] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [timeleft, setTimeleft] = useState<number>(10);
  const [turn, setTurn] = useState<string>("");
  const [attempt, setAttempt] = useState<string>("");
  const [chosenNumber, setChosenNumber] = useState<string>("");
  const [currentGame, setCurrentGame] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const games = firestore().collection("games");
  const { id, mode } = route.params;

  const handleStart = () => {
    let count = 10;

    const timer = setInterval(() => {
      if (turn === (mode === "join" ? "a" : "b")) {
        count = 0;
        return;
      }
      const newCount = count - 1;
      setTimeleft(newCount >= 0 ? newCount : 0);
      count = newCount >= 0 ? newCount : 0;
      console.log("tt ", count);
      if (count === 0) {
        games.doc(id).update({ turn: mode === "join" ? "a" : "b" });
        clearInterval(timer);
        setDisabled(true);
      }
    }, 1000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisabled(true);
    }, 10000);

    return () => clearTimeout(timer);
  });

  useEffect(() => {
    console.log("turn => ", turn);

    if (turn === (mode === "join" ? "b" : "a")) {
      setTimeleft(10);
      setDisabled(false);
      handleStart();
    } else {
      console.log("clear");
      // clearInterval(timer);
    }
  }, [turn]);

  useEffect(() => {
    let unsubscribe = games.doc(id).onSnapshot((doc) => {
      mode === "join" && doc.data()?.isOpen && setIsModalOpen(true);

      setCurrentGame(doc.data());

      if (mode === "join") {
        if (!doc.data()?.b_attempts) {
          games.doc(id).update({
            b_attempts: [],
          });
        }
      } else if (mode === "start") {
        if (!doc.data()?.a_attempts) {
          games.doc(id).update({
            a_attempts: [],
          });
        }
      }

      setTurn(doc.data()?.turn);
      setFinished(doc.data()?.finished);
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Only when joining a game
  const startGame = () => {
    games.doc(id).update({
      isOpen: false,
      b_digit: chosenNumber,
    });
    setIsModalOpen(false);
  };

  const handleAttempt = () => {
    setDisabled(true);
    // clearInterval(timer);
    setTimeleft(0);

    if (mode === "join") {
      games
        .doc(id)
        .update({
          b_attempts: [
            ...currentGame.b_attempts,
            {
              ...play(attempt, currentGame.a_digit),
              attempt,
            },
          ],
          finished: attempt.toString() === currentGame.a_digit.toString(),
          b_win: attempt.toString() === currentGame.a_digit.toString(),
          turn: "a",
        })
        .then(() => {
          setAttempt("");
        });
    } else {
      games
        .doc(id)
        .update({
          a_attempts: [
            ...currentGame.a_attempts,
            {
              ...play(attempt, currentGame.b_digit),
              attempt,
            },
          ],
          finished: attempt.toString() === currentGame.b_digit.toString(),
          a_win: attempt.toString() === currentGame.b_digit.toString(),
          turn: "b",
        })
        .then(() => {
          setAttempt("");
          setTimeleft(10);
          setDisabled(false);
        });
    }
  };

  const notYourTurn =
    (mode === "join" && turn === "a") || (mode === "start" && turn === "b");
  const yourTurn =
    (mode === "start" && turn === "a") || (mode === "join" && turn === "b");

  const getTurnMessage = () => {
    if (notYourTurn) return "C'est le tour de l'autre !";
    if (yourTurn) return "C'est ton tour !";
  };

  return (
    <View style={styles.content}>
      <ImageBackground
        style={{
          flex: 1,
          position: "absolute",
          width: "100%",
          height: 270,
          top: 0,
        }}
        source={require("../../../assets/img/clouds.png")}
      ></ImageBackground>
      <View style={{ paddingVertical: 60, paddingHorizontal: 48, flex: 1 }}>
        {finished ? (
          <SuccessEndScreen navigation={navigation} adversaryNumber={1234} />
        ) : (
          <>
            <Text style={styles.subtitle}>Votre numéro secret est</Text>
            <Text style={styles.number}>
              {mode === "join" ? currentGame.b_digit : currentGame.a_digit}
            </Text>
            {turn && <Text style={styles.subtitle}>{getTurnMessage()}</Text>}
            {mode === "start" && currentGame.isOpen ? (
              <View>
                <Text style={styles.text}>En attente d'un autre joueur...</Text>
                <ActivityIndicator size="large" color="white" />
              </View>
            ) : (
              <View>
                {yourTurn && (
                  <Text style={styles.text}>
                    Il te reste {timeleft} seconde{timeleft > 1 && "s"}.
                  </Text>
                )}
                <View>
                  <Text style={styles.subtitle}>
                    Devinez le numéro de votre adversaire !
                  </Text>
                  <DigitInput onDigitChange={setAttempt} />
                  <TouchableOpacity
                    style={styles.button}
                    disabled={attempt.length !== 4 || finished || notYourTurn}
                    onPress={handleAttempt}
                  >
                    <Text>Valider</Text>
                  </TouchableOpacity>
                </View>
                {/* <Progress value={timeleft * 10} /> */}
                <Attempts
                  userData={
                    mode === "join"
                      ? currentGame?.b_attempts
                      : currentGame?.a_attempts
                  }
                />
              </View>
            )}
          </>
        )}
      </View>
      <ImageBackground
        style={{ height: 200, zIndex: -1 }}
        source={require("../../../assets/img/grass_bg_low.png")}
      ></ImageBackground>
      {mode === "join" && (
        <StartGameModal
          onDigitChange={setChosenNumber}
          onBegin={startGame}
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "stretch",
    textAlign: "center",
    backgroundColor: "#78C6FF",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#F9E5B4",
    borderRadius: 6,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontFamily: "AutourOne-Regular",
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  number: {
    fontFamily: "AutourOne-Regular",
    fontSize: 62,
    marginBottom: 20,
    textAlign: "center",
    color: "white",
  },
  subtitle: {
    fontFamily: "AutourOne-Regular",
    fontSize: 18,
    marginBottom: 0,
    textAlign: "center",
    color: "white",
  },
  text: {
    fontFamily: "AutourOne-Regular",
    textAlign: "center",
    color: "white",
    marginBottom: 20,
  },
});
