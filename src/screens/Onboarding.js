import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ScreenNavTab } from "../screens/ScreenNavTab";
import { RegisterScreen } from "../screens/RegisterScreen";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../components/Firebase";
import { LoginScreen } from "./LoginScreen";
import { LoadingScreen } from "../components/LoadingScreen";
import Start from "./Start";

const Stack = createNativeStackNavigator();

export const Onboarding = () => {
  const [getUser, setGetUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setGetUser(user);
      } else {
        setGetUser("");
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  } else {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {getUser ? (
          <>
            <Stack.Screen name="Start" component={Start} />
            <Stack.Screen name="ScreenNavTab" component={ScreenNavTab} />
          </>
        ) : (
          <>
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        )}
      </Stack.Navigator>
    );
  }
};

export default Onboarding;
