import React, { useEffect, useState } from "react";
import usePlay from "../../hooks/usePlay";
import firestore from "@react-native-firebase/firestore";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { StartGameModal } from "../../modals";
import { DigitInput, styles } from "../../components";

const JoinGamePlay = ({ route }: any) => {
  const { play } = usePlay();

  const [finished, setFinished] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [timeleft, setTimeleft] = useState<number>(10);
  const [turn, setTurn] = useState<string>("");
  const [attempt, setAttempt] = useState<string>("");
  const [choosen, setChoosen] = useState<string>("");
  const [currentGame, setCurrentGame] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const games = firestore().collection("games");
  const { id } = route.params;

  const handleStart = () => {
    let count = 10;

    const timer = setInterval(() => {
      if (turn === "a") {
        count = 0;
        return;
      }
      const newCount = count - 1;
      setTimeleft(newCount >= 0 ? newCount : 0);
      count = newCount >= 0 ? newCount : 0;
      console.log("tt ", count);
      if (count === 0) {
        games.doc(id).update({ turn: "a" });
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

    if (turn === "b") {
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
      doc.data()?.isOpen && setIsModalOpen(true);
      setCurrentGame(doc.data());
      if (!doc.data()?.b_attempts) {
        games.doc(id).update({
          b_attempts: [],
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

  const startGame = () => {
    games.doc(id).update({
      isOpen: false,
      b_digit: choosen,
    });
    setIsModalOpen(false);
  };

  const handleAttempt = () => {
    setDisabled(true);
    // clearInterval(timer);
    setTimeleft(0);

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
  };

  return (
    <View style={JGstyles.content}>
      <Text style={JGstyles.title}>La session de jeu d'un utilisateur :</Text>
      <Text style={JGstyles.subtitle}>Tour : {turn}</Text>
      <Text style={JGstyles.subtitle}>Votre numéro est :</Text>
      <Text style={JGstyles.title}>{currentGame.b_digit || ""}</Text>
      {finished && (
        <View>
          {currentGame.b_win ? (
            <Text>Vous avez gagné !</Text>
          ) : (
            <Text>Sapristi, t'as perdu !</Text>
          )}
        </View>
      )}
      {!finished && (
        <>
          <Text style={JGstyles.subtitle}>
            Il vous reste {timeleft} tentatives.
          </Text>
          {/* <Progress value={timeleft * 10} /> */}
          {currentGame.b_attempts?.map((b: any, index: number) => (
            <Text key={index}>
              {index + 1}__{b.attempt} : {b.bulls} taureau(x) et {b.cows}{" "}
              vache(s)
            </Text>
          ))}
          <DigitInput onDigitChange={setAttempt} />
          <Pressable
            disabled={attempt.length !== 4 || finished || disabled}
            style={[styles.button, styles.buttonClose]}
            onPress={handleAttempt}
          >
            <Text style={styles.textStyle}>Go</Text>
          </Pressable>
        </>
      )}
      <StartGameModal
        onDigitChange={setChoosen}
        onBegin={startGame}
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </View>
  );
};

const JGstyles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "stretch",
    textAlign: "center",
    padding: 20,
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
});

export default JoinGamePlay;
