import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase";

export const GetUserData = async ({ array }) => {
  const getCollection = await getDocs(collection(db, "users"));
  getCollection.forEach((docs) => {
    array.push({
      id: docs.id,
      name: docs.data().name,
      email: docs.data().email,
      password: docs.data().password,
      coinOwnership: docs.data().coinOwnership,
      monthlyCoinUsage: docs.data().monthlyCoinUsage,
      sumCoinUsage: docs.data().sumCoinUsage,
      time: docs.data().time,
    });
  });
};

export default GetUserData;
