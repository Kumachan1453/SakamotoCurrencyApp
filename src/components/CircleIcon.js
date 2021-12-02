import React from "react";
import { StyleSheet, View } from "react-native";

export const CircleIcon = () => {
  return <View style={styles.circle} />;
};

const styles = StyleSheet.create({
  circle: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#BBBBBB",
    backgroundColor: "#DDDDDD",
  },
});

export default CircleIcon;
