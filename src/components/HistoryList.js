import React from "react";
import { StyleSheet, View, Text } from "react-native";

export const HistoryList = ({ friendName, sontCoin, unit, time }) => {
  return (
    <View style={styles.contents}>
      <View style={styles.contentsPlacement}>
        <Text style={styles.friendNameText}>{friendName}</Text>
        <View style={styles.rightPlacement}>
          <View style={styles.coinTextPlacement}>
            <Text style={styles.coinText}>{sontCoin}</Text>
            <Text style={styles.coinText}>{unit}</Text>
          </View>
          <View>
            <Text style={styles.timeText}>{time}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contents: {
    borderColor: "black",
    borderBottomWidth: 1,
    height: 80,
    justifyContent: "center",
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
    fontSize: 40,
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
    justifyContent: "flex-end",
    marginRight: 10,
  },
  coinText: {
    justifyContent: "center",
    textAlign: "right",
    color: "gray",
    fontSize: 25,
    marginRight: 3,
  },
  timeText: {
    justifyContent: "center",
    textAlign: "right",
    color: "gray",
    fontSize: 15,
    marginTop: 10,
    marginRight: 10,
  },
});

export default HistoryList;
