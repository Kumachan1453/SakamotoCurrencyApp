import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase/Firebase";

const checkNameConflict = async (userName) => {
  const getCollection = await getDocs(collection(db, "users"));
  console.log("getCollection:", getCollection);
  const array = [];
  getCollection.forEach((docs) => {
    array.push({ userName: docs.data().name });
  });
  console.log("array", array);
  console.log("userName:", userName);

  const regexUserName = array;
  const user = "デモアカウント";
  const conflictName = regexUserName[1].userName === user;
  console.log("userName:", userName);
  return conflictName;
  // return regexUserName;
};

export default checkNameConflict;
