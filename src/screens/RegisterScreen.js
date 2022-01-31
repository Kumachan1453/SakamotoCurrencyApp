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
import { auth } from "../components/Firebase";

export const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log("user", user);
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
        onPress={handleRegister}
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

export default RegisterScreen;