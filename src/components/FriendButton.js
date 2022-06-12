import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const FriendButton = ({
  disabled,
  friendName,
  onPress,
  coin,
  unit,
  ranking,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={disabled ? styles.trueFriendButton : styles.falseFriendButton}
      disabled={disabled}
    >
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

const styles = StyleSheet.create({
  falseFriendButton: {
    width: "95%",
    height: 80,
    margin: 10,
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
  trueFriendButton: {
    width: "95%",
    height: 80,
    margin: 10,
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
    backgroundColor: "#EEEEEE",
  },
  contentsPlacement: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rightPlacement: {
    justifyContent: "center",
  },
  leftPlacement: {
    flexDirection: "row",
    alignItems: "center",
  },
  friendNameText: {
    fontSize: 26,
    marginLeft: 10,
  },
  listStyleText: {
    fontSize: 22,
    fontWeight: "400",
    marginLeft: 10,
    marginRight: 20,
  },
  coinTextPlacement: {
    flexDirection: "row",
  },
  coinText: {
    justifyContent: "center",
    textAlign: "right",
    color: "gray",
    fontSize: 20,
    marginRight: 3,
  },
  medalIcon: {
    padding: 10,
  },
});

export default FriendButton;
