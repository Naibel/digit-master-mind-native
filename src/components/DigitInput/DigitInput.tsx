import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const CELL_COUNT = 4;

const DigitInput = ({
  digit,
  onDigitChange,
}: {
  digit: string;
  onDigitChange: (value: string) => void;
}) => {
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value: digit, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <CodeField
      ref={ref}
      value={digit}
      onChangeText={onDigitChange}
      cellCount={CELL_COUNT}
      textContentType="oneTimeCode"
      keyboardType="numeric"
      renderCell={({ index, symbol, isFocused }) => (
        <Text
          key={index}
          style={[styles.cell, isFocused && styles.focusCell]}
          onLayout={getCellOnLayoutHandler(index)}
        >
          {symbol || (isFocused ? <Cursor /> : null)}
        </Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
  cell: {
    fontFamily: "AutourOne-Regular",
    width: 66,
    height: 76,
    lineHeight: 76,
    fontSize: 50,
    borderRadius: 3,
    borderColor: "#E0D0A7",
    borderBottomWidth: 3,
    backgroundColor: "#FFF8E7",
    textAlign: "center",
    color: "#7A693C",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 1,
  },
  focusCell: {
    backgroundColor: "#EADFC3",
    color: "#51362F",
  },
});

export default DigitInput;
