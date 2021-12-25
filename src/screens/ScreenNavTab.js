import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ScreenNavStack } from "./ScreenNavStack";
import { Home } from "./Home";
import { Ionicons } from "@expo/vector-icons";
import Gift from "./Gift";
import Ranking from "./Ranking";
import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6srd7jvN3hCW5gFLc9yniGimACFTeni4",
  authDomain: "sakamotocurrencyapp.firebaseapp.com",
  projectId: "sakamotocurrencyapp",
  storageBucket: "sakamotocurrencyapp.appspot.com",
  messagingSenderId: "367955895931",
  appId: "1:367955895931:web:7041aac36e6138ddf764de",
  measurementId: "${config.measurementId}",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Tab = createBottomTabNavigator();

export const ScreenNavTab = () => {
  const [coinOwnership, setCoinOwnership] = useState(0);
  const [monthlyCoinUsage, setMonthlyCoinUsage] = useState(0);
  const [updateNumber, setUpdateNumber] = useState(0);

  const getYourServerData = async () => {
    const getData = doc(db, "users", "LGXdrQNczf95rT90Tp2R");
    const snapData = await getDoc(getData);
    setCoinOwnership(snapData.data().coinOwnership);
    setMonthlyCoinUsage(snapData.data().monthlyCoinUsage);
    setUpdateNumber(snapData.data().updateNumber);
  };
  getYourServerData();

  //日付による更新の処理　【削除禁止】
  const today = new Date();
  const firstDay = today.getDate() === 1;
  const minutes = today.getMinutes() === 2;
  const onHours = today.getHours() === 17;
  const offHours = today.getHours() === 18;

  const monthlyUpdate = async () => {
    const getData = doc(db, "users", "LGXdrQNczf95rT90Tp2R");
    const snapData = await getDoc(getData);
    if (onHours && snapData.data().updateNumber < 1) {
      updateDoc(getData, {
        coinOwnership:
          snapData.data().coinOwnership * 0.9 +
          snapData.data().monthlyCoinUsage * 0.05,
        monthlyCoinUsage: (snapData.data().monthlyCoinUsage = 0),
        updateNumber: snapData.data().updateNumber + 1,
      });
    } else if (offHours && snapData.data().updateNumber === 1) {
      updateDoc(getData, {
        updateNumber: snapData.data().updateNumber - 1,
      });
    }
  };
  monthlyUpdate();
  //ここまで

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
