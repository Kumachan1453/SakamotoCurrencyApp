import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase";

const RecentlyExchangedFriendsData = [];

const getRecentlyExchangedFriendsData = async () => {
  const getCollection = await getDocs(
    collection(db, "recentlyExchangedFriends")
  );
  getCollection.forEach((docs) => {
    RecentlyExchangedFriendsData.push({
      id: docs.id,
      name: docs.data().name,
      email: docs.data().email,
      recipientUserName: docs.data().recipientUserName,
      recipientUserId: docs.data().recipientUserId,
      time: new Date().toLocaleString(),
    });
  });
};
getRecentlyExchangedFriendsData();

const RecentlyExchangedFriendsDataRecipientUserId = [];
const getUserDataName = async () => {
  const getCollection = await getDocs(
    collection(db, "recentlyExchangedFriends")
  );
  getCollection.forEach((docs) => {
    RecentlyExchangedFriendsDataRecipientUserId.push({
      recipientUserId: docs.data().recipientUserId,
    });
  });
};
getUserDataName();
console.log(
  "RecentlyExchangedFriendsDataRecipientUserId",
  RecentlyExchangedFriendsDataRecipientUserId
);

export {
  RecentlyExchangedFriendsData,
  RecentlyExchangedFriendsDataRecipientUserId,
};
