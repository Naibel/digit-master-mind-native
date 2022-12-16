import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DigitInput } from "../../components";
import usePlay from "../../hooks/usePlay";
import firestore from "@react-native-firebase/firestore";
import { StartGameModal } from "../../modals";
import { SafeAreaView } from "react-native-safe-area-context";

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
        {!finished && (
          <>
            <Text style={styles.subtitle}>Votre numéro secret est</Text>
            <Text style={styles.number}>
              {mode === "join" ? currentGame.b_digit : currentGame.a_digit}
            </Text>
            {turn && <Text style={styles.subtitle}>{getTurnMessage()}</Text>}
          </>
        )}
        {finished ? (
          <>
            {/* <View>
              {(mode === "join" && currentGame.b_win) ||
              (mode === "start" && currentGame.a_win) ? (
                <Text style={styles.title}>Vous avez gagné !</Text>
              ) : (
                <Text style={styles.title}>Sapristi, t'as perdu !</Text>
              )}
              <Button
                onPress={() => {
                  navigation.goBack();
                }}
                title="Revenir en arrière"
              />
            </View> */}
            <SucessEndScreen adversaryNumber={1234} />
          </>
        ) : (
          <>
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

const SucessEndScreen = ({ adversaryNumber }: { adversaryNumber: number }) => {
  return (
    <SafeAreaView style={endStyles.content}>
      <Text style={[endStyles.title, { marginBottom: 30 }]}>Bravo !</Text>
      <Text style={endStyles.subtitle}>
        Le numéro secret de votre adversaire était
      </Text>
      <Text style={[endStyles.title, { fontSize: 48, marginBottom: 30 }]}>
        {adversaryNumber}
      </Text>
      <View style={endStyles.circle}>
        <Image
          style={{ width: 235, height: 235 }}
          source={require("../../../assets/img/trophy.png")}
        />
      </View>
      <View style={{ flex: 1 }} />
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Image source={require("../../../assets/img/refresh.png")} />
        <Text style={endStyles.buttonText}>On refait une partie ?</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const endStyles = StyleSheet.create({
  content: {
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  title: {
    fontFamily: "AutourOne-Regular",
    color: "white",
    fontSize: 40,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "AutourOne-Regular",
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
  circle: {
    padding: 20,
    width: 275,
    borderRadius: 500,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginBottom: 50,
  },
  buttonText: {
    fontFamily: "AutourOne-Regular",
    color: "#7A693C",
    fontSize: 16,
    marginLeft: 10,
  },
});

const Attempts = ({ userData }: { userData: any }) => {
  if (!userData) return null;
  return (
    <ScrollView style={{ height: 291 }}>
      {userData.map((attempt: any, index: number) => (
        <View key={index} style={attempsStyles.attemptsView}>
          <View style={attempsStyles.numberView}>
            <Text style={attempsStyles.number}>{attempt.attempt} </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={attempsStyles.cows}>
              <Text style={{ fontWeight: "bold" }}>{attempt.cows}</Text>
              <Image
                style={{ width: 23, height: 23 }}
                source={require("../../../assets/img/cows_list.png")}
              />
            </Text>
            <Text style={attempsStyles.bulls}>
              <Text style={{ fontWeight: "bold" }}>{attempt.bulls}</Text>
              <Image
                style={{ width: 23, height: 23 }}
                source={require("../../../assets/img/bulls_list.png")}
              />
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const attempsStyles = StyleSheet.create({
  attemptsView: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontFamily: "AutourOne-Regular",
    textAlign: "center",
    marginVertical: 5,
    flexDirection: "row",
    alignContent: "space-around",
    alignItems: "center",
  },
  attempts: {
    fontFamily: "AutourOne-Regular",
    textAlign: "center",
    marginVertical: 5,
  },
  bulls: {
    fontFamily: "AutourOne-Regular",
    color: "white",
    fontSize: 20,
  },
  cows: {
    fontFamily: "AutourOne-Regular",
    color: "white",
    fontSize: 20,
    marginRight: 10,
  },
  numberView: {
    flex: 1,
  },
  number: {
    fontFamily: "AutourOne-Regular",
    color: "white",
    fontSize: 20,
  },
});

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
