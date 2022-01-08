import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, FlatList } from "react-native";
import { FriendButton } from "../components/FriendButton";
import TextTemplateYourCoinRerated from "../components/TextTemplateYourCoinRerated";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDoc,
  getDocs,
  collection,
  doc,
} from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";

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
  const FirstDay = "11/1";
  const LastDay = "11/30";
  // const friendName = "damy-friend";

  const [coinOwnership, setCoinOwnership] = useState(0);
  const [monthlyCoinUsage, setMonthlyCoinUsage] = useState(0);

  const [listData, setListData] = useState([]);

  const isFocused = useIsFocused();

  useEffect(async () => {
    const getDatas = collection(db, "users");
    const querySnapshot = await getDocs(getDatas);
    const array = [];
    querySnapshot.forEach((doc) => {
      array.push(doc.data().name);
    });
    setListData(array);
  }, []);

  useEffect(async () => {
    const getData = doc(db, "users", "LGXdrQNczf95rT90Tp2R");
    const snapData = await getDoc(getData);
    setCoinOwnership(Math.round(snapData.data().coinOwnership));
    setMonthlyCoinUsage(Math.round(snapData.data().monthlyCoinUsage));
  }, [isFocused]);

  return (
    <View>
      <View style={styles.content}>
        {/* <TextTemplateYourCoinRerated
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
        <View style={styles.line} /> */}
        <FlatList
          data={listData}
          renderItem={({ item }) => {
            console.log("item", item);
            return (
              <FriendButton
                friendName={item}
                onPress={() => navigation.navigate("Send")}
              />
            );
          }}
          keyExtractor={(index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    height: "100%",
    // justifyContent: "center",
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
