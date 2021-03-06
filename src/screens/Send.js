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
import ModalTemplete from "../components/ModalTemplete";
import { db } from "../components/Firebase";
import { getAuth } from "firebase/auth";
import { howMuchDouYouUseYourCoinThisMonth } from "../components/PatternText";
import { Warning } from "../components/Warning";
import LeafCoinMini from "../components/LeafCoinMini";
import GetUserData from "../components/UserData";

export const Send = ({ navigation }) => {
  const getUserProfile = getAuth();
  const user = getUserProfile.currentUser;
  const email = user.email;
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

  const userData = [];

  const getLoginUserData = async () => {
    await GetUserData({ array: userData });
    const loginFilter = userData.filter((login) => {
      return email === login.email;
    });
    const getData = doc(db, "users", loginFilter[0].id);
    const snapData = await getDoc(getData);
    setCoinOwnership(Math.round(snapData.data().coinOwnership));
    setMonthlyCoinUsage(Math.round(snapData.data().monthlyCoinUsage));
    setSumCoinUsage(Math.round(snapData.data().sumCoinUsage));
  };

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
    const getParamsData = doc(db, "users", route.params.id);
    if (sendingCoin < 0) {
      alert("?????????0????????????");
    } else if (coinOwnership - sendingCoin >= 0) {
      setSendingCoin(sendingCoin);
      await updateDoc(getData, {
        coinOwnership: coinOwnership - sendingCoin,
        monthlyCoinUsage: monthlyCoinUsage + sendingCoin,
        sumCoinUsage: sumCoinUsage + sendingCoin,
        time: new Date().toLocaleString(),
      });
      await updateDoc(getParamsData, {
        time: new Date().toLocaleString(),
      });
    } else if (coinOwnership - sendingCoin < 0) {
      alert("Kon??????????????????");
    } else {
      alert("??????????????????????????????");
    }
  };

  const pressOkButton = () => {
    setSubId(subId + 1);
  };

  const update = async () => {
    await GetUserData({ array: userData });
    const loginFilter = userData.filter((login) => {
      return email === login.email;
    });
    const getData = doc(db, "users", loginFilter[0].id);
    const snapData = await getDoc(getData);
    if (sendingCoin === 0 || isNaN(sendingCoin)) {
    } else {
      const sendGift = await addDoc(collection(db, "coins"), {
        name: snapData.data().name,
        email: snapData.data().email,
        sendingCoin: sendingCoin,
        subId: subId,
        recipientUserId: route.params.id,
        recipientUserEmail: route.params.email,
        time: new Date().toLocaleString(),
      });

      const sendHistory = await addDoc(collection(db, "usersHistory"), {
        name: snapData.data().name,
        email: snapData.data().email,
        sendingCoin: sendingCoin,
        recipientUserName: route.params.name,
        recipientUserEmail: route.params.email,
        recipientUserId: route.params.id,
        time: new Date().toLocaleString(),
        sendOrGift: "-",
      });

      navigation.goBack();
    }
  };

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

  useEffect(async () => {
    await getLoginUserData();
  }, [isFocused]);

  useEffect(async () => {
    await update();
  }, [subId]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setBalance(Math.round(coinOwnership - sendingCoin));
      setFutureMonthlyCoinUsage(Math.round(monthlyCoinUsage + sendingCoin));
    }, 0);
    return () => clearTimeout(timerId);
  }, [sendingCoin]);

  return (
    <ScrollView>
      <View>
        <View>
          <TextTemplateYourCoinRerated
            letter="???????????????"
            numberOfCoin={route.params.name}
          />
        </View>
        <View style={styles.line} />
        <View>
          {sendingCoin === 0 && (
            <TextTemplateYourCoinRerated
              letter="?????????Kon?????????"
              numberOfCoin={coinOwnership}
              unit={true}
            />
          )}
          {sendingCoin > 0 && sendingCoin <= coinOwnership && (
            <TextTemplateYourCoinRerated
              letter="?????????"
              numberOfCoin={balance}
              unit={true}
            />
          )}
        </View>
        <View style={styles.line} />
        <View>
          {sendingCoin === 0 && (
            <TextTemplateYourCoinRerated
              letter={howMuchDouYouUseYourCoinThisMonth}
              numberOfCoin={monthlyCoinUsage}
              unit={true}
            />
          )}
          {sendingCoin > 0 && sendingCoin <= coinOwnership && (
            <TextTemplateYourCoinRerated
              letter="????????????????????????"
              numberOfCoin={futureMonthlyCoinUsage}
              unit={true}
            />
          )}
        </View>
        <View style={styles.line} />
        <View style={styles.alignItemsCenter}>
          <Text style={styles.bigText}>??????????????????Kon??????</Text>
          <View style={styles.flexDirectionRow}>
            <TextInput
              style={isButtonDisabled ? styles.errorInput : styles.input}
              onChangeText={(text) =>
                setSendingCoin(parseInt(text === "" ? 0 : text))
              }
              type="number"
              placeholder="???????????????"
              keyboardType="number-pad"
            />
            <LeafCoinMini width={35} height={35} />
            {sendingCoin > coinOwnership && (
              <Warning letter={"???????????????????????????"} />
            )}
          </View>
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
            centerText={"?????????Kon?????????????????????"}
            buttonPlacement={true}
            leftText={"???????????????"}
            rightText={"OK"}
            leftOnPress={() => {
              setModalVisible(!modalVisible);
            }}
            rightOnPress={() => {
              setModalVisible(!modalVisible);
              updateData();
              pressOkButton();
            }}
          />
          <View style={styles.alignItemsCenter}>
            <Button
              content="Kon?????????"
              onPress={() => {
                setModalVisible(true);
              }}
              isButtonDisabled={isButtonDisabled}
            />
          </View>
        </View>
        <View style={styles.space} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  alignItemsCenter: {
    alignItems: "center",
  },
  bigText: {
    fontWeight: "bold",
    fontSize: 18,
    margin: 10,
    marginTop: 20,
    alignItems: "center",
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
    marginTop: 30,
  },
  space: {
    marginBottom: 500,
  },
});

export default Send;
