import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
} from "react-native";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import {
  jpCheck,
  blankCheck,
  checkNgWord,
  checkEmailFormat,
  checkNameConflict,
} from "../components/IfText";
import { RegisterButton } from "../components/RegisterButton";
import { LoginButton } from "../components/LoginButton";
import { auth, db } from "../components/Firebase";
import { addDoc, collection, query, getDocs } from "firebase/firestore";
import { Warning } from "../components/Warning";
// import { UserData } from "../components/UserData";

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [signError, setSignError] = useState(false);

  const [coinOwnership, setCoinOwnership] = useState(10000);
  const [monthlyCoinUsage, setMonthlyCoinUsage] = useState(0);
  const [sendingCoin, setSendingCoin] = useState(0);
  const [ranking, setRanking] = useState(0);
  const [sumCoinUsage, setSumCoinUsage] = useState(0);
  const [updateNumber, setUpdateNumber] = useState(0);

  const isJapanese = jpCheck(email);
  const isBlankUserName = blankCheck(userName);
  const isBlankEmail = blankCheck(email);
  const isEmailFormat = checkEmailFormat(email);
  const isBlankPassword = blankCheck(password);
  const isNgWord = checkNgWord(userName);

  const isNameConflict = checkNameConflict(userName);
  console.log("isNameConflict", isNameConflict);

  // const A = ["B", "C", "D", "D"];
  // console.log("A", A);
  // const trueOrFalse = A.includes("D");
  // console.log("trueOrFalse", trueOrFalse);

  const signUp = () => {
    if (
      isJapanese ||
      isBlankEmail ||
      isEmailFormat ||
      isBlankPassword ||
      isBlankUserName ||
      // isNameConflict ||
      isNgWord
    ) {
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
  }, [userName || email || password]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.keyboardAvoidingView}
    >
      <Text style={styles.textUsersRegister}>新規登録画面</Text>

      <View style={styles.view}>
        <Text>名前</Text>
        <TextInput
          style={isNgWord ? styles.errorTextInput : styles.textInput}
          onChangeText={setUserName}
          value={userName}
          placeholder="お名前を入力してください"
          autoCapitalize="none"
        />
        {isNgWord && (
          <Warning letter={"名前の中で不適切な用語が使われています"} />
        )}
        {isNameConflict && (
          <Warning letter={"名前が他のユーザーと重複しています"} />
        )}
      </View>
      <View style={styles.view}>
        <Text>メールアドレス</Text>
        <TextInput
          style={
            isJapanese || (!isBlankEmail && isEmailFormat)
              ? styles.errorTextInput
              : styles.textInput
          }
          onChangeText={setEmail}
          value={email}
          placeholder="メールアドレスを入力してください"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {isJapanese && <Warning letter={"日本語が含まれています"} />}
        {!isBlankEmail && !isJapanese && isEmailFormat && (
          <Warning letter={"メールアドレスの形式が間違っています"} />
        )}
      </View>

      <View style={styles.view}>
        <Text>パスワード（6文字以上）</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={setPassword}
          value={password}
          placeholder="パスワードを入力してください"
          secureTextEntry={true}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.LoginAndRegister}>
        <LoginButton
          onPress={() => navigation.navigate("Login")}
          text={"ログイン"}
        />
        <RegisterButton
          onPress={signUp}
          disabled={
            !email ||
            !password ||
            isJapanese ||
            isBlankEmail ||
            isEmailFormat ||
            isBlankPassword ||
            isBlankUserName ||
            isNgWord
          }
          text={"新規登録"}
        />
      </View>
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
    borderRadius: 10,
    padding: 5,
    borderColor: "gray",
  },
  errorTextInput: {
    width: 250,
    borderWidth: 1,
    padding: 5,
    borderColor: "red",
  },
  LoginAndRegister: {
    flexDirection: "row",
  },
});

export default RegisterScreen;
