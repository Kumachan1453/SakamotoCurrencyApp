import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ScreenNavStack } from "./ScreenNavStack";
import { Home } from "./Home";
import { Ionicons } from "@expo/vector-icons";
import Gift from "./Gift";
import Ranking from "./Ranking";
import History from "./History";
import {
  friendScreen,
  giftScreen,
  historyScreen,
  homeScreen,
  rankingScreen,
} from "../components/SupportedLanguages";

const Tab = createBottomTabNavigator();

export const ScreenNavTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === homeScreen) {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === friendScreen) {
            iconName = focused ? "ios-people" : "ios-people-outline";
          } else if (route.name === giftScreen) {
            iconName = focused ? "ios-gift" : "ios-gift-outline";
          } else if (route.name === rankingScreen) {
            iconName = focused ? "ios-list" : "ios-list-outline";
          } else if (route.name === historyScreen) {
            iconName = focused ? "ios-map" : "ios-map-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: [{ display: "flex" }],
      })}
    >
      <Tab.Screen
        name={homeScreen}
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
        name={friendScreen}
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
        name={giftScreen}
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
        name={rankingScreen}
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
      <Tab.Screen
        name={historyScreen}
        component={History}
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
