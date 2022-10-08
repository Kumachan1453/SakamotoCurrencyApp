import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, TextInput } from "react-native";
import { FriendButton } from "../components/FriendButton";
import { getAuth } from "firebase/auth";
import { useIsFocused } from "@react-navigation/native";
import TrueOrFalseButton from "../components/TrueOrFalseButton";
import GetUserData from "../components/UserData";
import GetHistoryData from "../components/HistoryData";
import {
  enterFriendName,
  allFriends,
  relevantFriendsOnly,
} from "../components/SupportedLanguages";

export const FriendList = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [listData, setListData] = useState([]);
  const [friendName, setFriendName] = useState("");
  const [historyListData, setHistoryListData] = useState([]);
  const [buttonTrueOrFalseAllUser, setButtonTrueOrFalseAllUser] =
    useState(true);
  const [buttonTrueOrFalseRecipientUser, setButtonTrueOrFalseRecipientUser] =
    useState(false);

  const getUserProfile = getAuth();
  const user = getUserProfile.currentUser;
  const email = user.email;

  const getButtonTrueOrFalse = () => {
    if (
      buttonTrueOrFalseAllUser === false &&
      buttonTrueOrFalseRecipientUser === true
    ) {
      setButtonTrueOrFalseAllUser(true);
      setButtonTrueOrFalseRecipientUser(false);
    } else if (
      buttonTrueOrFalseAllUser === true &&
      buttonTrueOrFalseRecipientUser === false
    ) {
      setButtonTrueOrFalseAllUser(false);
      setButtonTrueOrFalseRecipientUser(true);
    }
  };

  const userData = [];
  const historyData = [];

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
    await GetHistoryData({ array: historyData });
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
          if (buttonTrueOrFalseAllUser === true) {
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
  }, [
    friendName,
    isFocused,
    buttonTrueOrFalseAllUser,
    buttonTrueOrFalseRecipientUser,
  ]);

  return (
    <View style={styles.content}>
      <View style={styles.textInputBackground}>
        <TextInput
          style={styles.textInput}
          onChangeText={setFriendName}
          value={friendName}
          placeholder={enterFriendName}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.headButton}>
        <View style={styles.buttonSize}>
          <TrueOrFalseButton
            onPress={getButtonTrueOrFalse}
            buttonTrueOrFalse={buttonTrueOrFalseAllUser}
            trueText={allFriends}
            falseText={allFriends}
          />
        </View>
        <View style={styles.buttonSize}>
          <TrueOrFalseButton
            onPress={getButtonTrueOrFalse}
            buttonTrueOrFalse={buttonTrueOrFalseRecipientUser}
            trueText={relevantFriendsOnly}
            falseText={relevantFriendsOnly}
          />
        </View>
      </View>

      <FlatList
        data={buttonTrueOrFalseAllUser === true ? listData : historyListData}
        renderItem={({ item }) => {
          return (
            <FriendButton
              friendName={item.name}
              thanksText={""}
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
  headButton: {
    width: "100%",
    flexDirection: "row",
  },
  buttonSize: {
    width: "50%",
  },
});

export default FriendList;
