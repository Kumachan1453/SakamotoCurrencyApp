import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export const FriendSendButton = ({ content }) => {
  return (
    <View style={styles.listItemPlacement}>
      <View style={styles.listItemContainer}>
        <Text style={styles.listStyleText}>{content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItemPlacement: {
    alignItems: "center",
    margin: 20,
    flex: 1,
  },
  listItemContainer: {
    flexDirection: "row",
    width: 400,
    height: 90,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
  },
  listStyleText: {
    margin: 30,
    fontSize: 22,
    fontWeight: "400",
  },
  listTrashButton: {
    marginLeft: "auto",
    marginRight: 15,
    justifyContent: "center",
  },
});
