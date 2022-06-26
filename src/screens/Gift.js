import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { FriendButton } from "../components/FriendButton";
import TextTemplateYourCoinRerated from "../components/TextTemplateYourCoinRerated";
import {
  getDoc,
  doc,
  updateDoc,
  getDocs,
  collection,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { db } from "../components/Firebase";
import { howMuchDouYouUseYourCoinThisMonth } from "../components/PatternText";

export const Gift = () => {
  const route = useRoute();
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
    const getItemData = doc(db, "users", item.id);
    console.log("getItemData", getItemData);
    const snapData = await getDoc(getData);
    updateDoc(getData, {
      coinOwnership: coinOwnership + item.sendingCoin,
      time: new Date().toLocaleString(),
    });

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
    const giftHistory = await addDoc(collection(db, "usersHistory"), {
      name: snapData.data().name,
      email: snapData.data().email,
      sendingCoin: item.sendingCoin,
      recipientUserName: item.name,
      recipientUserId: item.id,
      time: new Date().toLocaleString(),
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
    const getCollection = await getDocs(collection(db, "users"));
    const arrayUsers = [];
    getCollection.forEach((docs) => {
      arrayUsers.push({ email: docs.data().email, id: docs.id });
    });
    const loginFilter = arrayUsers.filter((login) => {
      return email === login.email;
    });
    const getUserData = doc(db, "users", loginFilter[0].id);
    // console.log("loginFilter[0].id", loginFilter[0].id);
    const snapUsersData = await getDoc(getUserData);
    setCoinOwnership(Math.round(snapUsersData.data().coinOwnership));
    setMonthlyCoinUsage(Math.round(snapUsersData.data().monthlyCoinUsage));
    const sendGift = collection(db, "coins");
    const querySnapshot = await getDocs(sendGift);
    const arrayCoins = [];
    querySnapshot.forEach((docs) => {
      arrayCoins.push({
        name: docs.data().name,
        email: docs.data().email,
        sendingCoin: docs.data().sendingCoin,
        subId: docs.data().subId,
        recipientUserId: docs.data().recipientUserId,
        id: docs.id,
        time: docs.data().time,
      });
    });
    arrayCoins.time = arrayCoins.sort((a, b) => {
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
    setGiftListData(arrayCoins);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 2000);
  }, [updateId]);

  return (
    <>
      <View style={styles.content}>
        <TextTemplateYourCoinRerated
          letter="あなたの所持「Kon」数"
          numberOfCoin={coinOwnership}
          unit="K"
        />
        <TextTemplateYourCoinRerated
          letter={howMuchDouYouUseYourCoinThisMonth}
          numberOfCoin={monthlyCoinUsage}
          unit="K"
        />
        <Text style={styles.allertText}>
          下のバーをタッチして「Kon」を受け取ろう!
        </Text>
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
