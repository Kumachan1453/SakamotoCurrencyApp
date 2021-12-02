import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ScreenNavStack } from "./ScreenNavStack";
import { Home } from "./Home";
import { Ionicons } from "@expo/vector-icons";
import Gift from "./Gift";
import Ranking from "./Ranking";

const Tab = createBottomTabNavigator();

export const ScreenNavTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "ホーム") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "フレンド") {
            iconName = focused ? "ios-people" : "ios-people-outline";
          } else if (route.name === "ギフト") {
            iconName = focused ? "ios-gift" : "ios-gift-outline";
          } else if (route.name === "ランキング") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: [{ display: "flex" }],
      })}
    >
      <Tab.Screen
        name="ホーム"
        component={Home}
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
      <Tab.Screen
        name="フレンド"
        component={ScreenNavStack}
        options={{
          headerShown: false,
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
      <Tab.Screen
        name="ギフト"
        component={Gift}
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
      <Tab.Screen
        name="ランキング"
        component={Ranking}
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
    </Tab.Navigator>
  );
};

export default ScreenNavTab;
