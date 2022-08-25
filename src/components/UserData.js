import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "./Firebase";

export const GetUserData = async ({ array }) => {
  const getCollection = await getDocs(collection(db, "users"));
  getCollection.forEach((docs) => {
    array.push({
      id: docs.id,
      name: docs.data().name,
      email: docs.data().email,
      coinOwnership: docs.data().coinOwnership,
      monthlyCoinUsage: docs.data().monthlyCoinUsage,
      sumCoinUsage: docs.data().sumCoinUsage,
      countDown: docs.data().countDown,
      time: docs.data().time,
      authId: auth.currentUser.uid,
    });
  });
};

export default GetUserData;
