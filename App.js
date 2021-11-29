import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
// import { FriendList } from "./src/screens/FriendList";
import { ScreenNav } from "./src/screens/ScreenNav";

export default function App() {
  return (
    <NavigationContainer>
      <ScreenNav />
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
