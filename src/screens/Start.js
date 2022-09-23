import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "../components/Button";
import { start, startKon } from "../components/SupportedLanguages";

export const Start = ({ navigation }) => {
  const startPush = () => {
    navigation.navigate("ScreenNavTab");
  };
  return (
    <View style={styles.konStart}>
      <Text style={styles.konStartText}>{startKon}</Text>
      <Button content={start} onPress={startPush} />
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
