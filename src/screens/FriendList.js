import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { FriendButton } from "../components/FriendButton";
import { db } from "../components/Firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const FriendList = ({ navigation }) => {
  const [listData, setListData] = useState([]);
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
        newRecipientUserId: docs.data().newRecipientUserId,
      });
    });
    const loginFilter = array.filter((login) => {
      return email !== login.email;
    });
    setListData(loginFilter);
  }, []);

  return (
    <View style={styles.content}>
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
});

export default FriendList;
