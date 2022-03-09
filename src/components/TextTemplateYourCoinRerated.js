import React from "react";
import { StyleSheet, View, Text } from "react-native";

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
      <View style={styles.flexDirectionRow}>
        <Text style={styles.bigText}>{letter}</Text>
        <View style={styles.justifycontentFlexEnd}>
          <View style={styles.flexDirectionRow}>
            <Text style={styles.bigCoinText}>{numberOfCoin}</Text>
            <Text style={styles.bigCoinText}>{unit}</Text>
          </View>
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
  },
  bigText: {
    // fontWeight: "bold",
    fontSize: 18,
    margin: 10,
    marginTop: 10,
  },
  bigCoinText: {
    // fontWeight: "bold",
    fontSize: 18,
    // marginTop: 10,
    marginBottom: 10,
  },
  subText: {
    color: "#808080",
  },
  flexDirectionRow: {
    flexDirection: "row",
  },
  line: {
    width: "100%",
    borderBottomWidth: 0.5,
    borderColor: "gray",
  },
  // content: {
  //   alignItems: "center",
  // },
  // bigText: {
  //   fontWeight: "bold",
  //   fontSize: 20,
  //   margin: 10,
  //   marginTop: 20,
  // },
  // bigCoinText: {
  //   fontWeight: "bold",
  //   fontSize: 20,
  //   marginTop: 10,
  //   marginBottom: 30,
  // },
  // subText: {
  //   color: "#808080",
  // },
  // flexDirectionRow: {
  //   flexDirection: "row",
  // },
  // line: {
  //   width: "100%",
  //   borderBottomWidth: 1,
  //   borderColor: "gray",
  // },
});

export default TextTemplateYourCoinRerated;
