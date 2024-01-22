import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";

const SuccessEndScreen = ({ adversaryNumber }: { adversaryNumber: number }) => (
  <SafeAreaView style={endStyles.content}>
    <View>
      <Image
        style={{
          width: 235,
          height: 235,
          alignSelf: "center",
          marginBottom: 20,
        }}
        source={require("../../../../assets/img/trophy_with_text.png")}
      />
      <Text style={endStyles.subtitle}>
        Le numéro de votre adversaire était bien
      </Text>
      <Text style={[endStyles.title, { fontSize: 48, marginBottom: 20 }]}>
        {adversaryNumber}
      </Text>
      <Text style={endStyles.subtitle}>
        Vous avez deviné ce numéro au bout de{" "}
        <Text style={{ fontSize: 24 }}>12</Text> tentatives !
      </Text>
    </View>
  </SafeAreaView>
);

export default SuccessEndScreen;

const endStyles = StyleSheet.create({
  content: {
    alignContent: "space-between",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    paddingHorizontal: 40,
    paddingTop: 30,
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
});
