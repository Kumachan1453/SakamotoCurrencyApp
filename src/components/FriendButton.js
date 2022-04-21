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
      <View style={styles.flexDirectionRow}>
        <View style={styles.contentsPlacement}>
          <View style={styles.leftPlacement}>
            <Text style={styles.listStyleText}>{ranking}</Text>
            <Text style={styles.friendNameText}>{friendName}</Text>
          </View>
          <View style={styles.rightPlacement}>
            <View style={styles.coinTextPlacement}>
              <Text style={styles.coinText}>{coin}</Text>
              <Text style={styles.coinText}>{unit}</Text>
            </View>
          </View>
        </View>
        {/* <View>
          <Text>{time}</Text>
        </View> */}
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
    backgroundColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    justifyContent: "center",
  },
  contentsPlacement: {
    flexDirection: "row",
    // alignItems: "center",
    backgroundColor: "lightgreen",
  },
  rightPlacement: {
    justifyContent: "center",
  },
  leftPlacement: {
    flexDirection: "row",
    alignItems: "center",
    // marginLeft: 10,
    backgroundColor: "lightblue",
    // justifyContent: "flex-end",
  },
  // circleIconPlacement: {
  //   marginTop: 20,
  // },
  friendNameText: {
    fontSize: 28,
    backgroundColor: "pink",
  },
  listStyleText: {
    fontSize: 22,
    fontWeight: "400",
    marginLeft: 10,
    marginRight: 20,
  },
  coinTextPlacement: {
    // flexDirection: "row",
    // width: 200,
    // marginRight: 5,
    backgroundColor: "tomato",
    // alignItems: "stretch",
    // justifyContent: "center",
  },
  coinText: {
    // display: "flex",
    // justifyContent: "flex-end",
    justifyContent: "center",
    textAlign: "right",
    color: "gray",
  },
});

export default FriendButton;
