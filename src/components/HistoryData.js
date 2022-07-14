import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase";

const HistoryData = [];

const getHistoryData = async () => {
  const getCollection = await getDocs(collection(db, "usersHistory"));
  getCollection.forEach((docs) => {
    HistoryData.push({
      name: docs.data().name,
      email: docs.data().email,
      recipientUserEmail: docs.data().recipientUserEmail,
      recipientUserId: docs.data().recipientUserId,
      recipientUserName: docs.data().recipientUserName,
      sendOrGift: docs.data().sendOrGift,
      sendingCoin: docs.data().sendingCoin,
      time: docs.data().time,
    });
  });
};
getHistoryData();

export { HistoryData };
