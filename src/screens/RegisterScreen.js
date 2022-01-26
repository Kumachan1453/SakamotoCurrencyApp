import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "./Firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB6srd7jvN3hCW5gFLc9yniGimACFTeni4",
  authDomain: "sakamotocurrencyapp.firebaseapp.com",
  projectId: "sakamotocurrencyapp",
  storageBucket: "sakamotocurrencyapp.appspot.com",
  messagingSenderId: "367955895931",
  appId: "1:367955895931:web:7041aac36e6138ddf764de",
  measurementId: "${config.measurementId}",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <Text style={{ fontSize: 20, marginBottom: 20 }}>ユーザ登録画面</Text>
      <View style={{ marginBottom: 20 }}>
        <TextInput
          style={{
            width: 250,
            borderWidth: 1,
            padding: 5,
            borderColor: "gray",
          }}
          onChangeText={setEmail}
          value={email}
          placeholder="メールアドレスを入力してください"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <TextInput
          style={{
            width: 250,
            borderWidth: 1,
            padding: 5,
            borderColor: "gray",
          }}
          onChangeText={setPassword}
          value={password}
          placeholder="パスワードを入力してください"
          secureTextEntry={true}
          autoCapitalize="none"
        />
      </View>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "#88cb7f",
          borderRadius: 10,
        }}
        onPress={handleRegister}
        disabled={!email || !password}
      >
        <Text style={{ color: "white" }}>登録する</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
