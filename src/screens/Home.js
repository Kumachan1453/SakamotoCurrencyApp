import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { getDoc, doc, deleteDoc, addDoc, collection } from "firebase/firestore";
import { signOut, getAuth, deleteUser } from "firebase/auth";
import { auth } from "../components/Firebase";
import { db } from "../components/Firebase";
import { useIsFocused } from "@react-navigation/native";
import { howMuchDouYouUseYourCoinThisMonth } from "../components/PatternText";
import { LongButton } from "../components/LongButton";
import ModalTemplete from "../components/ModalTemplete";
import MoneyText from "../components/MoneyText";
import GetUserData from "../components/UserData";
import LongRedButton from "../components/LongRedButton";
import { Warning } from "../components/Warning";
import { dateText } from "../components/Date";

export const Home = () => {
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleDeleteAccount, setModalVisibleDeleteAccount] =
    useState(false);

  const [name, setName] = useState("");
  const [coinOwnership, setCoinOwnership] = useState(0);
  const [monthlyCoinUsage, setMonthlyCoinUsage] = useState(0);

  const date = new Date();
  const month = date.getMonth() + 1;

  const getUserProfile = getAuth();
  const user = getUserProfile.currentUser;
  const email = user.email;

  const userData = [];

  const handleLogout = () => {
    signOut(auth).catch(() => {
      alert("エラーが発生しました。");
    });
  };

  const deleteAccount = () => {
    deleteUser(user)
      .then(async () => {
        await GetUserData({ array: userData });
        const loginFilter = userData.filter((login) => {
          return email === login.email;
        });
        await addDoc(collection(db, "deleteUser"), {
          name: loginFilter[0].name,
          email: loginFilter[0].email,
          password: loginFilter[0].password,
          coinOwnership: loginFilter[0].coinOwnership,
          monthlyCoinUsage: loginFilter[0].monthlyCoinUsage,
          sumCoinUsage: loginFilter[0].sumCoinUsage,
          time: dateText,
        });
        await deleteDoc(doc(db, "users", loginFilter[0].id));
      })
      .catch((error) => {
        alert("エラーが発生しました。");
      });
  };

  const getLoginUserData = async () => {
    await GetUserData({ array: userData });
    const loginFilter = userData.filter((login) => {
      return email === login.email;
    });
    const getData = doc(db, "users", loginFilter[0].id);
    const snapData = await getDoc(getData);
    setName(snapData.data().name);
    setCoinOwnership(Math.round(snapData.data().coinOwnership));
    setMonthlyCoinUsage(Math.round(snapData.data().monthlyCoinUsage));
  };

  useEffect(async () => {
    await getLoginUserData();
  }, [isFocused]);

  return (
    <ScrollView>
      <View style={styles.content}>
        <View style={styles.center}>
          <View style={styles.profile}>
            <View style={styles.profileCategory}>
              <Text style={styles.headingText}>ユーザー名</Text>
              <Text style={styles.profileText}>{name}</Text>
            </View>
            <View style={styles.profileCategory}>
              <Text style={styles.headingText}>メールアドレス</Text>
              <Text style={styles.profileText}>{email}</Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.profile}>
            <View style={styles.profileCategory}>
              <Text style={styles.headingText}>
                あなたが所持している「Kon」の数
              </Text>
              <MoneyText numberOfCoin={coinOwnership} />
            </View>
            <View style={styles.profileCategory}>
              <Text style={styles.headingText}>
                {howMuchDouYouUseYourCoinThisMonth}
              </Text>
              <MoneyText numberOfCoin={monthlyCoinUsage} />
            </View>
            <Warning
              letter={
                "※このアプリは、毎月月初め（今月の場合は" +
                month +
                "月1日）の0時に更新が行われます。まず【あなたが所持している「Kon」の数】の5%は失います。その代わり、【" +
                howMuchDouYouUseYourCoinThisMonth +
                "】の5%分をGETすることができます。そして【あなたが" +
                (month + 1) +
                "月中に使用した「Kon」の数】は0になります。"
              }
            />
          </View>
        </View>

        <View style={styles.centeredView}>
          <ModalTemplete
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
            centerText={"本当にログアウトしますか？"}
            buttonPlacement={true}
            leftText={"キャンセル"}
            rightText={"OK"}
            leftOnPress={() => {
              setModalVisible(!modalVisible);
            }}
            rightOnPress={() => {
              setModalVisible(!modalVisible);
              handleLogout();
            }}
          />
          <View style={styles.logoutPlacement}>
            <LongButton
              onPress={() => {
                setModalVisible(true);
              }}
              letter={"ログアウト"}
            />
          </View>
          <ModalTemplete
            transparent={false}
            visible={modalVisibleDeleteAccount}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisibleDeleteAccount(!modalVisibleDeleteAccount);
            }}
            centerText={"本当にアカウントを削除しますか？"}
            buttonPlacement={true}
            leftText={"キャンセル"}
            rightText={"OK"}
            leftOnPress={() => {
              setModalVisibleDeleteAccount(!modalVisibleDeleteAccount);
            }}
            rightOnPress={() => {
              setModalVisibleDeleteAccount(!modalVisibleDeleteAccount);
              deleteAccount();
            }}
          />
          <View style={styles.deleteAccountPlacement}>
            <LongRedButton
              onPress={() => {
                setModalVisibleDeleteAccount(true);
              }}
              letter={"アカウント削除"}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    marginTop: 10,
  },
  profileCategory: {
    margin: 5,
    marginTop: 10,
  },
  profileText: {
    fontSize: 28,
  },
  headingText: {
    fontWeight: "bold",
    fontSize: 13,
    marginTop: 20,
    marginBottom: 10,
    color: "gray",
  },
  line: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "gray",
    marginTop: 20,
  },
  logoutPlacement: {
    alignItems: "center",
    marginTop: 30,
  },
  deleteAccountPlacement: {
    alignItems: "center",
    marginTop: 11,
    color: "red",
  },
});

export default Home;
