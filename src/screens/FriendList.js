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
  const [recentListData, setRecentListData] = useState();
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
    const arrayhistory = [];
    querySnapshotHistory.forEach((docs) => {
      arrayhistory.push({
        email: docs.data().email,
        recipientUserName: docs.data().recipientUserName,
        time: docs.data().time,
        id: docs.id,
      });
    });
    const historyLoginFilter = arrayhistory.filter((login) => {
      return email === login.email;
    });

    // const arr = ["A", "B", "C", "A", "B"];
    // const newArr = arr.filter((element, index) => {
    //   console.log("arr.indexOf(element):", arr.indexOf(element));
    //   console.log("index", index);
    //   arr.indexOf(element) === index;
    // });
    // console.log("newArr", newArr);

    // const historyFilter = historyLoginFilter.filter((gift, index) => {
    //   // console.log("historyLoginFilter.indexOf(gift)", history.indexOf(gift));
    //   console.log("index", index);
    //   // console.log("history", history);
    //   historyFilter.indexOf(gift) === index;
    // });
    // console.log("historyFilter", historyFilter);

    // const array1 = ["A", "D", "C", "A", "D", "C"];
    // const array2 = [...new Set(array1)];
    // console.log("array2", array2); // [ "A", "D", "C" ]

    // const historyFilter = new Map(
    //   historyLoginFilter.map((value) => [value.recipientUserName, value])
    // );
    // // console.log("historyFilter", historyFilter);
    // const historyFilterObject = Object.fromEntries(historyFilter);
    // // console.log("historyFilterObject:", historyFilterObject);
    // const historyFilterArray = Object.entries(historyFilterObject);
    // // const historyFilterArray = [historyFilterObject];
    // console.log("historyFilterArray:", historyFilterArray);
    // const historyFilterArrayShift = historyFilterArray.shift();
    // console.log("historyFilterArrayShift:", historyFilterArrayShift);
    // for (let step = 0; step < historyFilterArray.length; step++) {
    //   console.log("historyFilterArrayShift:", historyFilterArray[step].shift());
    // }

    historyLoginFilter.time = historyLoginFilter.sort((a, b) => {
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
    setHistoryListData(historyLoginFilter);
  }, [buttonTrueOrFalse]);
  // console.log("historyListData", historyListData);
  // console.log("listData", listData);
  const array = [];
  useEffect(async () => {
    const getDatas = query(collection(db, "recentlyExchangedFriends"));
    const querySnapshot = await getDocs(getDatas);
    querySnapshot.forEach((docs) => {
      array.push({
        name: docs.data().name,
        email: docs.data().email,
        recipientUserName: docs.data().recipientUserName,
        time: new Date().toLocaleString(),
        id: docs.id,
      });
    });
    const loginFilter = array.filter((login) => {
      return email !== login.email;
    });
    const mapFilter = new Map(loginFilter.map((value) => [value.name, value]));
    const mapFilterObject = Object.fromEntries(mapFilter);
    const mapFilterArray = Object.entries(mapFilterObject);
    // const mapFilterArray2 = [historyFilterObject];
    console.log("mapFilterArray:", mapFilterArray);
    const mapFilterArrayTime = (mapFilterArray.time = mapFilterArray.sort(
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
    setRecentListData(mapFilterArrayTime);
    console.log("recentListData", recentListData);
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

  const friendNameList = [];
  listData.forEach((docs) => {
    friendNameList.push(docs.name);
  });

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (friendName !== "") {
        const filterListData = listData.filter((item) => {
          return item.name === friendName;
        });
        setListData(filterListData);
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
        data={buttonTrueOrFalse === true ? listData : recentListData}
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
