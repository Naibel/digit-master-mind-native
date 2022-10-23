import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import usePlay from "../../hooks/usePlay";
import firestore from "@react-native-firebase/firestore";
import { DigitInput } from "../../components";

const StartGamePlay = ({ route }: any) => {
  const { play } = usePlay();

  const [finished, setFinished] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [timeleft, setTimeleft] = useState<number>(10);
  const [turn, setTurn] = useState<string>("");
  const [attempt, setAttempt] = useState<string>("");
  const [currentGame, setCurrentGame] = useState<any>({});

  const games = firestore().collection("games");
  const { id } = route.params;

  const handleStart = () => {
    let count = 10;

    const timer = setInterval(() => {
      if (turn === "b") {
        count = 0;
        return;
      }
      const newCount = count - 1;
      setTimeleft(newCount >= 0 ? newCount : 0);
      count = newCount >= 0 ? newCount : 0;
      console.log("tt ", count);
      if (count === 0) {
        games.doc(id).update({ turn: "b" });
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

    if (turn === "a") {
      setTimeleft(10);
      setDisabled(false);
      handleStart();
    } else {
      console.log("clear");
      // clearInterval();
    }
  }, [turn]);

  useEffect(() => {
    let unsubscribe = games.doc(id).onSnapshot((doc) => {
      setCurrentGame(doc.data());
      if (!doc.data()?.a_attempts) {
        games.doc(id).update({
          a_attempts: [],
        });
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
    setDisabled(true);
    // clearInterval(timer);
    setTimeleft(0);

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
  };

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Votre session de jeu</Text>
      <Text style={styles.subtitle}>Tour : {turn}</Text>
      <Text style={styles.subtitle}>Votre numéro est :</Text>
      <Text style={styles.title}>{currentGame.a_digit}</Text>
      {finished && (
        <View>
          {currentGame.a_win ? (
            <Text>Vous avez gagné !</Text>
          ) : (
            <Text>Sapristi, t'as perdu !</Text>
          )}
        </View>
      )}
      {!finished && (
        <>
          {currentGame.isOpen ? (
            <View>
              <Text>En attente d'un autre joueur...</Text>
              <ActivityIndicator size="large" color="grey" />
            </View>
          ) : (
            <View>
              <Text>Il vous reste {timeleft} tentatives.</Text>
              {/* <Progress value={timeleft * 10} /> */}
              {currentGame.a_attempts?.map((a: any, index: number) => (
                <Text key={index}>
                  {index + 1}__{a.attempt} : {a.bulls} taureau(x) à et {a.cows}{" "}
                  vache(s)
                </Text>
              ))}
              <View>
                <DigitInput onDigitChange={setAttempt} />
                <View>
                  <Button
                    disabled={attempt.length !== 4 || finished || disabled}
                    onPress={handleAttempt}
                    title="Go"
                  />
                </View>
              </View>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default StartGamePlay;
