import React from "react";
import { StyleSheet, View, Text, TextInput, ScrollView } from "react-native";
import CircleIcon from "../components/CircleIcon";
import TextInputTemplate from "../components/TextInputTemplate";
import TextTemplateYourCoinRerated from "../components/TextTemplateYourCoinRerated";

export const Home = () => {
  const HavingYourCoin = 10000;
  const YourCoinUsage = 20000;
  const YourRank = 4;
  const FirstDay = "11/1";
  const LastDay = "11/30";
  return (
    <ScrollView>
      <View style={styles.content}>
        <CircleIcon style={styles.CircleIconPlacement} />
        <Text style={styles.headingText}>ユーザー名</Text>
        <TextInputTemplate placeholder={"名前（ニックネーム）を入力"} />
        <Text style={styles.headingText}>自己紹介</Text>
        <TextInputTemplate placeholder={"文字を入力"} />
        <Text style={styles.headingText}>自由記入欄</Text>
        <TextInput style={styles.textBox} placeholder="文字を入力" multiline />
        <View style={styles.line} />
        <TextTemplateYourCoinRerated
          letter="あなたの所持コイン数"
          numberOfCoin={HavingYourCoin}
          unit="C"
        />
        <View style={styles.line} />
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
        <TextTemplateYourCoinRerated
          letter="あなたの順位"
          subText1="集計期間"
          date1={FirstDay}
          subText2="〜"
          date2={LastDay}
          numberOfCoin={YourRank}
          unit="位"
        />
        <View style={styles.line} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
  },
  CircleIconPlacement: {
    marginTop: 30,
  },
  textBox: {
    width: 230,
    height: 60,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 15,
  },
  headingText: {
    fontWeight: "bold",
    fontSize: 13,
    marginTop: 20,
    marginBottom: 10,
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
    marginTop: 20,
  },
});

export default Home;
