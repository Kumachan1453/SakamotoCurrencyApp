import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

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
          <View style={styles.true}>
            <Text style={styles.TrueText}>{trueText}</Text>
          </View>
        )}
        {buttonTrueOrFalse === false && (
          <View style={styles.false}>
            <Text style={styles.FalseText}>{falseText}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  true: {
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "orange",
  },
  false: {
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "gainsboro",
  },
  TrueText: {
    color: "white",
    fontSize: 35,
    textAlign: "center",
  },
  FalseText: {
    color: "gray",
    fontSize: 35,
    textAlign: "center",
  },
});

export default TrueOrFalseButton;
