import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../components/Firebase";

const Stack = createNativeStackNavigator();

export const History = () => {
  const [historyListData, setHistoryListData] = useState([]);

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
    // const snapUsersData = await getDoc(getUserData);
    // setCoinOwnership(Math.round(snapUsersData.data().coinOwnership));
    // setMonthlyCoinUsage(Math.round(snapUsersData.data().monthlyCoinUsage));
    // const sendGift = collection(db, "coins");
    // const querySnapshot = await getDocs(sendGift);
    const sendHistory = collection(db, "usersHistory");
    const querySnapshotHistory = await getDocs(sendHistory);
    const arrayCoins = [];
    querySnapshotHistory.forEach((docs) => {
      arrayCoins.push({
        name: docs.data().name,
        email: snapData.data().email,
        sendingCoin: docs.data().sendingCoin,
        recipientUserName: docs.data().recipientUserName,
        time: docs.data().time,
      });
    });
    const arrayCoinsFilter = arrayCoins.filter((login) => {
      return email === login.email;
    });
    arrayCoinsFilter.time = arrayCoins.sort((a, b) => {
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
  }, []);

  return (
    <View>
      <FlatList
        data={historyListData}
        renderItem={({ item }) => {
          return (
            <FriendButton
              friendName={item.name}
              onPress={() => navigation.navigate("Send", item)}
            />
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default History;
