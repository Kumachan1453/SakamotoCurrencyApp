import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";

export const UserData = [];
const getUserData = async () => {
  const getCollection = await getDocs(collection(db, "users"));
  getCollection.forEach((docs) => {
    UserData.push({
      id: docs.id,
      name: docs.data().name,
      email: docs.data().email,
      password: docs.data().password,
      coinOwnership: docs.data().coinOwnership,
      monthlyCoinUsage: docs.data().monthlyCoinUsage,
      sumCoinUsage: docs.data().sumCoinUsage,
    });
  });
};
getUserData();

export default UserData;
