import React, { useEffect, useState } from "react";
import usePlay from "../../hooks/usePlay";
import firestore from "@react-native-firebase/firestore";
import { Text, View } from "react-native";
import { JoinGameModal } from "../../modals";

const JoinGamePlay = ({ route, navigation }: any) => {
  const { play } = usePlay();

  const [finished, setFinished] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [timeleft, setTimeleft] = useState(10);
  const [turn, setTurn] = useState("");
  const [attempt, setAttempt] = useState("");
  const [choosen, setChoosen] = useState("");
  const [currentGame, setCurrentGame] = useState<any>({});

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
      // doc.data()?.isOpen && onOpen();
      setCurrentGame(doc.data());
      if (!doc.data()?.b_attempts) {
        games.doc(id).update({
          b_attempts: [],
        });
      }
      setFinished(doc.data()?.finished);
      setTurn(doc.data()?.turn);
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
    // onClose();
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
        // setAttempt('');
      });
  };

  return (
    <View>
      <Text>Game Play</Text>
      <Text>Your number is: {currentGame.b_digit}</Text>
      {finished && (
        <View>
          {currentGame.b_win ? <Text>you won</Text> : <Text>you lost</Text>}
        </View>
      )}
      {!finished && (
        <>
          <Text>il vous reste : {timeleft}</Text>
          {/* <Progress value={timeleft * 10} /> */}
          {currentGame.b_attempts?.map((b: any, index: number) => (
            <Text key={index}>
              {index + 1}__{b.attempt} : {b.bulls} taureau et {b.cows} vache
            </Text>
          ))}
          <JoinGameModal
            visible={false}
            onClose={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
          {/* <InputGroup size="md">
            <DigitInput onDigitChange={setAttempt} />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                disabled={attempt.length !== 4 || finished || disabled}
                onClick={handleAttempt}
              >
                Go
              </Button>
            </InputRightElement>
          </InputGroup> */}
        </>
      )}
    </View>
  );
};

export default JoinGamePlay;
