import React from "react";
import { StyleSheet, View, Text } from "react-native";

export const Warning = ({ letter }) => {
  return (
    <View style={styles.warning}>
      <Text style={styles.warningText}>{letter}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  warning: {
    padding: 10,
  },
  warningText: {
    color: "red",
    fontSize: 12,
  },
});
