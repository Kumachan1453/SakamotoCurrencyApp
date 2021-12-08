import React, { useState } from "react";
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

export const Send = () => {
  const HavingYourCoin = 10000;
  const YourCoinUsage = 20000;
  const FirstDay = "11/1";
  const LastDay = "11/30";
  const HavingYourCoinAfterSending = 1000;

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.content}>
      <TextTemplateYourCoinRerated
        letter="あなたの所持コイン数"
        numberOfCoin={HavingYourCoin}
        unit="C"
      />
      <View style={styles.line} />
      <Text style={styles.bigText}>あなたが送るコインの額</Text>
      <View style={styles.flexDirectionRow}>
        <TextInput
          style={styles.input}
          placeholder="数字を入力"
          keyboardType="numeric"
        />
        <Text style={styles.bigCoinText}>C</Text>
      </View>
      <View style={styles.line} />
      <TextTemplateYourCoinRerated
        letter="あなたのコイン使用量"
        subText1="集計期間"
        date1={FirstDay}
        subText2="〜"
        date2={LastDay}
        numberOfCoin={YourCoinUsage}
        unit="C"
      />
      <View style={styles.line} />
      <View style={styles.flexDirectionRow}>
        <Text style={styles.bigText}>残額</Text>
        <Text style={styles.bigCoinText}>{HavingYourCoinAfterSending}</Text>
        <Text style={styles.bigCoinText}>C</Text>
      </View>
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
                  onPress={() => setModalVisible(!modalVisible)}
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
  bigText: {
    fontWeight: "bold",
    fontSize: 18,
    margin: 10,
    marginTop: 20,
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
