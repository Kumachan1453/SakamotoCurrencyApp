import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { FriendButton } from "../components/FriendButton";
import TextTemplateYourCoinRerated from "../components/TextTemplateYourCoinRerated";

export const Gift = () => {
  const HavingYourCoin = 10000;
  const YourCoinUsage = 20000;
  const FirstDay = "11/1";
  const LastDay = "11/30";
  const friendName = "damy-friend";
  const giftCoin = 2000;
  const timelimit = 3;
  const unit = "C";
  return (
    <ScrollView>
      <View style={styles.content}>
        <TextTemplateYourCoinRerated
          letter="あなたの所持コイン数"
          numberOfCoin={HavingYourCoin}
          unit="C"
        />
        <TextTemplateYourCoinRerated
          letter="あなたのコイン使用量"
          subText1="集計期間"
          date1={FirstDay}
          subText2="〜"
          date2={LastDay}
          numberOfCoin={YourCoinUsage}
          unit="C"
        />
        <View style={styles.line} />
        <Text style={styles.bigText}>コインが届いています</Text>
        <Text style={styles.subText}>
          ※送られた日から一週間以内に受け取らなければ消滅します
        </Text>
        <FriendButton
          friendName={friendName}
          coin={giftCoin}
          timelimit={timelimit}
          unit={unit}
        />
      </View>
    </ScrollView>
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
    margin: 20,
  },
});

export default Gift;
