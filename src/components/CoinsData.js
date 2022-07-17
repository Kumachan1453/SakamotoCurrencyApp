import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase";

const coinsData = [];

const getCoinsData = async () => {
  const getCollection = await getDocs(collection(db, "coins"));
  getCollection.forEach((docs) => {
    coinsData.push({
      name: docs.data().name,
      email: docs.data().email,
      recipientUserEmail: docs.data().recipientUserEmail,
      recipientUserId: docs.data().recipientUserId,
      sendingCoin: docs.data().sendingCoin,
      subId: docs.data().subId,
      time: docs.data().time,
      id: docs.id,
    });
  });
};
getCoinsData();

export { coinsData };
