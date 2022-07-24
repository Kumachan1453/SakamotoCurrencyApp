import { collection, getDocs, doc } from "firebase/firestore";
import { db } from "../components/Firebase";

const history = [];
const historicise = async () => {
  const sendHistory = collection(db, "usersHistory");
  const querySnapshotHistory = await getDocs(sendHistory);
  const arrayCoins = [];
  querySnapshotHistory.forEach((docs) => {
    arrayCoins.push({
      name: docs.data().name,
      email: docs.data().email,
      sendingCoin: docs.data().sendingCoin,
      recipientUserName: docs.data().recipientUserName,
      time: docs.data().time,
      id: docs.id,
    });
  });
  history.push(arrayCoins);
};
historicise();

export { history };
