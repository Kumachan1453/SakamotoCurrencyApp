import React from "react";
import { StyleSheet, View, Text } from "react-native";
import LeafCoinMini from "./LeafCoinMini";

export const TextTemplateYourCoinRerated = ({
  letter,
  numberOfCoin,
  subText1,
  subText2,
  date1,
  date2,
  unit,
}) => {
  return (
    <View style={styles.content}>
      <Text style={styles.bigText}>{letter}</Text>
      <View style={styles.justifycontentFlexEnd}>
        <View style={styles.flexDirectionRow}>
          <Text style={styles.bigCoinText}>{numberOfCoin}</Text>
          {unit === true && <LeafCoinMini width={35} height={35} />}
        </View>
      </View>
      <View style={styles.flexDirectionRow}>
        <Text style={styles.subText}>{subText1}</Text>
        <Text style={styles.subText}>{date1}</Text>
        <Text style={styles.subText}>{subText2}</Text>
        <Text style={styles.subText}>{date2}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  justifycontentFlexEnd: {
    justifyContent: "flex-end",
    marginRight: 5,
  },
  bigText: {
    fontSize: 18,
    margin: 3,
  },
  bigCoinText: {
    fontSize: 18,
    top: 7,
  },
  subText: {
    color: "#808080",
  },
  flexDirectionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  line: {
    width: "100%",
    borderBottomWidth: 0.5,
    borderColor: "gray",
  },
});

export default TextTemplateYourCoinRerated;
