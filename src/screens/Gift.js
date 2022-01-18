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
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDoc,
  doc,
  docs,
  updateDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { Button } from "../components/Button";
import ModalTemplete from "../components/ModalTemplete";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB6srd7jvN3hCW5gFLc9yniGimACFTeni4",
  authDomain: "sakamotocurrencyapp.firebaseapp.com",
  projectId: "sakamotocurrencyapp",
  storageBucket: "sakamotocurrencyapp.appspot.com",
  messagingSenderId: "367955895931",
  appId: "1:367955895931:web:7041aac36e6138ddf764de",
  measurementId: "${config.measurementId}",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// const analytics = getAnalytics(app);

export const Gift = ({ item }) => {
  const route = useRoute();
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
        userId: docs.data().userId,
      });
    });
    setGiftListData(array);
  });

  // useEffect(async () => {
  //   const getDatas = collection(db, "users");
  //   const querySnapshot = await getDocs(getDatas);
  //   const array = [];
  //   querySnapshot.forEach((docs) => {
  //     array.push({
  //       name: docs.data().name,
  //       sendingCoin: docs.data().sendingCoin,
  //       id: docs.id,
  //     });
  //   });
  //   setGiftListData(array);
  // }, []);
  // const arrayTest = [
  //   { name: "Satou", sendingCoin: 1000, id: 1 },
  //   { name: "Ota", sendingCoin: 5000, id: 2 },
  //   { name: "Ziro", sendingCoin: 10000, id: 3 },
  // ];
  // console.log("arrayTest[0].sendingCoin", arrayTest[0].sendingCoin);
  const FirstDay = "11/1";
  const LastDay = "11/30";
  const friendName = "damy-friend";
  // const giftCoin = 2000;
  // const timelimit = 3;
  const unit = "C";

  // const [modalVisible, setModalVisible] = useState(false);

  const [coinOwnership, setCoinOwnership] = useState(0);
  const [monthlyCoinUsage, setMonthlyCoinUsage] = useState(0);

  const [itemId, setItemId] = useState(item);

  const isFocused = useIsFocused();

  useEffect(async () => {
    const getData = doc(db, "users", "LGXdrQNczf95rT90Tp2R");
    const snapData = await getDoc(getData);
    setCoinOwnership(Math.round(snapData.data().coinOwnership));
    setMonthlyCoinUsage(Math.round(snapData.data().monthlyCoinUsage));
  }, [isFocused]);

  useEffect(async () => {
    const getData = doc(db, "users", "LGXdrQNczf95rT90Tp2R");
    const snapData = await getDoc(getData);
    setCoinOwnership(Math.round(snapData.data().coinOwnership));
    setMonthlyCoinUsage(Math.round(snapData.data().monthlyCoinUsage));
  }, [() => updateData()]);

  // const [subId, setSubId] = useState(1);
  // const addGiftlist = async () => {
  //   const getData = collection(db, "users");
  //   const snapData = await getDoc(getData);
  //   if (snapData.data().sendingCoin === 0) {
  //     return false;
  //   }
  //   setSubId(subId + 1);
  //   setGiftListData([
  //     {
  //       subId: subId,
  //       name: docs.data().name,
  //       sendingCoin: docs.data().sendingCoin,
  //       id: docs.id,
  //     },
  //   ]);
  // };

  // const filter = (item) => {
  //   if (item.sendingCoin === 0) {
  //     let giftFilter = giftListData.filter((list) => {
  //       return list.id !== item.id;
  //     });
  //     setGiftListData(giftFilter);
  //   }
  // };
  // filter();

  // const deleteTask = (item) => {
  //   let array = arrayTest.filter((task) => {
  //     return task.id !== item.id;
  //   });
  //   setGiftList(array);
  // };

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
            const updateData = async () => {
              const getData = doc(db, "users", "LGXdrQNczf95rT90Tp2R");
              await updateDoc(getData, {
                coinOwnership: coinOwnership + item.sendingCoin,
              });
              console.log("item.id -inUpdateData", item.id);
            };
            const onPressAction = (item) => {
              // setModalVisible(true);
              setItemId(item.id);
              updateData();
              // deleteTask(item);
              console.log("item.id -inOnPressAction", item.id);
            };
            // console.log("item.sendingCoin", item.sendingCoin);
            if (item.userId === "LGXdrQNczf95rT90Tp2R") {
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
                  />
                </>
              );
            }
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
  },
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
