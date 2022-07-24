import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/Firebase";
import { LoginButton } from "../components/LoginButton";
import { RegisterButton } from "../components/RegisterButton";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("メールアドレスもしくはパスワードが間違っています。");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.keyboardAvoidingView}
    >
      <Text style={styles.textUsersLogin}>ログイン画面</Text>
      <View style={styles.view}>
        <Text>メールアドレス</Text>
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
        <Text>パスワード</Text>
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
        <RegisterButton
          onPress={() => navigation.navigate("Register")}
          text={"新規登録"}
        />
        <LoginButton
          onPress={handleLogin}
          disabled={!email || !password}
          text={"ログイン"}
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
  textUsersLogin: {
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
  LoginAndRegister: {
    flexDirection: "row",
  },
});
