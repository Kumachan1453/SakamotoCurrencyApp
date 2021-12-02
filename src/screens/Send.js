import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { Button } from "../components/Button";
import TextTemplateYourCoinRerated from "../components/TextTemplateYourCoinRerated";

export const Send = () => {
  const HavingYourCoin = 10000;
  const YourCoinUsage = 20000;
  const FirstDay = "11/1";
  const LastDay = "11/30";
  const HavingYourCoinAfterSending = 1000;

  return (
    <View style={styles.content}>
      <TextTemplateYourCoinRerated
        letter="あなたの所持コイン数"
        numberOfCoin={HavingYourCoin}
        unit="C"
      />
      <View style={styles.line} />
      <Text style={styles.bigText}>あなたが送るコインの額</Text>
      <View style={styles.flexDirectionRow}>
        <TextInput style={styles.input} placeholder="数字を入力" />
        <Text style={styles.bigCoinText}>C</Text>
      </View>
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
      <View style={styles.flexDirectionRow}>
        <Text style={styles.bigText}>残額</Text>
        <Text style={styles.bigCoinText}>{HavingYourCoinAfterSending}</Text>
        <Text style={styles.bigCoinText}>C</Text>
      </View>
      <View style={styles.borderLine} />
      <Button content="コインを送る" />
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
    marginTop: 17,
    marginBottom: 30,
  },
  input: {
    width: 230,
    height: 40,
    borderBottomWidth: 1,
    borderColor: "gray",
    padding: 10,
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
  borderLine: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "gray",
    marginBottom: 50,
  },
});

export default Send;
