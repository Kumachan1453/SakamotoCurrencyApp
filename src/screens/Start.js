import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "../components/Button";

export const Start = ({ navigation }) => {
  const startPush = () => {
    navigation.navigate("ScreenNavTab");
  };
  return (
    <View style={styles.konStart}>
      <Text style={styles.konStartText}>Konの世界にようこそ</Text>
      <Button content="はじめる" onPress={startPush} />
    </View>
  );
};
const styles = StyleSheet.create({
  konStart: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  konStartText: {
    fontWeight: "800",
    fontSize: 30,
    paddingBottom: 40,
  },
});

export default Start;
