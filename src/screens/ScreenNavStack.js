import React from "react";
import { FriendList } from "./FriendList";
import { Send } from "./Send";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export const ScreenNavStack = () => {
  return (
    <Stack.Navigator initialRouteName="HOME">
      <Stack.Screen
        name="フレンドリスト"
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

export default ScreenNavStack;
