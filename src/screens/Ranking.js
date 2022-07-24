import React, { useState, useEffect } from "react";
import { FlatList, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import FriendButton from "../components/FriendButton";
import { TrueOrFalseButton } from "../components/TrueOrFalseButton";
import GetUserData from "../components/UserData";

export const Ranking = () => {
  const isFocused = useIsFocused();
  const getUserProfile = getAuth();
  // リファクタリング対象
  const user = getUserProfile.currentUser;
  const [rankingListData, setRankingListData] = useState([]);
  const [buttonUpOrDown, setButtonUpOrDown] = useState(false);

  const getButtonUpOrDown = () => {
    if (buttonUpOrDown === false) {
      setButtonUpOrDown(true);
    } else if (buttonUpOrDown === true) {
      setButtonUpOrDown(false);
    }
  };

  const userData = [];

  const getRankingData = async () => {
    await GetUserData({ array: userData });
    setRankingListData(userData);
  };

  if (buttonUpOrDown === true) {
    rankingListData.monthlyCoinUsage = rankingListData.sort((a, b) => {
      const x = a["monthlyCoinUsage"];
      const y = b["monthlyCoinUsage"];
      if (x > y) {
        return 1;
      }
      if (x < y) {
        return -1;
      }
      return 0;
    });
  } else if (buttonUpOrDown === false) {
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
  }

  useEffect(async () => {
    await getRankingData();
  }, [isFocused]);

  return (
    <View>
      <TrueOrFalseButton
        onPress={getButtonUpOrDown}
        buttonTrueOrFalse={buttonUpOrDown}
        trueText={"↓"}
        falseText={"↑"}
      />
      <FlatList
        data={rankingListData}
        renderItem={({ item }) => {
          return (
            <FriendButton
              disabled={true}
              ranking={item.ranking}
              friendName={item.name}
              coin={item.monthlyCoinUsage}
              unit={true}
              time=""
            />
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Ranking;
