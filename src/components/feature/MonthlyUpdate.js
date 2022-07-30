import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../Firebase";

export const MonthlyUpdate = () => {
  const getUserProfile = getAuth();
  const user = getUserProfile.currentUser;
  const email = user.email;

  const today = new Date();
  const firstDay = today.getDate() === 29;
  const onHours = today.getHours() === 14;
  const offHours = today.getHours() === 14;
  const offMinutes = today.getMinutes() === 22;

  const monthlyUpdate = async () => {
    const getData = doc(db, "users", "3cml6DnW3jPVmqLnnLkZ");
    const snapData = await getDoc(getData);
    if (firstDay && onHours && snapData.data().updateNumber < 1) {
      updateDoc(getData, {
        coinOwnership:
          Math.round(snapData.data().coinOwnership * 0.95) +
          Math.round(snapData.data().monthlyCoinUsage * 0.05),
        monthlyCoinUsage: 0,
        updateNumber: snapData.data().updateNumber + 1,
      });
    } else if (offHours && offMinutes && snapData.data().updateNumber === 1) {
      updateDoc(getData, {
        updateNumber: snapData.data().updateNumber - 1,
      });
    }
  };
  monthlyUpdate();
};

export default MonthlyUpdate;
