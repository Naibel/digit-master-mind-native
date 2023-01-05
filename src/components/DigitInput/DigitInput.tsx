import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { buttonStyle } from "../../styles/buttons";

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
      style={[styles.input, buttonStyle.shadow]}
      keyboardType="numeric"
      onChangeText={onChanged}
      value={value}
      maxLength={4} //allows only 1 number
    />
  );
};

const styles = StyleSheet.create({
  input: {
    fontFamily: "AutourOne-Regular",
    color: "#7A693C",
    margin: 2,
    backgroundColor: "#FFF8E7",
    borderRadius: 10,
    padding: 10,
    textAlign: "center",
    fontSize: 48,
    letterSpacing: 20,
  },
});

export default DigitInput;
