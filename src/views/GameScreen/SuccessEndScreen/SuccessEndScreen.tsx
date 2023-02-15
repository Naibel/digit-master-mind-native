import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { buttonStyle } from "../../../styles/buttons";

const SuccessEndScreen = ({
  navigation,
  adversaryNumber,
}: {
  navigation: any;
  adversaryNumber: number;
}) => (
  <SafeAreaView style={endStyles.content}>
    <View style={endStyles.circle}>
      <Image
        style={{ width: 235, height: 235 }}
        source={require("../../../../assets/img/trophy.png")}
      />
    </View>
    <Text style={endStyles.subtitle}>
      Le numéro secret de votre adversaire était
    </Text>
    <Text style={[endStyles.title, { fontSize: 48, marginBottom: 20 }]}>
      {adversaryNumber}
    </Text>
    <Text style={endStyles.subtitle}>
      Vous avez deviné ce numéro au bout de
    </Text>
    <Text style={endStyles.subtitle}>12</Text>
    <Text style={endStyles.subtitle}>tentatives.</Text>
    <View style={{ flex: 1 }} />
    <TouchableOpacity
      style={[
        buttonStyle.button,
        buttonStyle.light,
        buttonStyle.shadow,
        buttonStyle.flexRow,
      ]}
      onPress={() =>
        navigation.navigate("Home", {
          startNewGame: true,
        })
      }
    >
      <Image
        style={{ marginRight: 10 }}
        source={require("../../../../assets/img/refresh.png")}
      />
      <Text style={[buttonStyle.lightText, buttonStyle.text]}>
        On refait une partie ?
      </Text>
    </TouchableOpacity>
  </SafeAreaView>
);

export default SuccessEndScreen;

const endStyles = StyleSheet.create({
  content: {
    alignContent: "center",
    justifyContent: "space-between",
    textAlign: "center",
  },
  title: {
    fontFamily: "AutourOne-Regular",
    color: "white",
    fontSize: 40,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "AutourOne-Regular",
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
  circle: {
    padding: 20,
    width: 275,
    borderRadius: 500,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginBottom: 50,
  },
  buttonText: {
    fontFamily: "AutourOne-Regular",
    color: "#7A693C",
    fontSize: 16,
    marginLeft: 10,
  },
});
