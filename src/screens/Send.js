import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { Button } from "../components/Button";
import TextInputTemplate from "../components/TextInputTemplate";
import TextTemplateYourCoinRerated from "../components/TextTemplateYourCoinRerated";
import {
  getDoc,
  getDocs,
  doc,
  updateDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import { useIsFocused, useRoute } from "@react-navigation/native";
import FriendList from "../screens/FriendList";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ModalTemplete from "../components/ModalTemplete";
import { db } from "../components/Firebase";
import { onAuthStateChanged, signOut, getAuth } from "firebase/auth";

const Stack = createNativeStackNavigator();

export const Send = ({ navigation: { navigate } }) => {
  const getUserProfile = getAuth();
  const user = getUserProfile.currentUser;
  const email = user.email;

  const FirstDay = "11/1";
  const LastDay = "11/30";
  const [sendingCoin, setSendingCoin] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);

  const [coinOwnership, setCoinOwnership] = useState(0);
  const [monthlyCoinUsage, setMonthlyCoinUsage] = useState(0);
  const [balance, setBalance] = useState(
    Math.round(coinOwnership - sendingCoin)
  );
  const [futureMonthlyCoinUsage, setFutureMonthlyCoinUsage] = useState(
    Math.round(monthlyCoinUsage + sendingCoin)
  );
  const [sumCoinUsage, setSumCoinUsage] = useState(0);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [subId, setSubId] = useState(0);

  const route = useRoute();
  const isFocused = useIsFocused();

  useEffect(async () => {
    const getCollection = await getDocs(collection(db, "users"));
    const array = [];
    getCollection.forEach((docs) => {
      array.push({ email: docs.data().email, id: docs.id });
    });
    const loginFilter = array.filter((login) => {
      return email === login.email;
    });
    const getData = doc(db, "users", loginFilter[0].id);
    const snapData = await getDoc(getData);
    setCoinOwnership(Math.round(snapData.data().coinOwnership));
    setMonthlyCoinUsage(Math.round(snapData.data().monthlyCoinUsage));
    setSumCoinUsage(Math.round(snapData.data().sumCoinUsage));
  }, [isFocused]);

  const updateData = async () => {
    const getCollection = await getDocs(collection(db, "users"));
    const array = [];
    getCollection.forEach((docs) => {
      array.push({ email: docs.data().email, id: docs.id });
    });
    const loginFilter = array.filter((login) => {
      return email === login.email;
    });
    const getData = doc(db, "users", loginFilter[0].id);
    if (sendingCoin < 0) {
      alert("数字が0以下です");
    } else if (coinOwnership - sendingCoin >= 0) {
      setSendingCoin(sendingCoin);
      await updateDoc(getData, {
        // sendingCoin: sendingCoin,
        coinOwnership: coinOwnership - sendingCoin,
        monthlyCoinUsage: monthlyCoinUsage + sendingCoin,
        sumCoinUsage: sumCoinUsage + sendingCoin,
      });
    } else if (coinOwnership - sendingCoin < 0) {
      alert("コインが足りません");
    } else {
      alert("使用できない文字です");
    }
  };

  const pressOkButton = () => {
    setSubId(subId + 1);
    // console.log("subId", subId);
  };

  useEffect(async () => {
    const getCollection = await getDocs(collection(db, "users"));
    const array = [];
    getCollection.forEach((docs) => {
      array.push({ email: docs.data().email, id: docs.id });
    });
    const loginFilter = array.filter((login) => {
      return email === login.email;
    });
    const getData = doc(db, "users", loginFilter[0].id);
    const snapData = await getDoc(getData);
    if (sendingCoin === 0 || isNaN(sendingCoin)) {
      // console.log("処理を阻止");
    } else {
      const sendGift = await addDoc(collection(db, "coins"), {
        name: snapData.data().name,
        sendingCoin: sendingCoin,
        // id: sendGift.id,
        subId: subId,
        recipientUserId: route.params.id,
        time: new Date().toLocaleString(),
      });
      // collection.doc(id).set({
      //   ...sendGift,
      // });
      // console.log("Document written with ID: ", sendGift.id);
    }
  }, [subId]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setBalance(Math.round(coinOwnership - sendingCoin));
      setFutureMonthlyCoinUsage(Math.round(monthlyCoinUsage + sendingCoin));
    }, 0);
    return () => clearTimeout(timerId);
  }, [sendingCoin]);

  if (isNaN(balance) || !isFinite(balance)) {
    const afterBalance = () => setBalance(coinOwnership);
    afterBalance();
  }
  if (isNaN(futureMonthlyCoinUsage) || !isFinite(futureMonthlyCoinUsage)) {
    const afterFutureMonthlyCoinUsage = () =>
      setFutureMonthlyCoinUsage(monthlyCoinUsage);
    afterFutureMonthlyCoinUsage();
  }

  if (sendingCoin > 0 && sendingCoin <= coinOwnership) {
    if (isButtonDisabled) {
      setIsButtonDisabled(false);
    }
  } else {
    if (!isButtonDisabled) {
      setIsButtonDisabled(true);
    }
  }

  return (
    <ScrollView>
      <View style={styles.content}>
        <View style={styles.flexDirectionRowAndCenter}>
          <TextTemplateYourCoinRerated
            letter="所持コイン数"
            numberOfCoin={coinOwnership}
            unit="C"
          />
          <TextTemplateYourCoinRerated
            letter="残額"
            numberOfCoin={balance}
            unit="C"
          />
        </View>
        <View style={styles.line} />
        <View style={styles.flexDirectionRowAndCenter}>
          <TextTemplateYourCoinRerated
            letter="コイン使用量"
            subText1="集計期間"
            date1={FirstDay}
            subText2="〜"
            date2={LastDay}
            numberOfCoin={monthlyCoinUsage}
            unit="C"
          />
          <TextTemplateYourCoinRerated
            letter="使用後の使用量"
            numberOfCoin={futureMonthlyCoinUsage}
            unit="C"
          />
        </View>
        <View style={styles.line} />
        <Text style={styles.bigText}>あなたが送るコインの額</Text>
        <View style={styles.flexDirectionRow}>
          <TextInput
            style={isButtonDisabled ? styles.errorInput : styles.input}
            onChangeText={
              (text) =>
                setSendingCoin(parseInt(isNaN(text) ? sendingCoin : text)) //要確認
            }
            type="number"
            placeholder="数字を入力"
            keyboardType="numeric"
          />
          <Text style={styles.bigCoinText}>C</Text>
        </View>
        <View style={styles.borderLine} />

        <View style={styles.centeredView}>
          <ModalTemplete
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
            centerText={"本当にコインを送りますか？"}
            buttonPlacement={true}
            leftText={"キャンセル"}
            rightText={"OK"}
            leftOnPress={() => {
              setModalVisible(!modalVisible);
            }}
            rightOnPress={() => {
              setModalVisible(!modalVisible);
              updateData();
              pressOkButton();
              // navigate("FriendList");
            }}
          />
          <Button
            content="コインを送る"
            onPress={() => setModalVisible(true)}
            isButtonDisabled={isButtonDisabled}
          />
        </View>
        <View style={styles.space} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
  },
  flexDirectionRowAndCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  bigText: {
    fontWeight: "bold",
    fontSize: 18,
    margin: 10,
    marginTop: 20,
    alignItems: "center",
  },
  bigCoinText: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 17,
    marginBottom: 30,
  },
  input: {
    width: 230,
    height: 40,
    borderBottomWidth: 1,
    borderColor: "gray",
    padding: 10,
  },
  errorInput: {
    width: 230,
    height: 40,
    borderBottomWidth: 1.4,
    borderColor: "red",
    padding: 10,
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
  },
  borderLine: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "gray",
    marginBottom: 20,
  },
  sendMessage: {
    marginBottom: 60,
  },
  space: {
    marginBottom: 500,
  },

  twoButtonPlacement: {
    flexDirection: "row",
  },
});

export default Send;
