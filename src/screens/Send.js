import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Button } from "../components/Button";
import TextInputTemplate from "../components/TextInputTemplate";
import TextTemplateYourCoinRerated from "../components/TextTemplateYourCoinRerated";
import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6srd7jvN3hCW5gFLc9yniGimACFTeni4",
  authDomain: "sakamotocurrencyapp.firebaseapp.com",
  projectId: "sakamotocurrencyapp",
  storageBucket: "sakamotocurrencyapp.appspot.com",
  messagingSenderId: "367955895931",
  appId: "1:367955895931:web:7041aac36e6138ddf764de",
  measurementId: "${config.measurementId}",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const Send = () => {
  const FirstDay = "11/1";
  const LastDay = "11/30";
  const [sendingCoin, setSendingCoin] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);

  const [coinOwnership, setCoinOwnership] = useState(0);
  const [monthlyCoinUsage, setMonthlyCoinUsage] = useState(0);
  const [balance, setBalance] = useState(coinOwnership - sendingCoin);
  const [futureMonthlyCoinUsage, setFutureMonthlyCoinUsage] = useState(
    monthlyCoinUsage + sendingCoin
  );
  const [sumCoinUsage, setSumCoinUsage] = useState(0);

  const getYourServerData = async () => {
    const getData = doc(db, "users", "LGXdrQNczf95rT90Tp2R");
    const snapData = await getDoc(getData);
    setCoinOwnership(snapData.data().coinOwnership);
    setMonthlyCoinUsage(snapData.data().monthlyCoinUsage);
    setSumCoinUsage(snapData.data().sumCoinUsage);
  };
  getYourServerData();

  const updateData = async () => {
    const getData = doc(db, "users", "LGXdrQNczf95rT90Tp2R");
    if (sendingCoin < 0) {
      alert("数字が0以下です");
    } else if (coinOwnership - sendingCoin >= 0) {
      await updateDoc(getData, {
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
  useEffect(() => {
    const timerId = setTimeout(() => {
      setBalance(coinOwnership - sendingCoin);
      setFutureMonthlyCoinUsage(monthlyCoinUsage + sendingCoin);
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

  // 日付による更新の処理　【削除禁止】
  // const today = new Date();
  // const firstDay = today.getDate() === 1;
  // const minutes = today.getMinutes() === 2;
  // const hours = today.getHours() === 7;

  // const [count, setCount] = useState(0);
  // const update = () => {
  //   if (hours && count < 2) {
  //     setCount(count + 1);
  //     console.log(count);
  //     const getData = doc(db, "users", "LGXdrQNczf95rT90Tp2R");
  //     updateDoc(getData, {
  //       coinOwnership: coinOwnership * 0.9,
  //       // monthlyCoinUsage: 0,
  //     });
  //   }
  // };
  // update();

  return (
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
          style={styles.input}
          onChangeText={(text) =>
            setSendingCoin(parseInt(isNaN(text) ? sendingCoin : text))
          }
          type="number"
          pattern="[0-9]+"
          placeholder="数字を入力"
          keyboardType="numeric"
        />
        <Text style={styles.bigCoinText}>C</Text>
      </View>
      {/* <View style={styles.line} /> */}
      {/* <View style={styles.flexDirectionRow}>
        <Text style={styles.bigText}>残額</Text>
        <Text style={styles.bigCoinText}>{balance}</Text>
        <Text style={styles.bigCoinText}>C</Text>
      </View> */}
      <View style={styles.borderLine} />
      <View style={styles.sendMessage}>
        <Text>メッセージを送る</Text>
        <TextInputTemplate placeholder={"文字を入力"} />
      </View>

      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>本当にコインを送りますか？</Text>
              <View style={styles.twoButtonPlacement}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>キャンセル</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    updateData();
                  }}
                >
                  <Text style={styles.textStyle}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Button content="コインを送る" onPress={() => setModalVisible(true)} />
      </View>
    </View>
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

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
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
  twoButtonPlacement: {
    flexDirection: "row",
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

export default Send;
