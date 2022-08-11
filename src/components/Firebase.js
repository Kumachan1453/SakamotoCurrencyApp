import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 本番環境モード
// const firebaseConfig = {
//   apiKey: "AIzaSyCfvGUVm8Uwn1EXLCo2ZlqPO18T5XeHofU",
//   authDomain: "sakamotocurrencyapp.firebaseapp.com",
//   projectId: "sakamotocurrencyapp",
//   storageBucket: "sakamotocurrencyapp.appspot.com",
//   messagingSenderId: "367955895931",
//   appId: "1:367955895931:web:7041aac36e6138ddf764de",
//   measurementId: "G-YH0TYRRGQD",
// };

// テスト環境モード
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_TEST_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_TEST_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_TEST_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_TEST_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_TEST_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_TEST_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_TEST_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
