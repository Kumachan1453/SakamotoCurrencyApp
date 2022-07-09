import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import LeafImage from "../components/Image/iconleaf.png";

export const LeafCoinMini = ({ width, height }) => {
  const leaf = Image.resolveAssetSource(LeafImage).uri;
  return (
    <View style={styles.leaf}>
      <Image
        style={{
          width: width,
          height: height,
        }}
        source={{ uri: leaf }}
      />
      <Text style={styles.unitText}>Kon</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  leaf: {
    position: "relative",
  },
  unitText: {
    position: "absolute",
    top: "27%",
    left: "24%",
    fontWeight: "800",
    fontSize: 10,
    color: "white",
  },
});

export default LeafCoinMini;
