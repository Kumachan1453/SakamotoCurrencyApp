// // import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Onboarding from "./src/screens/Onboarding";

export default function App() {
  return (
    // <RegisterScreen />
    <NavigationContainer>
      <Onboarding />
    </NavigationContainer>
  );
}
