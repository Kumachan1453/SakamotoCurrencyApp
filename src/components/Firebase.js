import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 本番環境モード（仮）
// const firebaseConfig = {
//   apiKey: "AIzaSyCkn_4t-mqqyqrbxZZtbisDw-izy0mJnQ8",
//   authDomain: "koncurrencyapp.firebaseapp.com",
//   projectId: "koncurrencyapp",
//   storageBucket: "koncurrencyapp.appspot.com",
//   messagingSenderId: "283648314292",
//   appId: "1:283648314292:web:9ab7c2198ec7a6662640e1",
//   measurementId: "G-KHPD7N2TS1",
// };

// 本番環境モード
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };

// テスト環境モード
const firebaseConfig = {
  apiKey: process.env.REACT_APP_TEST_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_TEST_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_TEST_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_TEST_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_TEST_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_TEST_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_TEST_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
