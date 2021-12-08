import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export const Button = ({ content, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.listItemPlacement}>
      <Text style={styles.listStyleText}>{content}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItemPlacement: {
    // width: "60%",
    // height: "10%",
    width: 200,
    height: 70,
    margin: 20,
    backgroundColor: "#ff9900",
    borderWidth: 1,
    borderRadius: 20,
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
