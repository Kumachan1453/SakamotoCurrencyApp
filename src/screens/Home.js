import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { getDoc, doc } from "firebase/firestore";
import { signOut, getAuth, deleteUser } from "firebase/auth";
import { auth } from "../components/Firebase";
import { db } from "../components/Firebase";
import { useIsFocused } from "@react-navigation/native";
import { howMuchDouYouUseYourCoinThisMonth } from "../components/PatternText";
import { LongButton } from "../components/LongButton";
import ModalTemplete from "../components/ModalTemplete";
import MoneyText from "../components/MoneyText";
import GetUserData from "../components/UserData";

export const Home = () => {
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleDeleteAccount, setModalVisibleDeleteAccount] =
    useState(false);

  const [name, setName] = useState("");
  const [coinOwnership, setCoinOwnership] = useState(0);
  const [monthlyCoinUsage, setMonthlyCoinUsage] = useState(0);

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
      .then(() => {})
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
            <LongButton
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
