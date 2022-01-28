// import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ScreenNavTab } from "./src/screens/ScreenNavTab";
// import { RegisterScreen } from "./src/screens/RegisterScreen";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./src/components/Firebase";

const Stack = createNativeStackNavigator();

// export default function App() {
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         console.log(user);
//       }
//     });
//     return () => unsubscribe();
//   }, []);
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Register" component={RegisterScreen} />
//         <Stack.Screen name="ScreenNavTab" component={ScreenNavTab} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
export default function App() {
  return (
    // <RegisterScreen />
    <NavigationContainer>
      <ScreenNavTab />
    </NavigationContainer>
  );
}
