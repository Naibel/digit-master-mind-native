import { StyleSheet } from "react-native";

export const buttonStyle = StyleSheet.create({
  disabled: {
    opacity: 0.3,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  dark: {
    backgroundColor: "#7A693C",
  },
  light: {
    backgroundColor: "#F9E5B4",
  },
  darkText: {
    color: "#F9E5B4",
  },
  lightText: {
    color: "#7A693C",
  },
  whiteText: {
    color: "white",
  },
  button: {
    display: "flex",
    borderRadius: 6,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    paddingVertical: 16,
  },
  flexRow: {
    flexDirection: "row",
  },
  flexColumn: {
    flexDirection: "column",
  },
  text: {
    fontFamily: "AutourOne-Regular",
    fontSize: 16,
    textAlign: "center",
  },
  smallText: {
    fontFamily: "AutourOne-Regular",
    fontSize: 12,
    textAlign: "center",
  },
});
