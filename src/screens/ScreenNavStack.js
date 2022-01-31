import React from "react";
import { FriendList } from "./FriendList";
import { Send } from "./Send";
import { useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  getFirestore,
  getDocs,
  doc,
  updateDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import { db } from "../components/Firebase";

const Stack = createNativeStackNavigator();

const getData = async () => {
  const getDatas = collection(db, "users");
  const querySnapshot = await getDocs(getDatas);
  console.log("querySnapshot", querySnapshot);
};
getData();

export const ScreenNavStack = () => {
  const route = useRoute();
  return (
    <Stack.Navigator initialRouteName="FriendList">
      <Stack.Screen
        name="FriendList"
        component={FriendList}
        options={{
          headerShown: true,
          title: "フレンド",
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
          title: `${route.params}にコインを送る`, // 「route.params.name」は読み込まれていない
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
