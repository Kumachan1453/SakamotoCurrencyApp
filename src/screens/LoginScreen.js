import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/Firebase";
import { LoginButton } from "../components/LoginButton";
import { RegisterButton } from "../components/RegisterButton";
import { useStateIfMounted } from "use-state-if-mounted";
import {
  alertEmailOrPassword,
  enterEmail,
  enterPassword,
  login,
  newRegistration,
  textOfEmailAddress,
  textOfLoginScreen,
  textOfPassword,
} from "../components/SupportedLanguages";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useStateIfMounted(false);
  const handleLogin = () => {
    if (isButtonDisabled === false) {
      setIsButtonDisabled(true);
    }
    const login = async () => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        alert(alertEmailOrPassword);
      }
    };
    login();
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 2000);
  };

  return (
    <View behavior="padding" style={styles.contentsView}>
      <Text style={styles.textUsersLogin}>{textOfLoginScreen}</Text>
      <View style={styles.view}>
        <Text>{textOfEmailAddress}</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={setEmail}
          value={email}
          placeholder={enterEmail}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View style={styles.view}>
        <Text>{textOfPassword}</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={setPassword}
          value={password}
          placeholder={enterPassword}
          secureTextEntry={true}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.LoginAndRegister}>
        <RegisterButton
          onPress={() => navigation.navigate("Register")}
          disabled={isButtonDisabled === true}
          text={newRegistration}
        />
        <LoginButton
          onPress={handleLogin}
          disabled={isButtonDisabled === true || !email || !password}
          text={login}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentsView: {
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
