import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const RegisterButton = ({ onPress, disabled, text }) => {
  return (
    <TouchableOpacity
      style={
        disabled
          ? styles.unTouchableOpacityRegister
          : styles.touchableOpacityRegister
      }
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.textStyleInTouchableOpacity}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableOpacityRegister: {
    padding: 20,
    margin: 5,
    backgroundColor: "#88cb7f",
    borderRadius: 10,
  },
  unTouchableOpacityRegister: {
    padding: 20,
    margin: 5,
    backgroundColor: "lightgray",
    borderRadius: 10,
  },
  textStyleInTouchableOpacity: {
    fontSize: 20,
    color: "white",
  },
});
