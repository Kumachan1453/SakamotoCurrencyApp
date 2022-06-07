import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { collection, getDocs, doc } from "firebase/firestore";
import { db } from "../components/Firebase";
import { getAuth } from "firebase/auth";
import { useIsFocused } from "@react-navigation/native";
import { HistoryList } from "../components/HistoryList";
import { UserDataIdAndEmail } from "../components/UserData";
// import { history } from "../components/HistoryUserData";
import { UpDownButton } from "../components/UpDownButton";

const Stack = createNativeStackNavigator();

export const History = () => {
  // console.log("history", history);
  const isFocused = useIsFocused();
  const [buttonUpOrDown, setButtonUpOrDown] = useState(false);

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

  useEffect(async () => {
    const loginFilter = UserDataIdAndEmail.filter((login) => {
      return email === login.email;
    });
    const getUserData = doc(db, "users", loginFilter[0].id);
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
  }, [isFocused]);

  return (
    <View style={styles.content}>
      <UpDownButton
        onPress={getButtonUpOrDown}
        buttonUpOrDown={buttonUpOrDown}
      />
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
