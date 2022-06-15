import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const TrueOrFalseButton = ({
  onPress,
  buttonTrueOrFalse,
  trueText,
  falseText,
}) => {
  return (
    <View style={styles.content}>
      <TouchableOpacity onPress={onPress} style={styles.ButtonSize}>
        {buttonTrueOrFalse === true && (
          <View style={styles.Blue}>
            <Text style={styles.Text}>{trueText}</Text>
          </View>
          // <Ionicons name="ios-arrow-down" size={60} color="blue" />
        )}
        {buttonTrueOrFalse === false && (
          <View style={styles.Red}>
            <Text style={styles.Text}>{falseText}</Text>
          </View>
          // <Ionicons name="ios-arrow-up" size={60} color="red" />
        )}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  content: {
    width: "100%",
  },
  ButtonSize: {
    width: "100%",
  },
  Blue: {
    backgroundColor: "#BAD3FF",
    borderColor: "gray",
    borderWidth: 1,
  },
  Red: {
    backgroundColor: "#FFBBFF",
    borderColor: "gray",
    borderWidth: 1,
  },
  Text: {
    color: "black",
    fontSize: 35,
    textAlign: "center",
  },
});

export default TrueOrFalseButton;
