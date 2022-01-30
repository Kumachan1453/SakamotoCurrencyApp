// import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { ScreenNavTab } from "./src/screens/ScreenNavTab";
import { Test } from "../screens/Test";
import { RegisterScreen } from "../screens/RegisterScreen";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../components/Firebase";

const Stack = createNativeStackNavigator();

export const Onboarding = () => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        console.log(user);
        setUser(user);
      } else {
        setUser("");
      }
    });
    return () => unsubscribe();
  }, []);
  if (loading) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Test" component={Test} />
        ) : (
          <Stack.Screen name="Register" component={RegisterScreen} />
        )}
      </Stack.Navigator>
    );
  }
};

export default Onboarding;
