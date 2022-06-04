import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { collection, getDocs, doc } from "firebase/firestore";
import { db } from "../components/Firebase";
import { getAuth } from "firebase/auth";
import { useIsFocused } from "@react-navigation/native";
import { HistoryList } from "../components/HistoryList";

const Stack = createNativeStackNavigator();

export const History = () => {
  const isFocused = useIsFocused();

  const [historyListData, setHistoryListData] = useState([]);
  const getUserProfile = getAuth();
  const user = getUserProfile.currentUser;
  const email = user.email;

  useEffect(async () => {
    const getCollection = await getDocs(collection(db, "users"));
    const arrayUsers = [];
    getCollection.forEach((docs) => {
      arrayUsers.push({ email: docs.data().email, id: docs.id });
    });
    const loginFilter = arrayUsers.filter((login) => {
      return email === login.email;
    });
    const getUserData = doc(db, "users", loginFilter[0].id);
    const sendHistory = collection(db, "usersHistory");
    const querySnapshotHistory = await getDocs(sendHistory);
    const arrayCoins = [];
    querySnapshotHistory.forEach((docs) => {
      arrayCoins.push({
        name: docs.data().name,
        email: docs.data().email,
        sendingCoin: docs.data().sendingCoin,
        recipientUserName: docs.data().recipientUserName,
        time: docs.data().time,
      });
    });
    const arrayCoinsFilter = arrayCoins.filter((login) => {
      return email === login.email;
    });
    arrayCoinsFilter.time = arrayCoinsFilter.sort((a, b) => {
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
    setHistoryListData(arrayCoinsFilter);
  }, [isFocused]);

  return (
    <View style={styles.content}>
      <FlatList
        data={historyListData}
        renderItem={({ item }) => {
          return (
            <HistoryList
              friendName={item.recipientUserName}
              sontCoin={item.sendingCoin}
              unit={"K"}
              time={item.time}
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

export default History;
