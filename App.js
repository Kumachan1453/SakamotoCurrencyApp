import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Onboarding from "./src/screens/Onboarding";
// import Ranking from "./src/screens/Ranking";
// import Home from "./src/screens/Home";
import ScreenNavTab from "./src/screens/ScreenNavTab";

export default function App() {
  return (
    <NavigationContainer>
      <Onboarding />
    </NavigationContainer>
  );
}
