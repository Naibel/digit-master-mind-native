import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { buttonStyle } from "../../styles/buttons";
import { ModalType } from "./Home";

const HomeButtons = ({ onPress }: { onPress: (value: ModalType) => void }) => (
  <>
    <View style={styles.gameButtons}>
      <TouchableOpacity
        style={[styles.gameButton, buttonStyle.shadow]}
        onPress={() => onPress("start")}
      >
        <Text style={[buttonStyle.text, buttonStyle.lightText]}>
          Commencer une partie
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.gameButton, buttonStyle.shadow]}
        onPress={() => onPress("join")}
      >
        <Text style={[buttonStyle.text, buttonStyle.lightText]}>
          Rejoindre une partie
        </Text>
      </TouchableOpacity>
    </View>
    <View>
      <TouchableOpacity
        style={[styles.ruleButton]}
        onPress={() => onPress("help")}
      >
        <Image
          style={{
            width: 61,
            height: 61,
            alignSelf: "center",
            marginRight: 24,
          }}
          source={require("../../../assets/img/help_icon.png")}
        />
        <Text style={styles.ruleButtonText}>Comment jouer ?</Text>
      </TouchableOpacity>
    </View>
  </>
);

const styles = StyleSheet.create({
  gameButtons: {
    flexDirection: "row",
  },
  gameButton: {
    backgroundColor: "#F9E5B4",
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  ruleButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E7E2D",
    margin: 10,
    height: 46,
    borderRadius: 6,
    elevation: 3,
    shadowColor: "#000",
  },
  ruleButtonText: {
    fontFamily: "AutourOne-Regular",
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default HomeButtons;
