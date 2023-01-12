import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import checkDigit from "../../helpers/checkDigit";
import { buttonStyle } from "../../styles/buttons";

const DigitInput = ({
  onDigitChange,
}: {
  onDigitChange: (value: string) => void;
}) => {
  const [digit, setDigit] = useState("");

  const onChanged = (text: string) => {
    checkDigit(text, digit, () => {
      setDigit(text);
      onDigitChange(text);
    });
  };

  return (
    <TextInput
      style={[styles.input, buttonStyle.shadow]}
      keyboardType="numeric"
      onChangeText={onChanged}
      value={digit}
      maxLength={4} //allows only 1 number
    />
  );
};

const styles = StyleSheet.create({
  input: {
    fontFamily: "AutourOne-Regular",
    color: "#7A693C",
    backgroundColor: "#FFF8E7",
    borderRadius: 10,
    padding: 10,
    textAlign: "center",
    fontSize: 48,
    letterSpacing: 20,
  },
});

export default DigitInput;
