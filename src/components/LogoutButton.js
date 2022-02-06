import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export const LogoutButton = ({ onPress }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.touchableOpacity}>
        <Text style={styles.textLogOut}>ログアウト</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  touchableOpacity: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#88cb7f",
    borderRadius: 10,
    width: 100,
  },
  textLogOut: {
    color: "white",
  },
});

export default LogoutButton;
