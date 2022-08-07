import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase";

export const GetHistoryData = async ({ array }) => {
  const getCollection = await getDocs(collection(db, "usersHistory"));
  getCollection.forEach((docs) => {
    array.push({
      name: docs.data().name,
      email: docs.data().email,
      recipientUserEmail: docs.data().recipientUserEmail,
      recipientUserId: docs.data().recipientUserId,
      recipientUserName: docs.data().recipientUserName,
      sendOrGift: docs.data().sendOrGift,
      sendingCoin: docs.data().sendingCoin,
      thanksText: docs.data().thanksText,
      time: docs.data().time,
      id: docs.id,
    });
  });
};

export default GetHistoryData;
