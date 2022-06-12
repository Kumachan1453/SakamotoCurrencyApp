import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";

export const GetUsersId = () => {
  const getUsersId = async () => {
    const q = collection(db, "users");
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log("doc.id:", doc.id, " => ", "doc.data():", doc.data());
    });
  };
  getUsersId();
};

export default GetUsersId;
