import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import LogoutButton from "../components/LogoutButton";
import { signOut } from "firebase/auth";
import { auth } from "../components/Firebase";

export const Test = () => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };
  return (
    <View>
      <Text>test-home</Text>
      <LogoutButton onPress={handleLogout} />
    </View>
  );
};

export default Test;
