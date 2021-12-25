import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export const Button = ({ content, onPress, isButtonDisabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        isButtonDisabled
          ? styles.grayListItemPlacement
          : styles.orangeListItemPlacement
      }
      disabled={isButtonDisabled}
    >
      <Text style={styles.listStyleText}>{content}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  grayListItemPlacement: {
    width: 200,
    height: 70,
    backgroundColor: "gray",
    borderWidth: 1,
    shadowColor: "black",
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  orangeListItemPlacement: {
    width: 200,
    height: 70,
    backgroundColor: "#ff9900",
    borderWidth: 1,
    shadowColor: "black",
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  listStyleText: {
    fontSize: 22,
    color: "white",
    fontWeight: "600",
  },
});
