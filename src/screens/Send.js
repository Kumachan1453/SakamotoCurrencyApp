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
import { Warning } from "../components/Warning";
import LeafCoinMini from "../components/LeafCoinMini";
import GetUserData from "../components/UserData";
import { checkNgWord, checkNumber } from "../components/IfText";
import {
  amountUseAfter,
  attentionSendKon,
  cancel,
  checkInappropriateWord,
  checkWholeNumbers,
  enterNumbers,
  exceedsBalance,
  konOwnership,
  konYouSend,
  monthlyKonUsage,
  ok,
  remainingAmount,
  sendKon,
  sendTo,
  thanksMessage,
  tooManyCharacters,
} from "../components/SupportedLanguages";

export const Send = ({ navigation }) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hour = ("0" + date.getHours()).slice(-2);
  const minute = ("0" + date.getMinutes()).slice(-2);
  const second = ("0" + date.getSeconds()).slice(-2);

  const dateText =
    year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second;

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
  const [thanksText, setThanksText] = useState("");
  const [sumCoinUsage, setSumCoinUsage] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [subId, setSubId] = useState(0);

  const isNgWord = checkNgWord(thanksText);
  const isNumber = checkNumber(sendingCoin);
  const thanksTextLength = thanksText.length;

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
      alert("数字が0以下です");
    } else if (coinOwnership - sendingCoin >= 0) {
      setSendingCoin(sendingCoin);
      await updateDoc(getData, {
        coinOwnership: coinOwnership - sendingCoin,
        monthlyCoinUsage: monthlyCoinUsage + sendingCoin,
        sumCoinUsage: sumCoinUsage + sendingCoin,
        time: dateText,
      });
      await updateDoc(getParamsData, {
        time: dateText,
      });
    } else if (coinOwnership - sendingCoin < 0) {
      alert("Konが足りません");
    } else {
      alert("使用できない文字です");
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
        thanksText: thanksText,
        time: dateText,
      });

      const sendHistory = await addDoc(collection(db, "usersHistory"), {
        name: snapData.data().name,
        email: snapData.data().email,
        sendingCoin: sendingCoin,
        recipientUserName: route.params.name,
        recipientUserEmail: route.params.email,
        recipientUserId: route.params.id,
        thanksText: thanksText,
        time: dateText,
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

  if (sendingCoin > 0 && sendingCoin <= coinOwnership && isNgWord === false) {
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
            letter={sendTo}
            numberOfCoin={route.params.name}
          />
        </View>
        <View style={styles.line} />
        <View>
          {sendingCoin === 0 && (
            <TextTemplateYourCoinRerated
              letter={konOwnership}
              numberOfCoin={coinOwnership}
              unit={true}
            />
          )}
          {sendingCoin > 0 && sendingCoin <= coinOwnership && (
            <TextTemplateYourCoinRerated
              letter={remainingAmount}
              numberOfCoin={balance}
              unit={true}
            />
          )}
        </View>
        <View style={styles.line} />
        <View>
          {sendingCoin === 0 && (
            <TextTemplateYourCoinRerated
              letter={monthlyKonUsage}
              numberOfCoin={monthlyCoinUsage}
              unit={true}
            />
          )}
          {sendingCoin > 0 && sendingCoin <= coinOwnership && (
            <TextTemplateYourCoinRerated
              letter={amountUseAfter}
              numberOfCoin={futureMonthlyCoinUsage}
              unit={true}
            />
          )}
        </View>
        <View style={styles.line} />
        <View style={styles.alignItemsCenter}>
          <Text style={styles.bigText}>{konYouSend}</Text>
          <View style={styles.coinTextInputStyle}>
            <TextInput
              style={
                sendingCoin > coinOwnership ? styles.errorInput : styles.input
              }
              onChangeText={(text) =>
                setSendingCoin(parseInt(text === "" ? 0 : text))
              }
              type="number"
              placeholder={enterNumbers}
              keyboardType="number-pad"
            />
            <LeafCoinMini width={35} height={35} />
          </View>
          {sendingCoin > coinOwnership && <Warning letter={exceedsBalance} />}
          {isNumber === false && <Warning letter={checkWholeNumbers} />}
          <View style={styles.borderLine} />
          <View style={styles.textInputStyle}>
            <TextInput
              style={styles.inputString}
              onChangeText={setThanksText}
              placeholder={thanksMessage}
            />
          </View>
          {isNgWord === true && <Warning letter={checkInappropriateWord} />}
          {thanksTextLength > 15 && <Warning letter={tooManyCharacters} />}
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
            centerText={attentionSendKon}
            buttonPlacement={true}
            leftText={cancel}
            rightText={ok}
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
              content={sendKon}
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
  inputString: {
    width: 265,
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
  coinTextInputStyle: {
    flexDirection: "row",
  },
  textInputStyle: {
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
