import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, TextInput } from "react-native";
import { FriendButton } from "../components/FriendButton";
import { getAuth } from "firebase/auth";
import { useIsFocused } from "@react-navigation/native";
import TrueOrFalseButton from "../components/TrueOrFalseButton";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../components/Firebase";
import GetUserData from "../components/UserData";

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

  const userData = [];

  const historyData = [];
  const getHistoryData = async () => {
    const getCollection = await getDocs(collection(db, "usersHistory"));
    getCollection.forEach((docs) => {
      historyData.push({
        name: docs.data().name,
        email: docs.data().email,
        recipientUserEmail: docs.data().recipientUserEmail,
        recipientUserId: docs.data().recipientUserId,
        recipientUserName: docs.data().recipientUserName,
        sendOrGift: docs.data().sendOrGift,
        sendingCoin: docs.data().sendingCoin,
        time: docs.data().time,
      });
    });
  };

  const ascendingOrder = (array) => {
    array.time = array.sort((a, b) => {
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
    return array;
  };

  const functionInUseEffect = async () => {
    await GetUserData({ array: userData });
    await getHistoryData();
    const historyLoginFilter = historyData.filter((login) => {
      return email === login.email;
    });
    const loginFilter = userData.filter((login) => {
      return email !== login.email;
    });
    const loginFilterTime = ascendingOrder(loginFilter);
    const historyLoginFilterTime = ascendingOrder(historyLoginFilter);

    const historyRecipientUserEmail = [];
    historyLoginFilterTime.forEach((docs) => {
      historyRecipientUserEmail.push(docs.recipientUserEmail);
    });

    const onlyHistoryRecipientUserEmail = Array.from(
      new Set(historyRecipientUserEmail)
    );

    const recentRecipientUser = loginFilterTime.filter(
      (docs) => onlyHistoryRecipientUserEmail.indexOf(docs.email) !== -1
    );
    setHistoryListData(recentRecipientUser);

    const searchWord = setTimeout(() => {
      if (friendName !== "") {
        const filterFriendList = () => {
          setListData(loginFilterTime);
          if (buttonTrueOrFalse === true) {
            const filterListData = loginFilterTime.filter((value) => {
              return value.name.match(friendName);
            });
            setListData(filterListData);
          } else {
            const historyFilterListData = recentRecipientUser.filter(
              (value) => {
                return value.name.match(friendName);
              }
            );
            setHistoryListData(historyFilterListData);
          }
        };
        filterFriendList();
      } else {
        setListData(loginFilterTime);
      }
    }, 0);
    return () => clearTimeout(searchWord);
  };

  useEffect(async () => {
    await functionInUseEffect();
  }, [friendName, isFocused, buttonTrueOrFalse]);

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
        falseText={"関連したフレンドのみ"}
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
