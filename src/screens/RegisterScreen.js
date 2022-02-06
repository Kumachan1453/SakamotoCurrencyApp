import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../components/Firebase";
import { addDoc, collection } from "firebase/firestore";

export const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [coinOwnership, setCoinOwnership] = useState(10000);
  const [sendingCoin, setSendingCoin] = useState(0);
  const [ranking, setRanking] = useState(0);
  const [sumCoinUsage, setSumCoinUsage] = useState(0);
  const [updateNumber, setUpdateNumber] = useState(0);
  const handleRegister = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      const addUser = await addDoc(collection(db, "users"), {
        name: userName,
        email: email,
        password: password,
        coinOwnership: coinOwnership,
        sendingCoin: sendingCoin,
        ranking: ranking,
        sumCoinUsage: sumCoinUsage,
        updateNumber: updateNumber,
      });
      console.log("uid", uid);
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.keyboardAvoidingView}
    >
      <Text style={styles.textUsersRegister}>ユーザ登録画面</Text>
      <View style={styles.view}>
        <TextInput
          style={styles.textInput}
          onChangeText={setEmail}
          value={email}
          placeholder="メールアドレスを入力してください"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View style={styles.view}>
        <TextInput
          style={styles.textInput}
          onChangeText={setPassword}
          value={password}
          placeholder="パスワードを入力してください"
          secureTextEntry={true}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.view}>
        <TextInput
          style={styles.textInput}
          onChangeText={setUserName}
          value={userName}
          placeholder="名前を入力してください"
          autoCapitalize="none"
        />
      </View>
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={handleRegister}
        disabled={!email || !password || !userName}
      >
        <Text style={styles.textStyleInTouchableOpacity}>登録する</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  textUsersRegister: {
    fontSize: 20,
    marginBottom: 20,
  },
  view: {
    marginBottom: 20,
  },
  textInput: {
    width: 250,
    borderWidth: 1,
    padding: 5,
    borderColor: "gray",
  },
  touchableOpacity: {
    padding: 10,
    backgroundColor: "#88cb7f",
    borderRadius: 10,
  },
  textStyleInTouchableOpacity: {
    color: "white",
  },
});

export default RegisterScreen;
