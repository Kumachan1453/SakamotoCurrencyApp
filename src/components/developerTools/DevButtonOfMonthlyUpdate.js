import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { getDoc, doc, updateDoc, collection, addDoc } from "firebase/firestore";
import { db } from "../Firebase";
import GetUserData from "../UserData";

export const DevButtonOfMonthlyUpdate = () => {
  const today = new Date();
  const firstDay = today.getDate() === 1;
  const onHours = today.getHours() === 0;
  const onMinutes = today.getMinutes() === 0;
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hour = ("0" + date.getHours()).slice(-2);
  const minute = ("0" + date.getMinutes()).slice(-2);
  const second = ("0" + date.getSeconds()).slice(-2);

  const dateText =
    year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second;

  const userData = [];

  const monthlyUpdate = async () => {
    if (firstDay && onHours && onMinutes) {
      await GetUserData({ array: userData });
      for (let index = 0; index < userData.length; index++) {
        const updateUserCoinData = async () => {
          const getData = doc(db, "users", userData[index].id);
          const snapData = await getDoc(getData);
          const getCoinAmount =
            5000 <= Math.round(snapData.data().monthlyCoinUsage * 0.05)
              ? 5000
              : Math.round(snapData.data().monthlyCoinUsage * 0.05);

          updateDoc(getData, {
            updateNumber: snapData.data().updateNumber + 1,
            coinOwnership:
              Math.round(snapData.data().coinOwnership * 0.95) + getCoinAmount,
            monthlyCoinUsage: 0,
          });
          await addDoc(collection(db, "usersHistory"), {
            name: snapData.data().name,
            email: snapData.data().email,
            sendingCoin: Math.round(snapData.data().coinOwnership * 0.05),
            recipientUserName: "Kon運営",
            recipientUserEmail: "",
            recipientUserId: "",
            time: dateText,
            sendOrGift: "-",
          });
          await addDoc(collection(db, "usersHistory"), {
            name: snapData.data().name,
            email: snapData.data().email,
            sendingCoin: getCoinAmount,
            recipientUserName: "Kon運営",
            recipientUserEmail: "",
            recipientUserId: "",
            time: dateText,
            sendOrGift: "+",
          });
        };
        updateUserCoinData();
      }
    }
  };

  const update = () => {
    monthlyUpdate();
  };

  return (
    <TouchableOpacity
      onPress={update}
      style={
        !firstDay || !onHours || !onMinutes || isButtonDisabled === true
          ? styles.offListItemPlacement
          : styles.onListItemPlacement
      }
      disabled={
        !firstDay || !onHours || !onMinutes || isButtonDisabled === true
      }
    >
      <Text style={styles.listStyleText}>【厳重注意】月初更新ボタン</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  offListItemPlacement: {
    width: 300,
    height: 70,
    backgroundColor: "lightgray",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  onListItemPlacement: {
    width: 300,
    height: 70,
    backgroundColor: "black",
    borderWidth: 1,
    shadowColor: "black",
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  listStyleText: {
    fontSize: 22,
    color: "white",
    fontWeight: "600",
  },
});

export default DevButtonOfMonthlyUpdate;
