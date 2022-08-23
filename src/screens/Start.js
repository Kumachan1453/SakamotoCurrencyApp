import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "../components/Button";

export const Start = ({ navigation }) => {
  return (
    <View style={styles.konStart}>
      <Text>Konの世界にようこそ</Text>
      <Button
        content="はじめる"
        onPress={() => navigation.navigate("ScreenNavTab")}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  konStart: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default Start;
