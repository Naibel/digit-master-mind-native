import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { buttonStyle } from "../../styles/buttons";

const Keyboard = ({
  onValidPress,
  onButtonPress,
  isDisabled,
}: {
  onValidPress: () => void;
  onButtonPress: (value: string) => void;
  isDisabled: boolean;
}) => {
  return (
    <View style={{ height: 170, flexDirection: "column" }}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => onButtonPress("0")}
          style={[buttonStyle.shadow, styles.content]}
        >
          <Text style={[buttonStyle.text, buttonStyle.lightText]}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onButtonPress("1")}
          style={[buttonStyle.shadow, styles.content]}
        >
          <Text style={[buttonStyle.text, buttonStyle.lightText]}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onButtonPress("2")}
          style={[buttonStyle.shadow, styles.content]}
        >
          <Text style={[buttonStyle.text, buttonStyle.lightText]}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onButtonPress("3")}
          style={[buttonStyle.shadow, styles.content]}
        >
          <Text style={[buttonStyle.text, buttonStyle.lightText]}>3</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => onButtonPress("4")}
          style={[buttonStyle.shadow, styles.content]}
        >
          <Text style={[buttonStyle.text, buttonStyle.lightText]}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onButtonPress("5")}
          style={[buttonStyle.shadow, styles.content]}
        >
          <Text style={[buttonStyle.text, buttonStyle.lightText]}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onButtonPress("6")}
          style={[buttonStyle.shadow, styles.content]}
        >
          <Text style={[buttonStyle.text, buttonStyle.lightText]}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onButtonPress("7")}
          style={[buttonStyle.shadow, styles.content]}
        >
          <Text style={[buttonStyle.text, buttonStyle.lightText]}>7</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => onButtonPress("8")}
          style={[buttonStyle.shadow, styles.content]}
        >
          <Text style={[buttonStyle.text, buttonStyle.lightText]}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onButtonPress("9")}
          style={[buttonStyle.shadow, styles.content]}
        >
          <Text style={[buttonStyle.text, buttonStyle.lightText]}>9</Text>
        </TouchableOpacity>
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
};

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