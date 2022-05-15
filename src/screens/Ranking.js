import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../components/Firebase";
import { useIsFocused } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import FriendButton from "../components/FriendButton";

export const Ranking = () => {
  const isFocused = useIsFocused();
  const getUserProfile = getAuth();
  const user = getUserProfile.currentUser;
  const [rankingListData, setRankingListData] = useState([]);
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
    <FlatList
      data={rankingListData}
      renderItem={({ item }) => {
        return (
          <FriendButton
            ranking={item.ranking}
            friendName={item.name}
            coin={item.monthlyCoinUsage}
            unit="C"
          />
        );
      }}
      keyExtractor={(item) => item.id}
    />
  );
};

export default Ranking;
