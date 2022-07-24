import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const LoadingScreen = () => {
  return (
    <View style={styles.loadingScreen}>
      <Text>Loading...</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  loadingScreen: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default LoadingScreen;
