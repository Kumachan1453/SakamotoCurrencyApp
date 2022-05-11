import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import CircleIcon from "./CircleIcon";
import { Ionicons } from "@expo/vector-icons";

export const FriendButton = ({ friendName, onPress, coin, unit, ranking }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.friendButton}>
      <View style={styles.contentsPlacement}>
        <View style={styles.leftPlacement}>
          {ranking === 3 && (
            <Ionicons
              name="ios-medal"
              size={30}
              color="#ac6b25"
              style={styles.medalIcon}
            />
          )}
          {ranking === 2 && (
            <Ionicons
              name="ios-medal"
              size={30}
              color="silver"
              style={styles.medalIcon}
            />
          )}
          {ranking === 1 && (
            <Ionicons
              name="ios-medal"
              size={30}
              color="gold"
              style={styles.medalIcon}
            />
          )}
          {ranking > 3 && <Text style={styles.listStyleText}>{ranking}</Text>}
          <Text style={styles.friendNameText}>{friendName}</Text>
        </View>
        <View style={styles.rightPlacement}>
          <View style={styles.coinTextPlacement}>
            <Text style={styles.coinText}>{coin}</Text>
            <Text style={styles.coinText}>{unit}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// このスタイル内に問題がある。
const styles = StyleSheet.create({
  friendButton: {
    width: "95%",
    height: 80,
    margin: 10,
    // backgroundColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    justifyContent: "center",
  },
  contentsPlacement: {
    flexDirection: "row",
    // backgroundColor: "lightgreen",
    justifyContent: "space-between",
  },
  rightPlacement: {
    justifyContent: "center",
  },
  leftPlacement: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "lightblue",
  },
  friendNameText: {
    fontSize: 28,
    // backgroundColor: "pink",
  },
  listStyleText: {
    fontSize: 22,
    fontWeight: "400",
    marginLeft: 10,
    marginRight: 20,
  },
  coinTextPlacement: {
    flexDirection: "row",
    // backgroundColor: "tomato",
  },
  coinText: {
    justifyContent: "center",
    textAlign: "right",
    color: "gray",
    fontSize: 25,
    marginRight: 3,
  },
  medalIcon: {
    padding: 10,
  },
});

export default FriendButton;
