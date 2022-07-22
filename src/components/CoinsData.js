import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase";

const GetCoinsData = async ({ array }) => {
  const getCollection = await getDocs(collection(db, "coins"));
  getCollection.forEach((docs) => {
    array.push({
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

export default GetCoinsData;
