import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { FriendSendButton } from "../components/FriendSendButton";

export const FriendList = ({ navigation }) => {
  const HavingYourCoins = 10000;
  const YourCoinUsage = 20000;
  const FirstDay = "11/1";
  const LastDay = "11/30";
  const content = "damy-friend";
  return (
    <View style={styles.content}>
      <Text style={styles.bigText}>あなたの所持するコイン</Text>
      <View style={styles.flexDirectionRow}>
        <Text style={styles.bigCoinText}>{HavingYourCoins}</Text>
        <Text style={styles.bigCoinText}>C</Text>
      </View>
      <Text style={styles.bigText}>あなたのコイン使用量</Text>
      <View style={styles.flexDirectionRow}>
        <Text style={styles.subText}>集計期間</Text>
        <Text style={styles.subText}>{FirstDay}</Text>
        <Text style={styles.subText}>〜</Text>
        <Text style={styles.subText}>{LastDay}</Text>
      </View>
      <View style={styles.flexDirectionRow}>
        <Text style={styles.bigCoinText}>{YourCoinUsage}</Text>
        <Text style={styles.bigCoinText}>C</Text>
      </View>
      <View style={styles.line} />
      <TouchableOpacity onPress={() => navigation.navigate("Send")}>
        <FriendSendButton content={content} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
  },
  bigText: {
    fontWeight: "bold",
    fontSize: 20,
    margin: 10,
    marginTop: 20,
  },
  bigCoinText: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
    marginBottom: 30,
  },
  subText: {
    color: "#808080",
  },
  flexDirectionRow: {
    flexDirection: "row",
  },
  line: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "gray",
  },
});

export default FriendList;
