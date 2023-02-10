import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { buttonStyle } from "../../styles/buttons";

export const KeyboardInput = ({
  disabled,
  value,
  onPress,
}: {
  disabled: boolean;
  value: string;
  onPress: (val: string) => void;
}) => (
  <TouchableOpacity
    disabled={disabled}
    onPress={() => onPress(value)}
    style={[
      buttonStyle.shadow,
      disabled && buttonStyle.disabled,
      styles.content,
    ]}
  >
    <Text style={[buttonStyle.text, buttonStyle.lightText]}>{value}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#FFF8E7",
    margin: 5,
    borderRadius: 3,
  },
});
