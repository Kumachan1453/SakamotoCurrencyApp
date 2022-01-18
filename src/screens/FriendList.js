import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { FriendButton } from "../components/FriendButton";
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6srd7jvN3hCW5gFLc9yniGimACFTeni4",
  authDomain: "sakamotocurrencyapp.firebaseapp.com",
  projectId: "sakamotocurrencyapp",
  storageBucket: "sakamotocurrencyapp.appspot.com",
  messagingSenderId: "367955895931",
  appId: "1:367955895931:web:7041aac36e6138ddf764de",
  measurementId: "${config.measurementId}",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const FriendList = ({ navigation }) => {
  const [listData, setListData] = useState([]);
  useEffect(async () => {
    const getDatas = collection(db, "users");
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
