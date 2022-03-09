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

export const Ranking = () => {
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

  const isFocused = useIsFocused();

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
      // const updateData = async () => {
      //   await updateDoc(collection(db, "users"), {
      //     ranking: item.ranking,
      //   });
      // };
      // updateData();
    }
    console.log(
      "item.ranking:",
      item.ranking,
      "tmp",
      tmp,
      ", item.name:",
      item.name,
      ", item.monthlyCoinUsage:",
      item.monthlyCoinUsage
    );
  });

  useEffect(async () => {
    const getData = doc(db, "users", "LGXdrQNczf95rT90Tp2R");
    const snapData = await getDoc(getData);
    setCoinOwnership(Math.round(snapData.data().coinOwnership));
    setMonthlyCoinUsage(Math.round(snapData.data().monthlyCoinUsage));
    setRanking(Math.round(snapData.data().ranking));
  }, [isFocused]);

  // let scores = [
  //   { score: 10, name: "○○○○" },
  //   { score: 8, name: "●●●●●" },
  //   { score: 9, name: "XXXX" },
  //   { score: 8, name: "▲▲▲▲▲" },
  //   { score: 9, name: "△△△△" },
  //   { score: 8, name: "■■■■■" },
  // ];
  // scores = scores.sort((a, b) => {
  //   var x = a["score"];
  //   var y = b["score"];
  //   if (x > y) {
  //     return -1;
  //   }
  //   if (x < y) {
  //     return 1;
  //   }
  //   return 0;
  // });
  // let count, tmp;
  // scores.forEach((item, index) => {
  //   if (item.score !== tmp) {
  //     count = index + 1;
  //     tmp = item.score;
  //   }
  //   console.log("count:", count, ", name:", item.name, ", score:", item.score);
  // });

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
