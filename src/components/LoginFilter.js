import React, { useState } from "react";
import { db } from "../components/Firebase";
import { getDoc, doc, collection, query, getDocs } from "firebase/firestore";
import { onAuthStateChanged, signOut, getAuth } from "firebase/auth";
// import { getUsersCollection } from "../components/Firebase";

const getUserProfile = getAuth();
const user = getUserProfile.currentUser;
const email = user.email;

const array = [];
const loginFilter = [];
const loginUser = "";
const getArrayData = async () => {
  const getUsersCollection = await getDocs(collection(db, "users"));
  getUsersCollection.forEach((docs) => {
    array.push({ email: docs.data().email, id: docs.id });
  });
  loginFilter.push(
    array.filter((login) => {
      return email === login.email;
    })
  );
  loginUser.push(loginFilter[0].id);
};
getArrayData();
export const userId = loginUser;
// const loginFilter = array.filter((login) => {
//   return email === login.email;
// });
// export const userId = loginFilter[0].id;
