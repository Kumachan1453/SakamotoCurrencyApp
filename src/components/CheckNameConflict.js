// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../components/Firebase";

// const checkNameConflict = async (userName) => {
//   const getCollection = await getDocs(collection(db, "users"));
//   const array = [];
//   getCollection.forEach((docs) => {
//     array.push({ userName: docs.data().name });
//   });
//   console.log("array", array);

//   const regexUserName = array;
//   return regexUserName.match(userName);
// };

// export default checkNameConflict;
