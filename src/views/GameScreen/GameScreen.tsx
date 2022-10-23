import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { DigitInput } from "../../components";
import usePlay from "../../hooks/usePlay";
import firestore from "@react-native-firebase/firestore";
import { StartGameModal } from "../../modals";
import { SafeAreaView } from "react-native-safe-area-context";

const GameScreen = ({ route }: any) => {
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
    <SafeAreaView style={styles.content}>
      <Text style={styles.title}>
        {mode === "join"
          ? "La session de jeu d'un utilisateur"
          : "Votre session de jeu"}
      </Text>
      <Text style={styles.subtitle}>Votre numéro est : </Text>
      <Text style={styles.title}>
        {mode === "join" ? currentGame.b_digit : currentGame.a_digit}
      </Text>
      {turn && <Text style={styles.subtitle}>{getTurnMessage()}</Text>}
      {finished && (
        <View>
          {(mode === "join" && currentGame.b_win) ||
          (mode === "start" && currentGame.a_win) ? (
            <Text style={styles.title}>Vous avez gagné !</Text>
          ) : (
            <Text style={styles.title}>Sapristi, t'as perdu !</Text>
          )}
        </View>
      )}
      {!finished && (
        <>
          {mode === "start" && currentGame.isOpen ? (
            <View>
              <Text style={styles.text}>En attente d'un autre joueur...</Text>
              <ActivityIndicator size="large" color="grey" />
            </View>
          ) : (
            <View>
              {turn && (
                <Text style={styles.text}>
                  Il vous reste {timeleft} secondes.
                </Text>
              )}
              {/* <Progress value={timeleft * 10} /> */}
              <View style={styles.attemptsView}>
                <Attempts
                  userData={
                    mode === "join"
                      ? currentGame?.b_attempts
                      : currentGame?.a_attempts
                  }
                />
              </View>

              <View>
                <DigitInput onDigitChange={setAttempt} />
                <Button
                  disabled={attempt.length !== 4 || finished || notYourTurn}
                  onPress={handleAttempt}
                  title="Valider"
                />
              </View>
            </View>
          )}
        </>
      )}
      {mode === "join" && (
        <StartGameModal
          onDigitChange={setChosenNumber}
          onBegin={startGame}
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </SafeAreaView>
  );
};

export default GameScreen;

const Attempts = ({ userData }: { userData: any }) => {
  if (!userData) return null;
  return userData.map((attempt: any, index: number) => (
    <Text style={styles.attempts} key={index}>
      {index + 1} : {attempt.attempt} : {attempt.bulls} taureau(x) à et{" "}
      {attempt.cows} vache(s)
    </Text>
  ));
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "stretch",
    textAlign: "center",
    padding: 20,
  },
  attemptsView: {
    textAlign: "center",
    marginVertical: 20,
  },
  attempts: {
    textAlign: "center",
    marginVertical: 5,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: "center",
  },
  text: {
    textAlign: "center",
  },
});
