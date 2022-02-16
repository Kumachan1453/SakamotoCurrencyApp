import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { jpCheck, blankCheck, checkEmailFormat } from "../components/IfText";
import { auth } from "../components/Firebase";
// import { addDoc, collection } from "firebase/firestore";
// import { MailTextInput } from "../components/MailTextInput";

export const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [userName, setUserName] = useState("");
  // const [coinOwnership, setCoinOwnership] = useState(10000);
  // const [sendingCoin, setSendingCoin] = useState(0);
  // const [ranking, setRanking] = useState(0);
  // const [sumCoinUsage, setSumCoinUsage] = useState(0);
  // const [updateNumber, setUpdateNumber] = useState(0);
  // const handleRegister = async () => {
  //   try {
  //     const user = await createUserWithEmailAndPassword(auth, email, password);
  //     const addUser = await addDoc(collection(db, "users"), {
  //       name: userName,
  //       email: email,
  //       password: password,
  //       coinOwnership: coinOwnership,
  //       sendingCoin: sendingCoin,
  //       ranking: ranking,
  //       sumCoinUsage: sumCoinUsage,
  //       updateNumber: updateNumber,
  //     });
  //     console.log("uid", uid);
  //   } catch (error) {
  //     alert("エラーが発生しました");
  //     console.log("error.message", error.message);
  //   }
  // };
  const signUp = (email, password) => {
    const isJapanese = jpCheck(email);
    const isBlankEmail = blankCheck(email);
    const isBlankPassword = blankCheck(password);
    // const isBlankConfirmPassword = blankCheck(confirmPassword);
    const isFormatAddress = checkEmailFormat(email);
    // const isMatchPassword = password !== confirmPassword;
    if (
      isJapanese ||
      isBlankEmail ||
      isBlankPassword
      // isFormatAddress
      // isBlankConfirmPassword ||
      // !isMatchPassword
    ) {
      Alert.alert("入力に誤りがあります。正しく入力してください");
      return;
    } else {
      const handleRegister = async () => {
        try {
          const user = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          console.log("user", user);
        } catch (error) {
          // alert("エラーが発生しました");
          // console.log("error.message", error.message);
          if (
            error.message ===
            "The email address is already in use by another account."
          ) {
            Alert.alert("すでに登録されているメールアドレスです。");
          } else if (
            error.message === "Password should be at least 6 characters"
          ) {
            Alert.alert("パスワードは6文字以上で登録してください。");
          } else {
            Alert.alert("エラーです。異る入力内容でもう一度お試しください");
            console.log(error.message);
            console.log("user", user);
          }
        }
      };
      handleRegister();
      // firebase
      //   .auth()
      //   .createUserWithEmailAndPassword(email, password)
      // .then((user) => {
      //   if (user) {
      //     Alert.alert("アカウントの登録が完了しました");
      //     // dispatch(
      //     //   signInAction({ userEmail: email, userPassword: password })
      //     // );
      //     return;
      //   }
      // .catch((error) => {
      // if (
      //   error.message ===
      //   "The email address is already in use by another account."
      // ) {
      //   Alert.alert("すでに登録されているメールアドレスです。");
      // } else if (
      //   error.message === "Password should be at least 6 characters"
      // ) {
      //   Alert.alert("パスワードは6文字以上で登録してください。");
      // } else {
      //   Alert.alert("エラーです。異る入力内容でもう一度お試しください");
      //   console.log(error.message);
      // }
      // });
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
      {/* <View style={styles.view}>
        <TextInput
          style={styles.textInput}
          onChangeText={setUserName}
          value={userName}
          placeholder="名前を入力してください"
          autoCapitalize="none"
        />
      </View> */}
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={signUp}
        disabled={!email || !password}
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
