import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./Home";
import { History } from "./History";

const Stack = createNativeStackNavigator();

export const Setting = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          title: "ホーム",
          headerStyle: {
            backgroundColor: "#ff9900",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
      />
      <Stack.Screen
        name="History"
        component={History}
        options={{
          headerShown: true,
          title: "履歴",
          headerStyle: {
            backgroundColor: "#ff9900",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default Setting;
