import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, View, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { collection, getDocs, doc } from "firebase/firestore";
import { db } from "../components/Firebase";
import { getAuth } from "firebase/auth";
import { useIsFocused } from "@react-navigation/native";
import { HistoryList } from "../components/HistoryList";
import { UserDataIdAndEmail } from "../components/UserData";
import { TrueOrFalseButton } from "../components/TrueOrFalseButton";

const Stack = createNativeStackNavigator();
export const History = () => {
  const isFocused = useIsFocused();
  const [buttonUpOrDown, setButtonUpOrDown] = useState(false);
  const [plusFilter, setPlusFilter] = useState(false);
  const [minusFilter, setMinusFilter] = useState(false);

  const [historyListData, setHistoryListData] = useState([]);
  const getUserProfile = getAuth();
  const user = getUserProfile.currentUser;
  const email = user.email;

  const getButtonUpOrDown = () => {
    if (buttonUpOrDown === false) {
      setButtonUpOrDown(true);
    } else if (buttonUpOrDown === true) {
      setButtonUpOrDown(false);
    }
  };

  const getPlusFilter = () => {
    if (plusFilter === false) {
      if (minusFilter === true) {
        setMinusFilter(false);
        setHistoryListData(historyListData);
      }
      setPlusFilter(true);
    } else if (plusFilter === true) {
      setPlusFilter(false);
    }
  };

  const getMinusFilter = () => {
    if (minusFilter === false) {
      if (plusFilter === true) {
        setPlusFilter(false);
        setHistoryListData(historyListData);
      }
      setMinusFilter(true);
    } else if (minusFilter === true) {
      setMinusFilter(false);
    }
  };

  useEffect(async () => {
    const sendHistory = collection(db, "usersHistory");
    const querySnapshotHistory = await getDocs(sendHistory);
    const arrayhistory = [];
    querySnapshotHistory.forEach((docs) => {
      arrayhistory.push({
        name: docs.data().name,
        email: docs.data().email,
        sendingCoin: docs.data().sendingCoin,
        recipientUserName: docs.data().recipientUserName,
        time: docs.data().time,
        sendOrGift: docs.data().sendOrGift,
        id: docs.id,
      });
    });
    const historyFilter = arrayhistory.filter((login) => {
      return email === login.email;
    });

    if (buttonUpOrDown === false) {
      historyFilter.time = historyFilter.sort((a, b) => {
        const x = a["time"];
        const y = b["time"];
        if (x > y) {
          return -1;
        }
        if (x < y) {
          return 1;
        }
        return 0;
      });
      setHistoryListData(historyFilter);
    } else if (buttonUpOrDown === true) {
      historyFilter.time = historyFilter.sort((a, b) => {
        const x = a["time"];
        const y = b["time"];
        if (x > y) {
          return 1;
        }
        if (x < y) {
          return -1;
        }
        return 0;
      });
      setHistoryListData(historyFilter);
    }

    if (plusFilter === true) {
      const historyPlusFilter = historyFilter.filter((item) => {
        return item.sendOrGift === "+";
      });
      setHistoryListData(historyPlusFilter);
    } else if (minusFilter === true) {
      const historyMinusFilter = historyFilter.filter((item) => {
        return item.sendOrGift === "-";
      });
      setHistoryListData(historyMinusFilter);
    }
  }, [isFocused, buttonUpOrDown, plusFilter, minusFilter]);

  return (
    <View style={styles.content}>
      <View style={styles.flexDirectionRow}>
        <View>
          <TrueOrFalseButton
            onPress={getButtonUpOrDown}
            buttonTrueOrFalse={buttonUpOrDown}
            trueText={"↓"}
            falseText={"↑"}
          />
        </View>
        <View>
          <TrueOrFalseButton
            onPress={getPlusFilter}
            buttonTrueOrFalse={plusFilter}
            trueText={"+"}
            falseText={"+"}
          />
        </View>
        <View>
          <TrueOrFalseButton
            onPress={getMinusFilter}
            buttonTrueOrFalse={minusFilter}
            trueText={"-"}
            falseText={"-"}
          />
        </View>
      </View>
      <FlatList
        data={historyListData}
        renderItem={({ item }) => {
          return (
            <HistoryList
              friendName={item.recipientUserName}
              sontCoin={item.sendingCoin}
              unit={"K"}
              time={item.time}
              sendOrGift={item.sendOrGift}
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
  flexDirectionRow: {
    flexDirection: "row",
  },
});

export default History;
