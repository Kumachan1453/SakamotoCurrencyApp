import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, TextInput } from "react-native";
import { FriendButton } from "../components/FriendButton";
import { db } from "../components/Firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const FriendList = ({ navigation }) => {
  const [listData, setListData] = useState([]);
  const [friendName, setFriendName] = useState("");
  const getUserProfile = getAuth();
  const user = getUserProfile.currentUser;
  const email = user.email;

  useEffect(async () => {
    const getDatas = query(collection(db, "users"));
    const querySnapshot = await getDocs(getDatas);
    const array = [];
    querySnapshot.forEach((docs) => {
      array.push({
        name: docs.data().name,
        email: docs.data().email,
        id: docs.id,
      });
    });
    const loginFilter = array.filter((login) => {
      return email !== login.email;
    });
    setListData(loginFilter);
  }, []);

  // useEffect(() => {
  //   const timerId = setTimeout(() => {
  //     if (friendName !== "") {
  //       const filterListData = listData.filter(() => {
  //         return listData.name === friendName;
  //       });
  //       setListData(filterListData);
  //     }
  //   }, 0);
  //   return () => clearTimeout(timerId);
  // }, [friendName]);

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
      <FlatList
        data={listData}
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
