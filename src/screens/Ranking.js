import React, { useState, useEffect } from "react";
import { FlatList, View } from "react-native";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../components/Firebase";
import { useIsFocused } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import FriendButton from "../components/FriendButton";
import { TrueOrFalseButton } from "../components/TrueOrFalseButton";

export const Ranking = () => {
  const isFocused = useIsFocused();
  const getUserProfile = getAuth();
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
  const getUserData = async () => {
    const getCollection = await getDocs(collection(db, "users"));
    getCollection.forEach((docs) => {
      userData.push({
        id: docs.id,
        name: docs.data().name,
        email: docs.data().email,
        password: docs.data().password,
        coinOwnership: docs.data().coinOwnership,
        monthlyCoinUsage: docs.data().monthlyCoinUsage,
        sumCoinUsage: docs.data().sumCoinUsage,
        time: docs.data().time,
      });
    });
  };

  const ascendingOrder = (array) => {
    array.time = array.sort((a, b) => {
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
    return array;
  };

  const descendingOrder = (array) => {
    array.monthlyCoinUsage = array.sort((a, b) => {
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
    return array;
  };

  const getRankingData = async () => {
    await getUserData();
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
