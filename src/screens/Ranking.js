import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { FriendButton } from "../components/FriendButton";
import TextTemplateYourCoinRerated from "../components/TextTemplateYourCoinRerated";

export const Ranking = () => {
  const FirstDay = "11/1";
  const LastDay = "11/30";
  const YourCoinUsage = 20000;
  const friendName = "damy-friend";
  const sumUsageCoin = 40000000;
  const unit = "C";
  return (
    <ScrollView>
      <View style={styles.content}>
        <TextTemplateYourCoinRerated
          letter="月間使用量ランキング"
          subText1="集計期間"
          date1={FirstDay}
          subText2="〜"
          date2={LastDay}
        />
        <View style={styles.line} />
        <FriendButton friendName={friendName} coin={sumUsageCoin} unit={unit} />
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
    margin: 30,
  },
});

export default Ranking;
