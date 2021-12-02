import React from "react";
import { StyleSheet, TextInput } from "react-native";

export const TextInputTemplate = ({ placeholder }) => {
  return <TextInput style={styles.textInput} placeholder={placeholder} />;
};

const styles = StyleSheet.create({
  textInput: {
    width: 230,
    height: 35,
    borderBottomWidth: 1,
    borderColor: "gray",
    padding: 10,
  },
});

export default TextInputTemplate;
