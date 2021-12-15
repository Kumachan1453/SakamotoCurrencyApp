import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { FriendButton } from "../components/FriendButton";
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

export const FriendList = ({ navigation }) => {
  const HavingYourCoin = 10000;
  const YourCoinUsage = 20000;
  const FirstDay = "11/1";
  const LastDay = "11/30";
  const friendName = "damy-friend";

  const [coinOwnership, setCoinOwnership] = useState(0);
  const [monthlyCoinUsage, setMonthlyCoinUsage] = useState(0);

  const getYourServerData = async () => {
    const getData = doc(db, "users", "LGXdrQNczf95rT90Tp2R");
    const snapData = await getDoc(getData);
    setCoinOwnership(snapData.data().coinOwnership);
    setMonthlyCoinUsage(snapData.data().monthlyCoinUsage);
  };
  getYourServerData();

  return (
    <ScrollView>
      <View style={styles.content}>
        <TextTemplateYourCoinRerated
          letter="あなたの所持コイン"
          numberOfCoin={coinOwnership}
          unit="C"
        />
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
        <FriendButton
          friendName={friendName}
          onPress={() => navigation.navigate("Send")}
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
  },
});

export default FriendList;
