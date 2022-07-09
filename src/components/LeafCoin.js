import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import LeafImage from "../components/Image/iconleaf.png";

export const LeafCoin = () => {
  const leaf = Image.resolveAssetSource(LeafImage).uri;
  return (
    <View style={styles.leaf}>
      <Image
        style={{
          width: 60,
          height: 60,
        }}
        source={{ uri: leaf }}
        // source={require("./assets/iconleaf.png")}
      />
      <Text style={styles.unitText}>Kon</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  leaf: {
    position: "relative",
    width: 100,
    height: 100,
    borderRadius: 80,
  },
  unitText: {
    position: "absolute",
    top: "17%",
    left: "13%",
    fontWeight: "900",
    fontSize: 18,
    color: "white",
  },
});

export default LeafCoin;
