import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

const DigitInput = ({
  onDigitChange,
}: {
  onDigitChange: (value: string) => void;
}) => {
  const [value, setValue] = useState("");

  const onChanged = (text: string) => {
    const lastEnteredValue = text[text.length - 1];
    //This test will only launches if you add a new number, not when you remove one
    const isThereAlreadyThisValue =
      text.length > value.length && value.indexOf(lastEnteredValue) > -1;

    if (
      (value.length === 0 && text === "0") ||
      isThereAlreadyThisValue ||
      text.match(/[^0-9]/g)
    ) {
      return false;
    }
    setValue(text);
    onDigitChange(text);
  };

  return (
    <TextInput
      style={styles.input}
      keyboardType="numeric"
      onChangeText={onChanged}
      value={value}
      maxLength={4} //allows only 1 number
    />
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 2,
    borderBottomWidth: 1,
    borderColor: "lightGrey",
    padding: 3,
    textAlign: "center",
    fontSize: 48,
    letterSpacing: 20,
  },
});

export default DigitInput;
