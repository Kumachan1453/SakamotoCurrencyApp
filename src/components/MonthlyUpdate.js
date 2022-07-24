//日付による更新の処理　【削除禁止】
import React, { useState, useEffect } from "react";
import { getDoc, doc, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../components/Firebase";

export const MonthlyUpdate = () => {
  const getUserProfile = getAuth();
  const user = getUserProfile.currentUser;
  const email = user.email;

  const today = new Date();
  const firstDay = today.getDate() === 1;
  const onMinutes = today.getMinutes() === 50;
  const offMinutes = today.getMinutes() === 19;
  const onHours = today.getHours() === 9;
  const offHours = today.getHours() === 9;

  const [onHours2, setOnHours2] = useState(onHours);

  const monthlyUpdate = async () => {
    const getData = doc(db, "users", "LGXdrQNczf95rT90Tp2R");
    const snapData = await getDoc(getData);
    if (onHours && snapData.data().updateNumber < 1) {
      useEffect(() => {
        setCoinOwnership(
          snapData.data().coinOwnership * 0.9 +
            snapData.data().monthlyCoinUsage * 0.05
        );
        setMonthlyCoinUsage(0);
        setUpdateNumber(snapData.data().updateNumber + 1);
        // updateDoc(getData, {
        //   coinOwnership:
        //     snapData.data().coinOwnership * 0.9 +
        //     snapData.data().monthlyCoinUsage * 0.05,
        //   monthlyCoinUsage: (snapData.data().monthlyCoinUsage = 0),
        //   updateNumber: snapData.data().updateNumber + 1,
        // });
      }, onHours);
    } else if (offHours && snapData.data().updateNumber === 1) {
      useEffect(() => {
        updateDoc(getData, {
          updateNumber: snapData.data().updateNumber - 1,
        });
      });
    }
  };
  monthlyUpdate();

  useLayoutEffect(() => {
    const monthlyUpdate = async () => {
      const getData = doc(db, "users", "LGXdrQNczf95rT90Tp2R");
      const snapData = await getDoc(getData);
      if (onHours && snapData.data().updateNumber < 1) {
        updateDoc(getData, {
          coinOwnership:
            snapData.data().coinOwnership * 0.9 +
            snapData.data().monthlyCoinUsage * 0.05,
          monthlyCoinUsage: (snapData.data().monthlyCoinUsage = 0),
          updateNumber: snapData.data().updateNumber + 1,
        });
      } else if (offHours && offMinutes && snapData.data().updateNumber === 1) {
        updateDoc(getData, {
          updateNumber: snapData.data().updateNumber - 1,
        });
      }
    };
    monthlyUpdate();
  }, []);
};
//ここまで

export default MonthlyUpdate;
