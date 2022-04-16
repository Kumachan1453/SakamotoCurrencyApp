import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import CircleIcon from "./CircleIcon";

export const FriendButton = ({
  friendName,
  onPress,
  coin,
  unit,
  ranking,
  time,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.friendButton}>
      <View>
        <View style={styles.contentsPlacement}>
          <Text style={styles.listStyleText}>{ranking}</Text>
          {/* <CircleIcon /> */}
          <Text style={styles.friendNameText}>{friendName}</Text>
          <View style={styles.coinTextPlacement}>
            <Text style={styles.coinText}>{coin}</Text>
            <Text style={styles.coinText}>{unit}</Text>
          </View>
        </View>
        <View>
          <Text>{time}</Text>
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
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    flexDirection: "row",
  },
  contentsPlacement: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  // circleIconPlacement: {
  //   marginTop: 20,
  // },
  friendNameText: {
    fontSize: 28,
  },
  listStyleText: {
    fontSize: 22,
    fontWeight: "400",
    marginLeft: 10,
    marginRight: 20,
  },
  coinTextPlacement: {
    flexDirection: "row",
    margin: 30,
  },
  coinText: {
    // display: "flex",
    // justifyContent: "flex-end",
    textAlign: "right",
    color: "gray",
  },
});

export default FriendButton;
