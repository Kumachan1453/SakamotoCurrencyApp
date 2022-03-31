import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
} from "react-native";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { jpCheck, blankCheck } from "../components/IfText";
import { auth, db } from "../components/Firebase";
import { addDoc, collection, query, getDocs } from "firebase/firestore";
// import { Button } from "../components/Button";

export const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [signError, setSignError] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [coinOwnership, setCoinOwnership] = useState(10000);
  const [monthlyCoinUsage, setMonthlyCoinUsage] = useState(0);
  const [sendingCoin, setSendingCoin] = useState(0);
  const [ranking, setRanking] = useState(0);
  const [sumCoinUsage, setSumCoinUsage] = useState(0);
  const [updateNumber, setUpdateNumber] = useState(0);

  const isJapanese = jpCheck(email);
  const isBlankEmail = blankCheck(email);
  const isBlankPassword = blankCheck(password);

  // const getDocId = async () => {
  //   const q = query(collection(db, "users"));

  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     console.log("doc.id:", doc.id, " => ", "doc.data():", doc.data());
  //   });
  // };
  // getDocId();

  if (!email || !password || isJapanese || isBlankEmail || isBlankPassword) {
    if (isButtonDisabled) {
      const setIsButtonDisabledTrue = () => {
        setIsButtonDisabled(true);
        console.log("true");
      };
      setIsButtonDisabledTrue;
    }
  } else {
    if (!isButtonDisabled) {
      const setIsButtonDisabledFalse = () => {
        setIsButtonDisabled(false);
        console.log("false");
      };
      setIsButtonDisabledFalse;
    }
  }

  const signUp = () => {
    if (isJapanese || isBlankEmail || isBlankPassword) {
      setSignError(true);
      return;
    } else {
      const handleRegister = async (user) => {
        try {
          const user = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const addUser = await addDoc(collection(db, "users"), {
            name: userName,
            email: email,
            password: password,
            coinOwnership: coinOwnership,
            monthlyCoinUsage: monthlyCoinUsage,
            sendingCoin: sendingCoin,
            ranking: ranking,
            sumCoinUsage: sumCoinUsage,
            updateNumber: updateNumber,
          });
        } catch (error) {
          if (
            error.message ===
            "The email address is already in use by another account."
          ) {
            setSignError(true);
            Alert.alert("すでに登録されているメールアドレスです。");
          } else if (
            error.message === "Password should be at least 6 characters"
          ) {
            setSignError(true);
            Alert.alert("パスワードは6文字以上で登録してください。");
          } else {
            setSignError(true);
            Alert.alert("エラーです。異なる入力内容でもう一度お試しください");
            console.log("error.message", error.message);
            console.log("user", user);
          }
        }
      };
      handleRegister();
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      signUp;
    }, 0);
    return () => clearTimeout(timerId);
  }, [email || password]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.keyboardAvoidingView}
    >
      <Text style={styles.textUsersRegister}>ユーザ登録画面</Text>
      <View style={styles.view}>
        <TextInput
          //style={setSignError(true) ? styles.errorTextInput : styles.textInput}と記述すると無限ループに関するエラーが発生する。
          style={signError ? styles.errorTextInput : styles.textInput}
          onChangeText={setEmail}
          value={email}
          placeholder="メールアドレス"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View style={styles.view}>
        <TextInput
          style={signError ? styles.errorTextInput : styles.textInput}
          // style={styles.textInput}
          onChangeText={setPassword}
          value={password}
          placeholder="パスワード（6文字以上）"
          secureTextEntry={true}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.view}>
        <TextInput
          style={styles.textInput}
          onChangeText={setUserName}
          value={userName}
          placeholder="名前"
          autoCapitalize="none"
        />
      </View>
      {/* <Button
        content="サインイン"
        onPress={signUp}
        isButtonDisabled={isButtonDisabled}
      /> */}
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={signUp}
        disabled={
          !email || !password || isJapanese || isBlankEmail || isBlankPassword
        }
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
  errorTextInput: {
    width: 250,
    borderWidth: 1,
    padding: 5,
    borderColor: "red",
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
