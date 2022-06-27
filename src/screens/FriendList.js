import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, TextInput } from "react-native";
import { FriendButton } from "../components/FriendButton";
import { db } from "../components/Firebase";
import {
  collection,
  getDocs,
  query,
  addDoc,
  connectFirestoreEmulator,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useIsFocused } from "@react-navigation/native";
import TrueOrFalseButton from "../components/TrueOrFalseButton";

export const FriendList = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [listData, setListData] = useState([]);
  const [friendName, setFriendName] = useState("");
  const [historyListData, setHistoryListData] = useState([]);
  // const [recentListData, setRecentListData] = useState([]);
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

  // const testFunction = async () => {
  //   const subTestId = "QAdS3BFLz2dbv5Vc3udc";
  //   const subTestData = collection(db, "test", subTestId, "subTest");
  //   const getSubTestData = await getDocs(subTestData);
  //   const subTestArray = [];
  //   getSubTestData.forEach((docs) => {
  //     subTestArray.push({
  //       subTest: docs.data(),
  //     });
  //   });

  //   const testData = collection(db, "test");
  //   const getTestData = await getDocs(testData);
  //   const testArray = [];
  //   getTestData.forEach((docs) => {
  //     testArray.push({
  //       con: docs.data(),
  //     });
  //   });
  // };
  // testFunction();

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

    console.log("historyLoginFilterTime", historyLoginFilterTime);

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
    const recentRecipientUserId = loginFilterTime.filter((docs) => {
      console.log("docs.id", docs.id);
      for (let i = 0; i <= loginFilterTime.length; i++) {
        console.log(
          "setHistoryRecipientUserId[i]",
          setHistoryRecipientUserId[i]
        );
        return docs.id === setHistoryRecipientUserId[i];
      }
    });
    console.log("recentRecipientUserId", recentRecipientUserId);

    // const historyLoginFilterTimeFindIndex = historyLoginFilterTime.filter(
    //   (element, index) => {
    //     const findIndex = historyLoginFilterTime.findIndex((e) => {
    //       e.email === element.email;
    //     });
    //   }
    // );

    // const newMap = new Map();
    // const historyFilter = historyLoginFilterTime.map((value) => value);

    // const historyFilterNewMap = newMap;

    // const historyFilterObject = Object.fromEntries(historyFilter);
    // const historyFilterArray = Object.entries(historyFilterObject);
    // const historyFilterArray = [historyFilterObject];
    setHistoryListData(recentRecipientUserId);
  }, [buttonTrueOrFalse]);

  // const array = [];
  // useEffect(async () => {
  //   const getDatas = query(collection(db, "recentlyExchangedFriends"));
  //   const querySnapshot = await getDocs(getDatas);
  //   querySnapshot.forEach((docs) => {
  //     array.push({
  //       name: docs.data().name,
  //       email: docs.data().email,
  //       recipientUserName: docs.data().recipientUserName,
  //       time: new Date().toLocaleString(),
  //       id: docs.id,
  //     });
  //   });
  //   const recentLoginFilter = array.filter((login) => {
  //     return email !== login.email;
  //   });

  // const recentFriendFilter = recentLoginFilter.filter((element, index) => {
  //   recentLoginFilter.findIndex(
  //     ((e) => e.email === element.email && e.name === element.name) === index
  //   );
  // });

  // const result = JSON.stringify(recentFriendFilter, null, 2);
  // const mapFilter = new Map(
  //   recentLoginFilter.map((value) => [value.name, value])
  // );
  // const resultarray = Array.from(mapFilter);
  // const mapFilterObject = Object.fromEntries(mapFilter);
  // const mapFilterArray = Object.entries(mapFilterObject);
  // const mapFilterArray2 = [historyFilterObject];
  // const mapFilterArrayTime = (mapFilter.time = mapFilter.sort((a, b) => {
  //   const x = a["time"];
  //   const y = b["time"];
  //   if (x > y) {
  //     return -1;
  //   }
  //   if (x < y) {
  //     return 1;
  //   }
  //   return 0;
  // }));
  // setRecentListData(result);
  // }, [buttonTrueOrFalse]);

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
