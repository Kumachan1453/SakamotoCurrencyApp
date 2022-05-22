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
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const getUserProfile = getAuth();
  const user = getUserProfile.currentUser;
  const email = user.email;
  const unit = "K";

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
    setGiftListData(arrayCoins);

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
    const getCollection = await getDocs(collection(db, "users"));
    const arrayUsers = [];
    getCollection.forEach((docs) => {
      arrayUsers.push({ email: docs.data().email, id: docs.id });
    });
    const loginFilter = arrayUsers.filter((login) => {
      return email === login.email;
    });
    const getData = doc(db, "users", loginFilter[0].id);
    updateDoc(getData, {
      coinOwnership: coinOwnership + item.sendingCoin,
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
    setIsButtonDisabled(false);
  }, [updateId]);

  return (
    <>
      <View style={styles.content}>
        <TextTemplateYourCoinRerated
          letter="あなたの所持コイン数："
          numberOfCoin={coinOwnership}
          unit="K"
        />
        <TextTemplateYourCoinRerated
          letter={howMuchDouYouUseYourCoinThisMonth}
          numberOfCoin={monthlyCoinUsage}
          unit="K"
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
