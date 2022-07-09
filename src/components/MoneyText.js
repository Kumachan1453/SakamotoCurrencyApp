import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LeafCoin from "./LeafCoin";

export const MoneyText = ({ money }) => {
  return (
    <View style={styles.unitFlexDirectionRow}>
      <Text style={styles.profileText}>{money}</Text>
      <LeafCoin />
    </View>
  );
};

const styles = StyleSheet.create({
  unitFlexDirectionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    // backgroundColor: "green",
  },
  profileText: {
    fontSize: 28,
    // backgroundColor: "pink",
    top: 10,
  },
});

export default MoneyText;
