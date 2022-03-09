import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { FriendButton } from "../components/FriendButton";
import { db } from "../components/Firebase";
import { getDocs, collection, query, where } from "firebase/firestore";

export const FriendList = ({ navigation }) => {
  const [listData, setListData] = useState([]);
  useEffect(async () => {
    const getDatas = query(
      collection(db, "users")
      // where("8hj8oNjxxBVwK9zUunE6", "==", false)
    );
    const querySnapshot = await getDocs(getDatas);
    const array = [];
    querySnapshot.forEach((docs) => {
      array.push({ name: docs.data().name, id: docs.id });
    });
    setListData(array);
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
