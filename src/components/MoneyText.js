import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LeafCoin from "./LeafCoin";

export const MoneyText = ({ numberOfCoin }) => {
  return (
    <View style={styles.unitFlexDirectionRow}>
      <Text style={styles.profileText}>{numberOfCoin}</Text>
      <LeafCoin width={55} height={55} />
    </View>
  );
};

const styles = StyleSheet.create({
  unitFlexDirectionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  profileText: {
    fontSize: 28,
    top: 10,
  },
});

export default MoneyText;
