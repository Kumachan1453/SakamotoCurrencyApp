import React, { useState, useEffect } from "react";
import {
  getDoc,
  doc,
  collection,
  query,
  getDocs,
  where,
  updateDoc,
  arrayUnion,
  firebase,
} from "firebase/firestore";
import { db } from "../Firebase";
import { getAuth } from "firebase/auth";

export const GetIdentificationUserData = () => {
  const getUserProfile = getAuth();
  const user = getUserProfile.currentUser;
  const uid = user.uid;

  const addUid = async () => {
    // const usersCollection = doc(db, "users", "xAFCeUpu18qNypFv9Q0w");
    const usersCollection = collection(db, "users");
    const querySnapshot = await getDocs(usersCollection);
    await updateDoc(querySnapshot, {
      uid: arrayUnion(uid),
    });
  };
  addUid();
};

export default GetIdentificationUserData;
