import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export const LongRedButton = ({ onPress, letter }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.touchableOpacity}>
        <Text style={styles.textLogOut}>{letter}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  touchableOpacity: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    padding: 10,
    backgroundColor: "#F15B5B",
    borderRadius: 10,
    width: 270,
    height: 70,
  },
  textLogOut: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
});

export default LongRedButton;
