import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase";
import { getAuth } from "firebase/auth";

const getUserProfile = getAuth();
const user = getUserProfile.currentUser;
const email = user.email;

export const LoginUserData = [];
const loginUser = async () => {
  const getCollection = await getDocs(collection(db, "users"));
  const loginFilter = UserData.filter((login) => {
    return email === login.email;
  });
  getCollection.forEach(() => {
    LoginUserData.push({
      id: loginFilter[0].id,
      name: loginFilter[0].name,
      email: loginFilter[0].email,
      password: loginFilter[0].password,
      coinOwnership: loginFilter[0].coinOwnership,
      monthlyCoinUsage: loginFilter[0].monthlyCoinUsage,
      sumCoinUsage: loginFilter[0].sumCoinUsage,
    });
  });
};
loginUser();
