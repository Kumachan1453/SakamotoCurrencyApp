import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, ScrollView } from "react-native";
import CircleIcon from "../components/CircleIcon";
import TextInputTemplate from "../components/TextInputTemplate";
import TextTemplateYourCoinRerated from "../components/TextTemplateYourCoinRerated";
import LogoutButton from "../components/LogoutButton";
import { getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../components/Firebase";
import { db } from "../components/Firebase";
import { useIsFocused } from "@react-navigation/native";

export const Home = () => {
  const FirstDay = "11/1";
  const LastDay = "11/30";

  const [coinOwnership, setCoinOwnership] = useState(0);
  const [monthlyCoinUsage, setMonthlyCoinUsage] = useState(0);
  const [ranking, setRanking] = useState("ランク外");

  const isFocused = useIsFocused();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log("user.uid", user.uid);
    } else {
      console.log("else");
    }
  });

  useEffect(async () => {
    const getData = doc(db, "users", "LGXdrQNczf95rT90Tp2R");
    const snapData = await getDoc(getData);
    setCoinOwnership(Math.round(snapData.data().coinOwnership));
    setMonthlyCoinUsage(Math.round(snapData.data().monthlyCoinUsage));
    setRanking(Math.round(snapData.data().ranking));
  }, [isFocused]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("logout");
      })
      .catch((error) => {
        console.log("error.message", error.message);
      });
  };

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
        <View>
          <LogoutButton onPress={handleLogout} />
        </View>
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
