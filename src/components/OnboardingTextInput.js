import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { jpCheck, blankCheck, checkEmailFormat } from "../components/IfText";

export const OnboardingTextInput = ({
  signError,
  onChangeText,
  value,
  placeholder,
  autoCapitalize,
  autoCorrect,
  secureTextEntry,
}) => {
  <View>
    <View style={styles.view}>
      <TextInput
        //style={setSignError(true) ? styles.errorTextInput : styles.textInput}と記述すると無限ループに関するエラーが発生する。
        style={signError ? styles.errorTextInput : styles.textInput}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        secureTextEntry={secureTextEntry}
      />
    </View>
  </View>;
};

const styles = StyleSheet.create({
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
});
