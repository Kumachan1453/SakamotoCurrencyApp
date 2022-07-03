import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, TextInput } from "react-native";
import { FriendButton } from "../components/FriendButton";
import { db } from "../components/Firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useIsFocused } from "@react-navigation/native";
import TrueOrFalseButton from "../components/TrueOrFalseButton";

export const FriendList = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [listData, setListData] = useState([]);
  const [friendName, setFriendName] = useState("");
  const [historyListData, setHistoryListData] = useState([]);
  const [buttonTrueOrFalse, setButtonTrueOrFalse] = useState(false);

  const getUserProfile = getAuth();
  const user = getUserProfile.currentUser;
  const email = user.email;

  const getButtonTrueOrFalse = () => {
    if (buttonTrueOrFalse === false) {
      setButtonTrueOrFalse(true);
    } else if (buttonTrueOrFalse === true) {
      setButtonTrueOrFalse(false);
    }
  };

  useEffect(async () => {
    const sendHistory = collection(db, "usersHistory");
    const querySnapshotHistory = await getDocs(sendHistory);
    const arrayHistory = [];
    querySnapshotHistory.forEach((docs) => {
      arrayHistory.push({
        email: docs.data().email,
        recipientUserName: docs.data().recipientUserName,
        recipientUserId: docs.data().recipientUserId,
        time: docs.data().time,
        id: docs.id,
      });
    });
    const historyLoginFilter = arrayHistory.filter((login) => {
      return email === login.email;
    });

    const historyLoginFilterTime = (historyLoginFilter.time =
      historyLoginFilter.sort((a, b) => {
        const x = a["time"];
        const y = b["time"];
        if (x > y) {
          return -1;
        }
        if (x < y) {
          return 1;
        }
        return 0;
      }));

    const getDatas = query(collection(db, "users"));
    const querySnapshot = await getDocs(getDatas);
    const array = [];
    querySnapshot.forEach((docs) => {
      array.push({
        name: docs.data().name,
        email: docs.data().email,
        time: docs.data().time,
        id: docs.id,
      });
    });
    const loginFilter = array.filter((login) => {
      return email !== login.email;
    });
    const loginFilterTime = (loginFilter.time = loginFilter.sort((a, b) => {
      const x = a["time"];
      const y = b["time"];
      if (x > y) {
        return -1;
      }
      if (x < y) {
        return 1;
      }
      return 0;
    }));
    console.log("loginFilterTime", loginFilterTime);

    const historyRecipientUserId = [];
    historyLoginFilterTime.forEach((docs) => {
      historyRecipientUserId.push(docs.recipientUserId);
    });
    const setHistoryRecipientUserId = Array.from(
      new Set(historyRecipientUserId)
    );
    console.log("setHistoryRecipientUserId", setHistoryRecipientUserId);
    const recentRecipientUser = loginFilterTime.filter((docs) => {
      console.log("docs.id", docs.id);
      for (let i = 0; i <= loginFilterTime.length; i++) {
        console.log(
          "setHistoryRecipientUserId[i]",
          setHistoryRecipientUserId[i]
        );
        return docs.id === setHistoryRecipientUserId[i];
      }
    });
    console.log("recentRecipientUserId", recentRecipientUser);
    setHistoryListData(recentRecipientUser);
  }, [buttonTrueOrFalse]);

  useEffect(async () => {
    const getDatas = query(collection(db, "users"));
    const querySnapshot = await getDocs(getDatas);
    const array = [];
    querySnapshot.forEach((docs) => {
      array.push({
        name: docs.data().name,
        email: docs.data().email,
        time: docs.data().time,
        id: docs.id,
      });
    });
    const loginFilter = array.filter((login) => {
      return email !== login.email;
    });
    loginFilter.time = loginFilter.sort((a, b) => {
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
    setListData(loginFilter);
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (friendName !== "") {
        const filterFriendList = async () => {
          const getDatas = query(collection(db, "users"));
          const querySnapshot = await getDocs(getDatas);
          const array = [];
          querySnapshot.forEach((docs) => {
            array.push({
              name: docs.data().name,
              email: docs.data().email,
              time: docs.data().time,
              id: docs.id,
            });
          });
          const loginFilter = array.filter((login) => {
            return email !== login.email;
          });
          const loginFilterTime = (loginFilter.time = loginFilter.sort(
            (a, b) => {
              const x = a["time"];
              const y = b["time"];
              if (x > y) {
                return -1;
              }
              if (x < y) {
                return 1;
              }
              return 0;
            }
          ));
          console.log("loginFilterTime", loginFilterTime);
          const filterListData = loginFilterTime.filter((value) => {
            return value.name.match(friendName);
          });
          setListData(filterListData);
        };
        filterFriendList();
      } else {
        const friendList = async () => {
          const getDatas = query(collection(db, "users"));
          const querySnapshot = await getDocs(getDatas);
          const array = [];
          querySnapshot.forEach((docs) => {
            array.push({
              name: docs.data().name,
              email: docs.data().email,
              time: docs.data().time,
              id: docs.id,
            });
          });
          const loginFilter = array.filter((login) => {
            return email !== login.email;
          });
          loginFilter.time = loginFilter.sort((a, b) => {
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
          setListData(loginFilter);
        };
        friendList();
      }
    }, 0);
    return () => clearTimeout(timerId);
  }, [friendName, isFocused]);

  return (
    <View style={styles.content}>
      <View style={styles.textInputBackground}>
        <TextInput
          style={styles.textInput}
          onChangeText={setFriendName}
          value={friendName}
          placeholder="フレンド名を入力してください"
          autoCapitalize="none"
        />
      </View>
      <TrueOrFalseButton
        onPress={getButtonTrueOrFalse}
        buttonTrueOrFalse={buttonTrueOrFalse}
        trueText={"すべてのフレンド"}
        falseText={"最近のフレンド"}
      />

      <FlatList
        data={buttonTrueOrFalse === true ? listData : historyListData}
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

const styles = StyleSheet.create({
  content: {
    height: "100%",
  },
  textInputBackground: {
    backgroundColor: "#66CC66",
  },
  textInput: {
    width: "95%",
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    borderColor: "gray",
    backgroundColor: "#DDDDDD",
  },
});

export default FriendList;
