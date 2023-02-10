import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import firestore from "@react-native-firebase/firestore";

import usePlay from "../../hooks/usePlay";
import { DigitInput, Keyboard } from "../../components";
import { UserBStartGameModal } from "../Home/modals";
import { SuccessEndScreen } from "./SuccessEndScreen";
import { Attempts } from "./Attempts";
import { FailureEndScreen } from "./FailureEndScreen";
import checkDigit from "../../utils/checkDigit";

const GameScreen = ({ route, navigation }: any) => {
  const { play } = usePlay();

  const [finished, setFinished] = useState<boolean>(false);
  const [timeleft, setTimeleft] = useState<number>(10);
  const [turn, setTurn] = useState<string>("");
  const [attempt, setAttempt] = useState<string>("");
  const [currentGame, setCurrentGame] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const games = firestore().collection("games");
  const { id, mode } = route.params;

  const notYourTurn =
    (mode === "join" && turn === "a") || (mode === "start" && turn === "b");
  const yourTurn =
    (mode === "start" && turn === "a") || (mode === "join" && turn === "b");

  const isDisabled = attempt.length !== 4 || finished || notYourTurn;

  const handleStart = () => {
    let count = 10;

    const timer = setInterval(() => {
      if (turn === (mode === "join" ? "a" : "b")) {
        count = 0;
        return;
      }
      const newCount = count - 1;
      count = newCount >= 0 ? newCount : 0;

      setTimeleft(count);
      console.log("tt ", count);
      if (count === 0) {
        games.doc(id).update({ turn: mode === "join" ? "a" : "b" });
        clearInterval(timer);
      }
    }, 1000);
  };

  useEffect(() => {
    console.log("turn => ", turn);

    if (turn === (mode === "join" ? "b" : "a")) {
      setTimeleft(10);
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

  const handleAttempt = () => {
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
        });
    }
  };

  const getTurnMessage = () => {
    if (notYourTurn) return "C'est le tour de l'autre !";
    if (yourTurn) return "C'est ton tour !";
  };

  const onAttemptChange = (newDigit: string) => {
    checkDigit(newDigit, attempt, () => {
      setAttempt(newDigit);
    });
  };

  const onButtonPressedChange = (newNumber: string) => {
    const newDigit = attempt + newNumber;
    checkDigit(newDigit, attempt, () => {
      setAttempt(newDigit);
    });
  };

  return (
    <LinearGradient
      start={{ x: 0.2, y: 0.8 }}
      end={{ x: 0.2, y: 0.805 }}
      colors={["#78C6FF", "#3CBB50"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.content}>
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
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 42,
            flex: 1,
            alignContent: "stretch",
          }}
        >
          {finished ? (
            (mode === "start" && currentGame.a_win) ||
            (mode === "join" && currentGame.b_win) ? (
              <SuccessEndScreen
                navigation={navigation}
                adversaryNumber={
                  mode === "start" ? currentGame.b_digit : currentGame.a_digit
                }
              />
            ) : (
              <FailureEndScreen
                navigation={navigation}
                adversaryNumber={
                  mode === "start" ? currentGame.b_digit : currentGame.a_digit
                }
              />
            )
          ) : (
            <>
              {(mode === "start" ||
                (mode == "join" && !currentGame.isOpen)) && (
                <View
                  style={{
                    backgroundColor: "rgba(0,0,0,0.3)",
                    marginBottom: 20,
                    borderRadius: 10,
                    padding: 10,
                  }}
                >
                  <Text style={styles.subtitle}>
                    Votre numéro secret est{" "}
                    {mode === "join"
                      ? currentGame.b_digit
                      : currentGame.a_digit}
                  </Text>
                </View>
              )}
              {turn && (
                <Text
                  style={[
                    styles.subtitle,
                    {
                      marginBottom: 10,
                    },
                  ]}
                >
                  {getTurnMessage()}
                </Text>
              )}
              {mode === "start" && currentGame.isOpen ? (
                <View>
                  <Text style={styles.text}>
                    En attente d'un autre joueur...
                  </Text>
                  <ActivityIndicator size="large" color="white" />
                </View>
              ) : (
                <View style={{ flex: 1, alignContent: "stretch" }}>
                  <View
                    style={{
                      flex: 1,
                      alignContent: "stretch",
                      marginTop: 0,
                      marginBottom: 20,
                    }}
                  >
                    <Text style={[styles.text, { marginBottom: 10 }]}>
                      Devinez le numéro de votre adversaire !{" "}
                    </Text>
                    <DigitInput
                      noKeyboard
                      digit={attempt}
                      onDigitChange={onAttemptChange}
                    />
                    <Attempts
                      userData={
                        mode === "join"
                          ? currentGame?.b_attempts
                          : currentGame?.a_attempts
                      }
                    />
                  </View>
                </View>
              )}
            </>
          )}
        </View>
        <ImageBackground
          style={{ height: 200, zIndex: -1, paddingHorizontal: 42 }}
          source={require("../../../assets/img/grass_bg_low.png")}
        >
          {mode === "start" && currentGame.isOpen ? null : (
            <Keyboard
              digit={attempt}
              onButtonPress={onButtonPressedChange}
              onValidPress={handleAttempt}
              isDisabled={isDisabled}
            />
          )}
        </ImageBackground>
        {mode === "join" && (
          <UserBStartGameModal
            route={route}
            navigation={navigation}
            visible={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
            }}
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "stretch",
    textAlign: "center",
  },
  number: {
    fontFamily: "AutourOne-Regular",
    fontSize: 40,
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
  },
});
