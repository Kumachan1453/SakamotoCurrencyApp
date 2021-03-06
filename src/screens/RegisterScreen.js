import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  jpCheck,
  blankCheck,
  checkNgWord,
  checkEmailFormat,
} from "../components/IfText";
import { RegisterButton } from "../components/RegisterButton";
import { LoginButton } from "../components/LoginButton";
import { auth, db } from "../components/Firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { Warning } from "../components/Warning";
import { useIsFocused } from "@react-navigation/native";
import { useStateIfMounted } from "use-state-if-mounted";

export const RegisterScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const signError = false;

  const userNameLength = userName.length;
  const userPasswordLength = password.length;

  const coinOwnership = 10000;
  const monthlyCoinUsage = 0;
  const sendingCoin = 0;
  const ranking = 0;
  const sumCoinUsage = 0;
  const updateNumber = 0;

  const [userDataName, setUserDataName] = useStateIfMounted([]);
  const [userDataEmail, setUserDataEmail] = useStateIfMounted([]);

  const isJapanese = jpCheck(email);
  const isBlankUserName = blankCheck(userName);
  const isBlankEmail = blankCheck(email);
  const isEmailFormat = checkEmailFormat(email);
  const isBlankPassword = blankCheck(password);
  const isNgWord = checkNgWord(userName);

  const usersName = [];
  useEffect(() => {
    (async () => {
      const getUserData = await getDocs(collection(db, "users"));
      getUserData.forEach((docs) => {
        usersName.push(docs.data().name);
      });
      setUserDataName(usersName);
    })();
  }, [isFocused]);
  const nameConflict = () => {
    const regexNameConflict = userDataName.some(
      (element) => element === userName
    );
    return regexNameConflict;
  };
  const isNameConflict = nameConflict(userName);

  const usersEmail = [];
  useEffect(() => {
    (async () => {
      const getUserData = await getDocs(collection(db, "users"));
      getUserData.forEach((docs) => {
        usersEmail.push(docs.data().email);
      });
      setUserDataEmail(usersEmail);
    })();
  }, [isFocused]);
  const emailConflict = () => {
    const regexEmailConflict = userDataEmail.some(
      (element) => element === email
    );
    return regexEmailConflict;
  };
  const isEmailConflict = emailConflict(email);

  const signUp = () => {
    if (
      isJapanese ||
      isBlankEmail ||
      isEmailFormat ||
      isBlankPassword ||
      isBlankUserName ||
      isNameConflict ||
      isEmailConflict ||
      isNgWord ||
      userNameLength > 8 ||
      userPasswordLength < 6
    ) {
      signError = true;
      return;
    } else {
      const handleRegister = async (user) => {
        try {
          await addDoc(collection(db, "users"), {
            name: userName,
            email: email,
            password: password,
            coinOwnership: coinOwnership,
            monthlyCoinUsage: monthlyCoinUsage,
            sendingCoin: sendingCoin,
            ranking: ranking,
            sumCoinUsage: sumCoinUsage,
            updateNumber: updateNumber,
            time: new Date().toLocaleString(),
          });
          await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
          if (
            error.message ===
            "The email address is already in use by another account."
          ) {
            signError = true;
            Alert.alert("すでに登録されているメールアドレスです。");
          } else if (
            error.message === "Password should be at least 6 characters"
          ) {
            signError = true;
            Alert.alert("パスワードは6文字以上で登録してください。");
          } else {
            signError = true;
            Alert.alert("エラーです。異なる入力内容でもう一度お試しください");
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
        <Text>名前（8文字以内）</Text>
        <TextInput
          style={
            isNgWord || isNameConflict || userNameLength > 8
              ? styles.errorTextInput
              : styles.textInput
          }
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
        {userNameLength > 8 && <Warning letter={"名前が8文字を超えています"} />}
      </View>
      <View style={styles.view}>
        <Text>メールアドレス</Text>
        <TextInput
          style={
            isJapanese || (!isBlankEmail && isEmailFormat) || isEmailConflict
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
        {isEmailConflict && (
          <Warning letter={"メールアドレスが他のユーザーと重複しています"} />
        )}
      </View>

      <View style={styles.view}>
        <Text>パスワード（6文字以上）</Text>
        <TextInput
          style={
            userPasswordLength < 6 && !isBlankPassword
              ? styles.errorTextInput
              : styles.textInput
          }
          onChangeText={setPassword}
          value={password}
          placeholder="パスワードを入力してください"
          secureTextEntry={true}
          autoCapitalize="none"
        />
        {!isBlankPassword && userPasswordLength < 6 && (
          <Warning letter={"パスワードは6文字以上にしてください"} />
        )}
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
            isNgWord ||
            isNameConflict ||
            isEmailConflict ||
            userNameLength > 8 ||
            userPasswordLength < 6
          }
          text={"新規登録"}
        />
      </View>
      <Text style={styles.allertText}>
        ※新規登録後にこれらの記入事項を変更することはできません。ご注意ください。
      </Text>
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
  allertText: {
    fontSize: 18,
    padding: 20,
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
