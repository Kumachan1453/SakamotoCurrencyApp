import React from "react";
import { FriendList } from "./FriendList";
import { Send } from "./Send";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { friendScreen, sendScreen } from "../components/SupportedLanguages";

const Stack = createNativeStackNavigator();

export const ScreenNavStack = () => {
  return (
    <Stack.Navigator initialRouteName="FriendList">
      <Stack.Screen
        name="FriendList"
        component={FriendList}
        options={{
          headerShown: true,
          title: friendScreen,
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
          title: sendScreen,
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

export default ScreenNavStack;
