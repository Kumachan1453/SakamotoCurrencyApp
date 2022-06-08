import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const UpDownButton = ({ onPress, buttonUpOrDown }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        {buttonUpOrDown === true && (
          <View style={styles.downBlue}>
            <Text style={styles.Text}>↓</Text>
          </View>
          // <Ionicons name="ios-arrow-down" size={60} color="blue" />
        )}
        {buttonUpOrDown === false && (
          <View style={styles.upRed}>
            <Text style={styles.Text}>↑</Text>
          </View>
          // <Ionicons name="ios-arrow-up" size={60} color="red" />
        )}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  downBlue: {
    backgroundColor: "#BAD3FF",
  },
  upRed: {
    backgroundColor: "#FFBBFF",
  },
  Text: {
    color: "black",
    fontSize: 35,
    textAlign: "center",
  },
});

export default UpDownButton;
