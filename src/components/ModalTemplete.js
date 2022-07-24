import React from "react";
import { StyleSheet, View, Text, Modal, TouchableOpacity } from "react-native";

export const ModalTemplete = ({
  transparent,
  visible,
  onRequestClose,
  centerText,
  subCenterText,
  buttonPlacement,
  leftText,
  rightText,
  leftOnPress,
  rightOnPress,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={transparent}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{centerText}</Text>
          <Text style={styles.subCenterText}>{subCenterText}</Text>
          <View
            style={
              buttonPlacement
                ? styles.twoButtonPlacement
                : styles.singleButtonPlacement
            }
          >
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={leftOnPress}
            >
              <Text style={styles.textStyle}>{leftText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={rightOnPress}
            >
              <Text style={styles.textStyle}>{rightText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 5,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    width: 100,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  twoButtonPlacement: {
    flexDirection: "row",
  },
  singleButtonPlacement: {
    alignItems: "center",
  },
  subCenterText: {
    color: "gray",
    marginBottom: 15,
  },
});

export default ModalTemplete;
