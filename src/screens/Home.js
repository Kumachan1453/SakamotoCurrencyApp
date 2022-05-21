import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, ScrollView } from "react-native";
import CircleIcon from "../components/CircleIcon";
import TextTemplateYourCoinRerated from "../components/TextTemplateYourCoinRerated";
import LogoutButton from "../components/LogoutButton";
import { getDoc, doc, collection, query, getDocs } from "firebase/firestore";
import { onAuthStateChanged, signOut, getAuth } from "firebase/auth";
import { auth } from "../components/Firebase";
import { db } from "../components/Firebase";
import { useIsFocused } from "@react-navigation/native";
import { howMuchDouYouUseYourCoinThisMonth } from "../components/PatternText";

export const Home = () => {
  const isFocused = useIsFocused();

  const [name, setName] = useState("");
  const [coinOwnership, setCoinOwnership] = useState(0);
  const [monthlyCoinUsage, setMonthlyCoinUsage] = useState(0);
  const [ranking, setRanking] = useState("ランク外");

  const getUserProfile = getAuth();
  const user = getUserProfile.currentUser;
  const email = user.email;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
    } else {
    }
  });
  useEffect(async () => {
    const getCollection = await getDocs(collection(db, "users"));
    const array = [];
    getCollection.forEach((docs) => {
      array.push({ email: docs.data().email, id: docs.id });
    });
    const loginFilter = array.filter((login) => {
      return email === login.email;
    });
    const getData = doc(db, "users", loginFilter[0].id);
    const snapData = await getDoc(getData);
    setName(snapData.data().name);
    setCoinOwnership(Math.round(snapData.data().coinOwnership));
    setMonthlyCoinUsage(Math.round(snapData.data().monthlyCoinUsage));
    setRanking(Math.round(snapData.data().ranking));
  }, [isFocused]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("logout");
      })
      .catch((error) => {
        console.log("error.message", error.message);
      });
  };

  return (
    <ScrollView>
      <View style={styles.content}>
        <View style={styles.center}>
          <View style={styles.profile}>
            <View style={styles.profileCategory}>
              <Text style={styles.headingText}>ユーザー名</Text>
              <Text style={styles.profileText}>{name}</Text>
            </View>
            <View style={styles.profileCategory}>
              <Text style={styles.headingText}>メールアドレス</Text>
              <Text style={styles.profileText}>{email}</Text>
            </View>
          </View>
          <View style={styles.line} />
        </View>
        <TextTemplateYourCoinRerated
          letter="あなたの所持コイン数："
          numberOfCoin={coinOwnership}
          unit="K"
        />
        <View style={styles.line} />
        <TextTemplateYourCoinRerated
          letter={howMuchDouYouUseYourCoinThisMonth}
          numberOfCoin={monthlyCoinUsage}
          unit="K"
        />
        <View style={styles.line} />
        <View style={styles.logoutPlacement}>
          <LogoutButton onPress={handleLogout} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    marginTop: 10,
  },
  alignItemsCenter: {
    alignItems: "center",
  },
  profileCategory: {
    margin: 15,
  },
  profileText: {
    fontSize: 28,
  },
  CircleIconPlacement: {
    marginTop: 30,
  },
  textBox: {
    width: 230,
    height: 60,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 15,
  },
  headingText: {
    fontWeight: "bold",
    fontSize: 13,
    marginTop: 20,
    marginBottom: 10,
    color: "gray",
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
    marginTop: 20,
  },
  logoutPlacement: {
    alignItems: "center",
    marginTop: 50,
  },
});

export default Home;
