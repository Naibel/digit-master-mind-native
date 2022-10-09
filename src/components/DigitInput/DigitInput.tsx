import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

const DigitInput = ({
  onDigitChange,
}: {
  onDigitChange: (value: string) => void;
}) => {
  const [value, setValue] = useState("");

  const onChanged = (text: string) => {
    if ((value.length === 0 && text === "0") || text.match(/[^0-9]/g)) {
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
