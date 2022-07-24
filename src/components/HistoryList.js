import React from "react";
import { StyleSheet, View, Text } from "react-native";
import LeafCoinMini from "./LeafCoinMini";

export const HistoryList = ({
  friendName,
  sontCoin,
  unit,
  time,
  sendOrGift,
}) => {
  return (
    <View style={styles.contents}>
      <View style={styles.contentsPlacement}>
        <Text
          style={styles.friendNameText}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {friendName}
        </Text>
        <View style={styles.rightPlacement}>
          <View style={styles.coinTextPlacement}>
            <Text
              style={sendOrGift === "+" ? styles.coinText : styles.redCointext}
            >
              {sendOrGift}
            </Text>
            <Text
              style={sendOrGift === "+" ? styles.coinText : styles.redCointext}
            >
              {sontCoin}
            </Text>
            {unit === true && <LeafCoinMini width={35} height={35} />}
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
    fontSize: 28,
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
    color: "green",
    fontSize: 25,
    marginRight: 3,
    top: 3,
  },
  redCointext: {
    justifyContent: "center",
    textAlign: "right",
    color: "red",
    fontSize: 25,
    marginRight: 3,
    top: 3,
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
