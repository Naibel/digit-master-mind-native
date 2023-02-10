import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const Attempts = ({ userData }: { userData: any }) => {
  if (!userData) return null;
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        borderColor: "rgba(255,255,255,0.3)",
        borderWidth: 2,
        borderStyle: "dashed",
      }}
    >
      <Text style={attempsStyles.attempts}>Tes précédentes tentatives</Text>
      {userData.map((attempt: any, index: number) => (
        <View key={index} style={attempsStyles.attemptsView}>
          <View style={attempsStyles.numberView}>
            <Text style={attempsStyles.number}>{attempt.attempt} </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={attempsStyles.cows}>
              <Text style={{ fontWeight: "bold" }}>{attempt.cows}</Text>
              <Image
                style={{ width: 23, height: 23 }}
                source={require("../../../../assets/img/cows_list.png")}
              />
            </Text>
            <Text style={attempsStyles.bulls}>
              <Text style={{ fontWeight: "bold" }}>{attempt.bulls}</Text>
              <Image
                style={{ width: 23, height: 23 }}
                source={require("../../../../assets/img/bulls_list.png")}
              />
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default Attempts;

const attempsStyles = StyleSheet.create({
  attemptsView: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontFamily: "AutourOne-Regular",
    textAlign: "center",
    marginVertical: 5,
    flexDirection: "row",
    alignContent: "space-around",
    alignItems: "center",
  },
  attempts: {
    fontFamily: "AutourOne-Regular",
    textAlign: "center",
    marginVertical: 5,
    color: "white",
  },
  bulls: {
    fontFamily: "AutourOne-Regular",
    color: "white",
    fontSize: 20,
  },
  cows: {
    fontFamily: "AutourOne-Regular",
    color: "white",
    fontSize: 20,
    marginRight: 10,
  },
  numberView: {
    flex: 1,
  },
  number: {
    fontFamily: "AutourOne-Regular",
    color: "white",
    fontSize: 20,
  },
});
