import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, ScrollView } from "react-native";
import CircleIcon from "../components/CircleIcon";
import TextInputTemplate from "../components/TextInputTemplate";
import TextTemplateYourCoinRerated from "../components/TextTemplateYourCoinRerated";
import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6srd7jvN3hCW5gFLc9yniGimACFTeni4",
  authDomain: "sakamotocurrencyapp.firebaseapp.com",
  projectId: "sakamotocurrencyapp",
  storageBucket: "sakamotocurrencyapp.appspot.com",
  messagingSenderId: "367955895931",
  appId: "1:367955895931:web:7041aac36e6138ddf764de",
  measurementId: "${config.measurementId}",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const Home = () => {
  const YourRank = 4;
  const FirstDay = "11/1";
  const LastDay = "11/30";

  const [coinOwnership, setCoinOwnership] = useState(0);
  const [monthlyCoinUsage, setMonthlyCoinUsage] = useState(0);
  const [ranking, setRanking] = useState("ランク外");

  const getYourServerData = async () => {
    const getData = doc(db, "users", "LGXdrQNczf95rT90Tp2R");
    const snapData = await getDoc(getData);
    setCoinOwnership(snapData.data().coinOwnership);
    setMonthlyCoinUsage(snapData.data().monthlyCoinUsage);
    setRanking(snapData.data().ranking);
  };
  getYourServerData();

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
          numberOfCoin={coinOwnership}
          unit="C"
        />
        <View style={styles.line} />
        <TextTemplateYourCoinRerated
          letter="あなたのコイン使用量"
          subText1="集計期間"
          date1={FirstDay}
          subText2="〜"
          date2={LastDay}
          numberOfCoin={monthlyCoinUsage}
          unit="C"
        />
        <View style={styles.line} />
        <TextTemplateYourCoinRerated
          letter="あなたの順位"
          subText1="集計期間"
          date1={FirstDay}
          subText2="〜"
          date2={LastDay}
          numberOfCoin={ranking}
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
