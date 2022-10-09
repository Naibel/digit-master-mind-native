import React from "react";
import { StyleSheet, View } from "react-native";
import DigitInput from "../DigitInput/DigitInput";

const NumberInput = ({
  onDigitChange,
}: {
  onDigitChange: (value: string) => void;
}) => (
  <View style={styles.view}>
    <DigitInput onDigitChange={onDigitChange} />
  </View>
);

const styles = StyleSheet.create({
  view: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },
});

export default NumberInput;
