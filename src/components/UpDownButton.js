import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const UpDownButton = ({ onPress, buttonUpOrDown }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        {!onPress && <Ionicons name="ios-arrow-down" size={60} color="blue" />}
        {onPress && <Ionicons name="ios-arrow-up" size={60} color="red" />}
      </TouchableOpacity>
    </View>
  );
};

export default UpDownButton;
