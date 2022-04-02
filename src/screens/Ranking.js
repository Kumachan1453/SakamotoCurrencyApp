import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { FriendButton } from "../components/FriendButton";
import TextTemplateYourCoinRerated from "../components/TextTemplateYourCoinRerated";
import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  collection,
} from "firebase/firestore";
import { db } from "../components/Firebase";
import { useIsFocused } from "@react-navigation/native";
import { onAuthStateChanged, signOut, getAuth } from "firebase/auth";
import { async } from "@firebase/util";

export const Ranking = () => {
  const isFocused = useIsFocused();
  const getUserProfile = getAuth();
  const user = getUserProfile.currentUser;
  const email = user.email;

  const FirstDay = "11/1";
  const LastDay = "11/30";
  const [coinOwnership, setCoinOwnership] = useState(0);
  const [monthlyCoinUsage, setMonthlyCoinUsage] = useState(0);
  const [rankingListData, setRankingListData] = useState([]);
  const [ranking, setRanking] = useState(0);
  useEffect(async () => {
    const getDatas = collection(db, "users");
    const rankingQuerySnapshot = await getDocs(getDatas);
    const rankingArray = [];
    rankingQuerySnapshot.forEach((docs) => {
      rankingArray.push({
        ranking: docs.data().ranking,
        name: docs.data().name,
        monthlyCoinUsage: docs.data().monthlyCoinUsage,
        id: docs.id,
      });
    });
    setRankingListData(rankingArray);
  }, []);

  useEffect(async () => {
    const getCollection = await getDocs(collection(db, "users"));
    const array = [];
    getCollection.forEach((docs) => {
      array.push({ email: docs.data().email, id: docs.id });
    });
    const loginFilter = array.filter((login) => {
      return email === login.email;
    });
    const getData = doc(db, "users", loginFilter[0].id);
    const snapData = await getDoc(getData);
    setCoinOwnership(Math.round(snapData.data().coinOwnership));
    setMonthlyCoinUsage(Math.round(snapData.data().monthlyCoinUsage));
    setRanking(Math.round(snapData.data().ranking));
  }, [isFocused]);

  rankingListData.monthlyCoinUsage = rankingListData.sort((a, b) => {
    const x = a["monthlyCoinUsage"];
    const y = b["monthlyCoinUsage"];
    if (x > y) {
      return -1;
    }
    if (x < y) {
      return 1;
    }
    return 0;
  });
  let tmp;
  rankingListData.monthlyCoinUsage.forEach((item, index) => {
    if (item.monthlyCoinUsage !== tmp) {
      item.ranking = index + 1;
      tmp = item.monthlyCoinUsage;
    } else if (item.monthlyCoinUsage === tmp) {
      item.ranking = index;
    }
  });

  return (
    <View style={styles.content}>
      <FlatList
        data={rankingListData}
        renderItem={({ item }) => {
          return (
            <FriendButton
              ranking={item.ranking}
              friendName={item.name}
              coin={item.monthlyCoinUsage}
            />
          );
        }}
        keyExtractor={(item) => item.id}
      />
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
    margin: 30,
  },
});

export default Ranking;
