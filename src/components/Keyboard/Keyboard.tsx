import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { buttonStyle } from "../../styles/buttons";
import { KeyboardInput } from "./KeyboardInput";

const Keyboard = ({
  digit,
  onValidPress,
  onButtonPress,
  isDisabled,
}: {
  digit: string;
  onValidPress: () => void;
  onButtonPress: (value: string) => void;
  isDisabled: boolean;
}) => (
  <View style={{ flex: 1, flexDirection: "column" }}>
    <View style={{ flex: 1, flexDirection: "row" }}>
      <KeyboardInput
        disabled={digit.length === 0 || digit.length === 4}
        onPress={onButtonPress}
        value={"0"}
      />
      <KeyboardInput
        disabled={digit.indexOf("1") != -1 || digit.length === 4}
        onPress={onButtonPress}
        value={"1"}
      />
      <KeyboardInput
        disabled={digit.indexOf("2") != -1 || digit.length === 4}
        onPress={onButtonPress}
        value={"2"}
      />
      <KeyboardInput
        disabled={digit.indexOf("3") != -1 || digit.length === 4}
        onPress={onButtonPress}
        value={"3"}
      />
    </View>
    <View style={{ flex: 1, flexDirection: "row" }}>
      <KeyboardInput
        disabled={digit.indexOf("4") != -1 || digit.length === 4}
        onPress={onButtonPress}
        value={"4"}
      />
      <KeyboardInput
        disabled={digit.indexOf("5") != -1 || digit.length === 4}
        onPress={onButtonPress}
        value={"5"}
      />
      <KeyboardInput
        disabled={digit.indexOf("6") != -1 || digit.length === 4}
        onPress={onButtonPress}
        value={"6"}
      />
      <KeyboardInput
        disabled={digit.indexOf("7") != -1 || digit.length === 4}
        onPress={onButtonPress}
        value={"7"}
      />
    </View>
    <View style={{ flex: 1, flexDirection: "row" }}>
      <KeyboardInput
        disabled={digit.indexOf("8") != -1 || digit.length === 4}
        onPress={onButtonPress}
        value={"8"}
      />
      <KeyboardInput
        disabled={digit.indexOf("9") != -1 || digit.length === 4}
        onPress={onButtonPress}
        value={"9"}
      />
      <TouchableOpacity
        style={[
          buttonStyle.shadow,
          styles.content,
          isDisabled && buttonStyle.disabled,
          { flex: 2, backgroundColor: "#EADFC3" },
        ]}
        disabled={isDisabled}
        onPress={onValidPress}
      >
        <Text style={[buttonStyle.text, buttonStyle.lightText]}>Valider</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default Keyboard;

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
