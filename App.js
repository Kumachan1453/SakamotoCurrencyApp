import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
// import { FriendList } from "./src/screens/FriendList";
// import { ScreenNavStack } from "./src/screens/ScreenNavStack";
import { ScreenNavTab } from "./src/screens/ScreenNavTab";

export default function App() {
  return (
    <NavigationContainer>
      <ScreenNavTab />
    </NavigationContainer>
  );
}
