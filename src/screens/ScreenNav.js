import React from "react";
import { FriendList } from "../screens/FriendList";
import { Send } from "../screens/Send";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import FriendList from "./FriendList";
// import Send from "./Send";

const Stack = createNativeStackNavigator();

export const ScreenNav = () => {
  return (
    <Stack.Navigator initialRouteName="HOME">
      <Stack.Screen
        name="HOME"
        component={FriendList}
        options={{
          headerShown: true,
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
        name="Send"
        component={Send}
        options={{
          headerShown: true,
          title: "damy-friend" + "にコインを送る",
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

export default ScreenNav;
