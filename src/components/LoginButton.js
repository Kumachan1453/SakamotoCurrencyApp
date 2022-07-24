import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const LoginButton = ({ onPress, disabled, text }) => {
  return (
    <TouchableOpacity
      style={
        disabled ? styles.unTouchableOpacityLogin : styles.touchableOpacityLogin
      }
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.textStyleInTouchableOpacity}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableOpacityLogin: {
    padding: 20,
    margin: 5,
    backgroundColor: "orange",
    borderRadius: 10,
  },
  unTouchableOpacityLogin: {
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
