import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ScreenNavTab } from "../screens/ScreenNavTab";
import { RegisterScreen } from "../screens/RegisterScreen";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../components/Firebase";
import { LoginScreen } from "./LoginScreen";
import { LoadingScreen } from "../components/LoadingScreen";

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
    return <LoadingScreen />;
  } else {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {user ? (
          <Stack.Screen name="ScreenNavTab" component={ScreenNavTab} />
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
