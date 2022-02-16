import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/Firebase";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("エラーが発生しました");
      console.log(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.keyboardAvoidingView}
    >
      <Text style={styles.textUsersLogin}>ログイン画面</Text>
      <View style={styles.view}>
        <TextInput
          style={styles.textInputEmail}
          onChangeText={setEmail}
          value={email}
          placeholder="メールアドレスを入力してください"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View style={styles.view}>
        <TextInput
          style={styles.textInputPassword}
          onChangeText={setPassword}
          value={password}
          placeholder="パスワードを入力してください"
          secureTextEntry={true}
          autoCapitalize="none"
        />
      </View>
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={handleLogin}
        disabled={!email || !password}
      >
        <Text style={styles.textStyleInTouchableOpacity}>ログイン</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 10 }}
        onPress={() => navigation.navigate("Register")}
      >
        <Text>ユーザ登録はこちら</Text>
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
  textUsersLogin: {
    fontSize: 20,
    marginBottom: 20,
  },
  view: {
    marginBottom: 20,
  },
  textInputEmail: {
    width: 250,
    borderWidth: 1,
    padding: 5,
    borderColor: "gray",
  },
  textInputPassword: {
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
