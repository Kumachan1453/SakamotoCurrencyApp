import React, { useEffect, useState } from "react";
import { View, TextInput, Text, StyleSheet, Alert } from "react-native";
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
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { Warning } from "../components/Warning";
import { useIsFocused } from "@react-navigation/native";
import { useStateIfMounted } from "use-state-if-mounted";
import { dateText } from "../components/Date";
import LoadingScreen from "../components/LoadingScreen";
import {
  alertEmailConflict,
  alertEmailFormat,
  alertLessPassword,
  alertNicknameConflict,
  checkInappropriateWord,
  enterEmail,
  enterNickname,
  enterPassword,
  exceedNickname,
  includeJapanese,
  login,
  newRegistration,
  nickname,
  overCharacter,
  textOfEmailAddress,
  textOfPassword,
  textOfRegisterScreen,
  warningDetail,
} from "../components/SupportedLanguages";
import { Ionicons } from "@expo/vector-icons";

export const RegisterScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isRevealPassword, setIsRevealPassword] = useState(true);

  const userNameLength = userName.length;
  const userPasswordLength = password.length;

  const coinOwnership = 10000;
  const monthlyCoinUsage = 0;
  const sendingCoin = 0;
  const ranking = 0;
  const sumCoinUsage = 0;
  const updateNumber = 0;
  const countDown = 600;

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

  const makeAccount = async () => {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      name: userName,
      email: email,
      coinOwnership: coinOwnership,
      monthlyCoinUsage: monthlyCoinUsage,
      sendingCoin: sendingCoin,
      ranking: ranking,
      sumCoinUsage: sumCoinUsage,
      updateNumber: updateNumber,
      countDown: countDown,
      time: dateText,
    });
    setLoading(false);
  };

  const signUp = () => {
    setLoading(true);
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
      setLoading(false);
      return;
    } else {
      const handleRegister = async (user) => {
        if (isButtonDisabled === false) {
          setLoading(true);
          setIsButtonDisabled(true);
          setIsLoginButtonDisabled(true);
        }
        try {
          await makeAccount();
        } catch (error) {
          if (
            !isJapanese ||
            !isBlankEmail ||
            !isEmailFormat ||
            !isBlankPassword ||
            !isBlankUserName ||
            !isNameConflict ||
            !isEmailConflict ||
            !isNgWord ||
            !userNameLength > 8 ||
            !userPasswordLength < 6
          ) {
            setLoading(false);
            setIsButtonDisabled(false);
          }
          setIsLoginButtonDisabled(false);
          setLoading(false);
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
            Alert.alert("エラーです。異なる入力内容でもう一度お試しください");
          }
        }
        setLoading(false);
        setIsLoginButtonDisabled(false);
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

  if (loading) {
    return <LoadingScreen />;
  } else {
    return (
      <View behavior="padding" style={styles.contentsView}>
        <Text style={styles.textUsersRegister}>{textOfRegisterScreen}</Text>
        <View style={styles.view}>
          <Text>{nickname}</Text>
          <TextInput
            style={
              isNgWord || isNameConflict || userNameLength > 8
                ? styles.errorTextInput
                : styles.textInput
            }
            onChangeText={setUserName}
            value={userName}
            placeholder={enterNickname}
            autoCapitalize="none"
          />
          {isNgWord && <Warning letter={checkInappropriateWord} />}
          {isNameConflict && <Warning letter={alertNicknameConflict} />}
          {userNameLength > 8 && <Warning letter={exceedNickname} />}
        </View>
        <View style={styles.view}>
          <Text>{textOfEmailAddress}</Text>
          <TextInput
            style={
              isJapanese || (!isBlankEmail && isEmailFormat) || isEmailConflict
                ? styles.errorTextInput
                : styles.textInput
            }
            onChangeText={setEmail}
            value={email}
            placeholder={enterEmail}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {isJapanese && <Warning letter={includeJapanese} />}
          {!isBlankEmail && !isJapanese && isEmailFormat && (
            <Warning letter={alertEmailFormat} />
          )}
          {isEmailConflict && <Warning letter={alertEmailConflict} />}
        </View>

        <View style={styles.view}>
          <Text>{textOfPassword + " " + overCharacter}</Text>
          <View style={styles.contentsEyeOnOff}>
            <TextInput
              style={
                userPasswordLength < 6 && !isBlankPassword
                  ? styles.errorTextInput
                  : styles.textInput
              }
              onChangeText={setPassword}
              value={password}
              placeholder={enterPassword}
              secureTextEntry={isRevealPassword ? true : false}
              autoCapitalize="none"
            />
            {isRevealPassword === true && (
              <Ionicons
                name="md-eye-off"
                size={20}
                onPress={() => setIsRevealPassword(false)}
              />
            )}
            {isRevealPassword === false && (
              <Ionicons
                name="md-eye"
                size={20}
                onPress={() => setIsRevealPassword(true)}
              />
            )}
          </View>
          {!isBlankPassword && userPasswordLength < 6 && (
            <Warning letter={alertLessPassword} />
          )}
        </View>
        <View style={styles.LoginAndRegister}>
          <LoginButton
            onPress={() => navigation.navigate("Login")}
            disabled={isLoginButtonDisabled === true}
            text={login}
          />
          <RegisterButton
            onPress={signUp}
            disabled={
              isButtonDisabled === true ||
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
            text={newRegistration}
          />
        </View>
        <Text style={styles.allertText}>{warningDetail}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  contentsView: {
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
  contentsEyeOnOff: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default RegisterScreen;
