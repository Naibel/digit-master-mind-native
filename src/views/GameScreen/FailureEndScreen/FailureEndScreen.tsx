import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

const FailureEndScreen = ({ adversaryNumber }: { adversaryNumber: number }) => (
  <SafeAreaView style={endStyles.content}>
    <Text style={[endStyles.title, { marginBottom: 20 }]}>Dommage...</Text>
    <Text style={[endStyles.subtitle, { marginBottom: 20 }]}>
      Votre adversaire a deviné votre numéro avant vous !{" "}
    </Text>
    <Text style={endStyles.subtitle}>
      Le numéro secret de votre adversaire était
    </Text>
    <Text style={[endStyles.title, { fontSize: 48, marginBottom: 20 }]}>
      {adversaryNumber}
    </Text>
  </SafeAreaView>
);

export default FailureEndScreen;

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
});
