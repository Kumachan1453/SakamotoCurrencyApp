import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { FriendButton } from "../components/FriendButton";
import TextTemplateYourCoinRerated from "../components/TextTemplateYourCoinRerated";
import {
  getDoc,
  doc,
  updateDoc,
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useIsFocused } from "@react-navigation/native";
import { db } from "../components/Firebase";
import { howMuchDouYouUseYourCoinThisMonth } from "../components/PatternText";

export const Gift = () => {
  const [coinOwnership, setCoinOwnership] = useState(0);
  const [monthlyCoinUsage, setMonthlyCoinUsage] = useState(0);
  const [userId, setUserId] = useState("");
  const [giftListData, setGiftListData] = useState([]);
  const [updateId, setUpdateId] = useState(0);

  const getUserProfile = getAuth();
  const user = getUserProfile.currentUser;
  const email = user.email;
  const unit = "C";

  const isFocused = useIsFocused();

  useEffect(async () => {
    const sendGift = collection(db, "coins");
    const querySnapshot = await getDocs(sendGift);
    const arrayCoins = [];
    querySnapshot.forEach((docs) => {
      arrayCoins.push({
        name: docs.data().name,
        sendingCoin: docs.data().sendingCoin,
        subId: docs.data().subId,
        recipientUserId: docs.data().recipientUserId,
        id: docs.id,
        time: docs.data().time,
      });
    });
    setGiftListData(arrayCoins); //arrayCoinsを並べ替える。

    const getCollection = await getDocs(collection(db, "users"));
    const arrayUsers = [];
    getCollection.forEach((docs) => {
      arrayUsers.push({ email: docs.data().email, id: docs.id });
    });
    const loginFilter = arrayUsers.filter((login) => {
      return email === login.email;
    });
    const getData = doc(db, "users", loginFilter[0].id);
    const snapData = await getDoc(getData);
    setUserId(loginFilter[0].id);
    setCoinOwnership(Math.round(snapData.data().coinOwnership));
    setMonthlyCoinUsage(Math.round(snapData.data().monthlyCoinUsage));
  }, [isFocused]);

  const updateData = async (item) => {
    console.log("updateData: 1"); //1回ボタンを押したらボタンを押せなくするという機能。
    const getCollection = await getDocs(collection(db, "users"));
    const arrayUsers = [];
    getCollection.forEach((docs) => {
      arrayUsers.push({ email: docs.data().email, id: docs.id });
    });
    const loginFilter = arrayUsers.filter((login) => {
      return email === login.email;
    });
    const getData = doc(db, "users", loginFilter[0].id);
    console.log("updateData: 2");
    await updateDoc(getData, {
      coinOwnership: coinOwnership + item.sendingCoin,
    });
    console.log("updateData: 3");
  };
  const deleteData = async (item) => {
    console.log("deleteData: 1");
    //ここに条件文を作るなど
    await deleteDoc(doc(db, "coins", item.id));
    console.log("deleteData: 2");
  };
  const onPressAction = async (item) => {
    updateData(item);
    deleteData(item);
    setUpdateId(updateId + 1);
    console.log("setUpdateId");
  };
  useEffect(async () => {
    const getCollection = await getDocs(collection(db, "users"));
    const arrayUsers = [];
    getCollection.forEach((docs) => {
      arrayUsers.push({ email: docs.data().email, id: docs.id });
    });
    const loginFilter = arrayUsers.filter((login) => {
      return email === login.email;
    });
    const getUserData = doc(db, "users", loginFilter[0].id);
    const snapUsersData = await getDoc(getUserData);
    setCoinOwnership(Math.round(snapUsersData.data().coinOwnership));
    setMonthlyCoinUsage(Math.round(snapUsersData.data().monthlyCoinUsage));
    const sendGift = collection(db, "coins");
    const querySnapshot = await getDocs(sendGift);
    const arrayCoins = [];
    querySnapshot.forEach((docs) => {
      arrayCoins.push({
        name: docs.data().name,
        sendingCoin: docs.data().sendingCoin,
        subId: docs.data().subId,
        recipientUserId: docs.data().recipientUserId,
        id: docs.id,
        time: docs.data().time,
      });
    });
    setGiftListData(arrayCoins);
  }, [updateId]);

  return (
    <>
      <View style={styles.content}>
        <TextTemplateYourCoinRerated
          letter="あなたの所持コイン数："
          numberOfCoin={coinOwnership}
          unit="C"
        />
        <TextTemplateYourCoinRerated
          letter={howMuchDouYouUseYourCoinThisMonth}
          numberOfCoin={monthlyCoinUsage}
          unit="C"
        />
        <View style={styles.line} />
      </View>
      <FlatList
        data={giftListData} //giftListDataを並べ替える。
        renderItem={({ item }) => {
          if (item.recipientUserId === userId) {
            return (
              <FriendButton
                onPress={() => onPressAction(item)}
                friendName={item.name}
                coin={item.sendingCoin}
                unit={unit}
                time={item.time}
                isButtonDisable={isButtonDisable}
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
  bigText: {
    fontWeight: "bold",
    fontSize: 20,
    margin: 10,
    marginTop: 20,
  },
  bigCoinText: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
    marginBottom: 30,
  },
  subText: {
    color: "#808080",
  },
  flexDirectionRow: {
    flexDirection: "row",
  },
  line: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "gray",
    marginTop: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    width: 100,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  thanksTextStyle: {
    color: "gray",
    marginBottom: 15,
  },
});

export default Gift;
