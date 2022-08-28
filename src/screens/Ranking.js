import React, { useState, useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import FriendButton from "../components/FriendButton";
import { TrueOrFalseButton } from "../components/TrueOrFalseButton";
import GetUserData from "../components/UserData";

export const Ranking = () => {
  const isFocused = useIsFocused();
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
    let tmp;
    rankingListData.monthlyCoinUsage.forEach((item, index) => {
      if (item.monthlyCoinUsage !== tmp) {
        item.ranking = index + 1;
        tmp = item.monthlyCoinUsage;
      } else if (item.monthlyCoinUsage === tmp) {
        item.ranking = index;
      }
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
    <View style={styles.content}>
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
              thanksText={""}
              time=""
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
    height: "100%",
  },
});

export default Ranking;
