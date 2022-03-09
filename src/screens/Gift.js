import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { FriendButton } from "../components/FriendButton";
import TextTemplateYourCoinRerated from "../components/TextTemplateYourCoinRerated";
import {
  getDoc,
  doc,
  updateDoc,
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
import { db } from "../components/Firebase";
import ModalTemplete from "../components/ModalTemplete";

export const Gift = () => {
  const [giftListData, setGiftListData] = useState([]);
  useEffect(async () => {
    const sendGift = collection(db, "coins");
    const querySnapshot = await getDocs(sendGift);
    const array = [];
    querySnapshot.forEach((docs) => {
      array.push({
        name: docs.data().name,
        sendingCoin: docs.data().sendingCoin,
        subId: docs.data().subId,
        recipientUserId: docs.data().recipientUserId,
        id: docs.id,
        time: docs.data().time,
      });
    });
    setGiftListData(array);
  });

  const FirstDay = "11/1";
  const LastDay = "11/30";
  const friendName = "damy-friend";
  const unit = "C";
  const [coinOwnership, setCoinOwnership] = useState(0);
  const [monthlyCoinUsage, setMonthlyCoinUsage] = useState(0);

  const isFocused = useIsFocused();

  useEffect(async () => {
    const getData = doc(db, "users", "LGXdrQNczf95rT90Tp2R");
    const snapData = await getDoc(getData);
    setCoinOwnership(Math.round(snapData.data().coinOwnership));
    setMonthlyCoinUsage(Math.round(snapData.data().monthlyCoinUsage));
  }, [isFocused, () => updateData()]);

  const updateData = async (item) => {
    const getData = doc(db, "users", "LGXdrQNczf95rT90Tp2R");
    console.log("updateData-A");
    await updateDoc(getData, {
      coinOwnership: coinOwnership + item.sendingCoin,
    });
    console.log("updateData-B");
  };
  const deleteData = async (item) => {
    // const array = giftListData.filter((task) => {
    //   return task.id !== item.id;
    // });
    // setGiftListData(array);
    // console.log("task.id", task.id);
    await deleteDoc(doc(db, "coins", item.id));
  };
  const onPressAction = async (item) => {
    // setModalVisible(true);
    updateData(item);
    deleteData(item);
  };

  return (
    <>
      <View style={styles.content}>
        <TextTemplateYourCoinRerated
          letter="あなたの所持コイン数"
          numberOfCoin={coinOwnership}
          unit="C"
        />
        <TextTemplateYourCoinRerated
          letter="あなたのコイン使用量"
          subText1="集計期間"
          date1={FirstDay}
          subText2="〜"
          date2={LastDay}
          numberOfCoin={monthlyCoinUsage}
          unit="C"
        />
        <View style={styles.line} />
        <Text style={styles.bigText}>コインが届いています</Text>
        <Text style={styles.subText}>
          ※送られた日から一週間以内に受け取らなければ消滅します
        </Text>
      </View>

      <View style={styles.centeredView}>
        <FlatList
          data={giftListData}
          renderItem={({ item }) => {
            if (item.recipientUserId === "LGXdrQNczf95rT90Tp2R") {
              return (
                <>
                  {/* <ModalTemplete
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => {
                      Alert.alert("Modal has been closed.");
                      setModalVisible(!modalVisible);
                    }}
                    centerText={{ item } + "Cを受け取りますか？"}
                    // subCenterText={subCenterText}
                    buttonPlacement={true}
                    leftText={"受け取らない"}
                    rightText={"受け取る"}
                    leftOnPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                    rightOnPress={() => {
                      setModalVisible(!modalVisible);
                      // deleteTask(item);
                      setItemId(item.id);
                      updateData();
                      console.log("item.id -inRightOnPress", item.id);
                    }}
                  /> */}
                  <FriendButton
                    onPress={() => onPressAction(item)}
                    friendName={item.name}
                    coin={item.sendingCoin}
                    unit={unit}
                    time={item.time}
                  />
                </>
              );
            }
          }}
          // keyExtractor={(item) => item.key}
          keyExtractor={(item) => item.id}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  // content: {
  //   alignItems: "center",
  // },
  bigText: {
    fontWeight: "bold",
    fontSize: 20,
    margin: 10,
    marginTop: 20,
  },
  bigCoinText: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
    marginBottom: 30,
  },
  subText: {
    color: "#808080",
  },
  flexDirectionRow: {
    flexDirection: "row",
  },
  line: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "gray",
    margin: 20,
  },

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
  thanksTextStyle: {
    color: "gray",
    marginBottom: 15,
  },
});

export default Gift;
