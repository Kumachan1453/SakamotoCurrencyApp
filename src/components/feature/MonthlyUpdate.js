import React, { useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../Firebase";

export const MonthlyUpdate = () => {
  const getUserProfile = getAuth();
  const user = getUserProfile.currentUser;
  const email = user.email;

  const today = new Date();
  const firstDay = today.getDate() === 29;
  const onHours = today.getHours() === 13;
  const offHours = today.getHours() === 13;
  const offMinutes = today.getMinutes() === 59;

  const monthlyUpdate = async () => {
    const getData = doc(db, "users", "3cml6DnW3jPVmqLnnLkZ");
    const snapData = await getDoc(getData);
    if (firstDay && onHours && snapData.data().updateNumber < 1) {
      useEffect(() => {
        setCoinOwnership(
          snapData.data().coinOwnership * 0.95 +
            snapData.data().monthlyCoinUsage * 0.05
        );
        setMonthlyCoinUsage(0);
        setUpdateNumber(snapData.data().updateNumber + 1);
      }, onHours);
    } else if (offHours && offMinutes && snapData.data().updateNumber === 1) {
      useEffect(() => {
        updateDoc(getData, {
          updateNumber: snapData.data().updateNumber - 1,
        });
      });
    }
  };
  monthlyUpdate();
};

export default MonthlyUpdate;
