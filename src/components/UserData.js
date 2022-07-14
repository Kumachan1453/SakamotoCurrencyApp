import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase";

const UserData = [];

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
      time: docs.data().time,
    });
  });
};
getUserData();

const UserDataId = [];
const getUserDataId = async () => {
  const getCollection = await getDocs(collection(db, "users"));
  getCollection.forEach((docs) => {
    UserDataId.push({
      id: docs.id,
    });
  });
};
getUserDataId();

const UserDataName = [];
const getUserDataName = async () => {
  const getCollection = await getDocs(collection(db, "users"));
  getCollection.forEach((docs) => {
    UserDataName.push({
      name: docs.data().name,
    });
  });
};
getUserDataName();

const UserDataEmail = [];
const getUserDataEmail = async () => {
  const getCollection = await getDocs(collection(db, "users"));
  getCollection.forEach((docs) => {
    UserDataEmail.push({
      email: docs.data().email,
    });
  });
};
getUserDataEmail();

const UserDataPassword = [];
const getUserDataPassword = async () => {
  const getCollection = await getDocs(collection(db, "users"));
  getCollection.forEach((docs) => {
    UserDataPassword.push({
      password: docs.data().password,
    });
  });
};
getUserDataPassword();

const UserDataCoinOwnership = [];
const getUserDataCoinOwnership = async () => {
  const getCollection = await getDocs(collection(db, "users"));
  getCollection.forEach((docs) => {
    UserDataCoinOwnership.push({
      coinOwnership: docs.data().coinOwnership,
    });
  });
};
getUserDataCoinOwnership();

const UserDataMonthlyCoinUsage = [];
const getUserDataMonthlyCoinUsage = async () => {
  const getCollection = await getDocs(collection(db, "users"));
  getCollection.forEach((docs) => {
    UserDataMonthlyCoinUsage.push({
      monthlyCoinUsage: docs.data().monthlyCoinUsage,
    });
  });
};
getUserDataMonthlyCoinUsage();

const UserDataSumCoinUsage = [];
const getUserDataSumCoinUsage = async () => {
  const getCollection = await getDocs(collection(db, "users"));
  getCollection.forEach((docs) => {
    UserDataSumCoinUsage.push({
      sumCoinUsage: docs.data().sumCoinUsage,
    });
  });
};
getUserDataSumCoinUsage();

const UserDataIdAndEmail = [];
const getUserDataIdAndEmail = async () => {
  const getCollection = await getDocs(collection(db, "users"));
  getCollection.forEach((docs) => {
    UserDataIdAndEmail.push({
      id: docs.id,
      email: docs.data().email,
    });
  });
};
getUserDataIdAndEmail();
// console.log("UserDataIdAndEmail", UserDataIdAndEmail);

// const LoginUserData = [];
// const loginUser = () => {
//   const getUserProfile = getAuth();
//   console.log("getUserProfile", getUserProfile);
//   const user = getUserProfile.currentUser;
//   const email = user.email;
//   const getLoginUserData = async () => {
//     const getCollection = await getDocs(collection(db, "users"));
//     const loginFilter = UserData.filter((login) => {
//       return email === login.email;
//     });
//     getCollection.forEach(() => {
//       LoginUserData.push({
//         id: loginFilter[0].id,
//         name: loginFilter[0].name,
//         email: loginFilter[0].email,
//         password: loginFilter[0].password,
//         coinOwnership: loginFilter[0].coinOwnership,
//         monthlyCoinUsage: loginFilter[0].monthlyCoinUsage,
//         sumCoinUsage: loginFilter[0].sumCoinUsage,
//       });
//     });
//   };
//   getLoginUserData();
// };
// loginUser();

export {
  UserData,
  UserDataCoinOwnership,
  UserDataEmail,
  UserDataId,
  UserDataMonthlyCoinUsage,
  UserDataName,
  UserDataPassword,
  UserDataSumCoinUsage,
  UserDataIdAndEmail,
};
