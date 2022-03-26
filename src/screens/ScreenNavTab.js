import React, { useState, useLayoutEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ScreenNavStack } from "./ScreenNavStack";
import { Home } from "./Home";
import { Ionicons } from "@expo/vector-icons";
import Gift from "./Gift";
import Ranking from "./Ranking";
// import {
//   getFirestore,
//   collection,
//   getDoc,
//   getDocs,
//   doc,
//   updateDoc,
// } from "firebase/firestore";
// import { db } from "../components/Firebase";
// import { useEffect } from "react/cjs/react.development";

const Tab = createBottomTabNavigator();

export const ScreenNavTab = () => {
  // const [coinOwnership, setCoinOwnership] = useState(0);
  // const [monthlyCoinUsage, setMonthlyCoinUsage] = useState(0);
  // const [updateNumber, setUpdateNumber] = useState(0);

  const today = new Date();
  const firstDay = today.getDate() === 1;
  const onMinutes = today.getMinutes() === 50;
  const offMinutes = today.getMinutes() === 19;
  const onHours = today.getHours() === 9;
  const offHours = today.getHours() === 9;

  const [onHours2, setOnHours2] = useState(onHours);

  //日付による更新の処理　【削除禁止】
  // const monthlyUpdate = async () => {
  //   const getData = doc(db, "users", "LGXdrQNczf95rT90Tp2R");
  //   const snapData = await getDoc(getData);
  //   if (onHours && snapData.data().updateNumber < 1) {
  //     useEffect(() => {
  //       setCoinOwnership(
  //         snapData.data().coinOwnership * 0.9 +
  //           snapData.data().monthlyCoinUsage * 0.05
  //       );
  //       setMonthlyCoinUsage(0);
  //       setUpdateNumber(snapData.data().updateNumber + 1);
  //       // updateDoc(getData, {
  //       //   coinOwnership:
  //       //     snapData.data().coinOwnership * 0.9 +
  //       //     snapData.data().monthlyCoinUsage * 0.05,
  //       //   monthlyCoinUsage: (snapData.data().monthlyCoinUsage = 0),
  //       //   updateNumber: snapData.data().updateNumber + 1,
  //       // });
  //     }, onHours);
  //   } else if (offHours && snapData.data().updateNumber === 1) {
  //     useEffect(() => {
  //       updateDoc(getData, {
  //         updateNumber: snapData.data().updateNumber - 1,
  //       });
  //     });
  //   }
  // };
  // monthlyUpdate();

  // useLayoutEffect(() => {
  //   const monthlyUpdate = async () => {
  //     const getData = doc(db, "users", "LGXdrQNczf95rT90Tp2R");
  //     const snapData = await getDoc(getData);
  //     if (onHours && snapData.data().updateNumber < 1) {
  //       updateDoc(getData, {
  //         coinOwnership:
  //           snapData.data().coinOwnership * 0.9 +
  //           snapData.data().monthlyCoinUsage * 0.05,
  //         monthlyCoinUsage: (snapData.data().monthlyCoinUsage = 0),
  //         updateNumber: snapData.data().updateNumber + 1,
  //       });
  //     } else if (offHours && offMinutes && snapData.data().updateNumber === 1) {
  //       updateDoc(getData, {
  //         updateNumber: snapData.data().updateNumber - 1,
  //       });
  //     }
  //   };
  //   monthlyUpdate();
  // }, []);
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
