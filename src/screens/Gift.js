import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { FriendButton } from "../components/FriendButton";
import TextTemplateYourCoinRerated from "../components/TextTemplateYourCoinRerated";
import {
  getDoc,
  doc,
  updateDoc,
  collection,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useIsFocused } from "@react-navigation/native";
import { db } from "../components/Firebase";
import GetCoinsData from "../components/CoinsData";
import GetUserData from "../components/UserData";
import {
  konOwnership,
  monthlyKonUsage,
  touchBar,
} from "../components/SupportedLanguages";

export const Gift = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hour = ("0" + date.getHours()).slice(-2);
  const minute = ("0" + date.getMinutes()).slice(-2);
  const second = ("0" + date.getSeconds()).slice(-2);

  const dateText =
    year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second;

  const [coinOwnership, setCoinOwnership] = useState(0);
  const [monthlyCoinUsage, setMonthlyCoinUsage] = useState(0);
  const [userId, setUserId] = useState("");
  const [giftListData, setGiftListData] = useState([]);
  const [updateId, setUpdateId] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const getUserProfile = getAuth();
  const user = getUserProfile.currentUser;
  const email = user.email;

  const isFocused = useIsFocused();

  const coinsData = [];
  const userData = [];

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

  const getLoginUserData = async () => {
    await GetCoinsData({ array: coinsData });
    const coinsDataTime = ascendingOrder(coinsData);
    setGiftListData(coinsDataTime);

    await GetUserData({ array: userData });
    const loginFilter = userData.filter((login) => {
      return email === login.email;
    });
    const getData = doc(db, "users", loginFilter[0].id);
    const snapData = await getDoc(getData);
    setUserId(loginFilter[0].id);
    setCoinOwnership(Math.round(snapData.data().coinOwnership));
    setMonthlyCoinUsage(Math.round(snapData.data().monthlyCoinUsage));
  };

  const updateData = async (item) => {
    await GetUserData({ array: userData });
    const loginFilter = userData.filter((login) => {
      return email === login.email;
    });
    const getData = doc(db, "users", loginFilter[0].id);
    const snapData = await getDoc(getData);
    updateDoc(getData, {
      coinOwnership: coinOwnership + item.sendingCoin,
      time: dateText,
    });

    await GetCoinsData({ array: coinsData });
    const giftHistory = await addDoc(collection(db, "usersHistory"), {
      name: snapData.data().name,
      email: snapData.data().email,
      sendingCoin: item.sendingCoin,
      recipientUserName: item.name,
      recipientUserEmail: item.email,
      recipientUserId: item.id,
      thanksText: item.thanksText,
      time: dateText,
      sendOrGift: "+",
    });
  };

  const deleteData = async (item) => {
    deleteDoc(doc(db, "coins", item.id));
  };

  const onPressAction = async (item) => {
    if (isButtonDisabled === false) {
      setIsButtonDisabled(true);
    }
    await deleteData(item);
    await updateData(item);
    setUpdateId(updateId + 1);
  };

  useEffect(async () => {
    await getLoginUserData();
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 2000);
  }, [isFocused, updateId]);

  return (
    <>
      <View style={styles.content}>
        <TextTemplateYourCoinRerated
          letter={konOwnership}
          numberOfCoin={coinOwnership}
          unit={true}
        />
        <TextTemplateYourCoinRerated
          letter={monthlyKonUsage}
          numberOfCoin={monthlyCoinUsage}
          unit={true}
        />
        <Text style={styles.allertText}>{touchBar}</Text>
        <View style={styles.line} />
      </View>
      <FlatList
        data={giftListData}
        renderItem={({ item }) => {
          if (item.recipientUserId === userId) {
            return (
              <FriendButton
                onPress={() => onPressAction(item)}
                friendName={item.name}
                coin={item.sendingCoin}
                unit={true}
                thanksText={item.thanksText}
                time={item.time}
                disabled={isButtonDisabled}
              />
            );
          }
        }}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

const styles = StyleSheet.create({
  allertText: {
    textAlign: "center",
    fontSize: 15,
    color: "gray",
  },
  line: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "gray",
    marginTop: 20,
  },
});

export default Gift;
