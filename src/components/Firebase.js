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

const firebaseConfig = {
  apiKey: "AIzaSyABV-kPEhfJ3pD5w6pXFjlQqvOuZ_gTyNc",
  authDomain: "sakamotocurrencyapp.firebaseapp.com",
  projectId: "sakamotocurrencyapp",
  storageBucket: "sakamotocurrencyapp.appspot.com",
  messagingSenderId: "367955895931",
  appId: "1:367955895931:web:7041aac36e6138ddf764de",
  measurementId: "G-YH0TYRRGQD",
};

// テスト環境モード
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_TEST_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_TEST_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_TEST_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_TEST_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_TEST_MESSAGE_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_TEST_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_TEST_MEASUREMENT_ID,
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyC5rEBggU9PcalM-vWtkXq3L2g-SECz7TI",
//   authDomain: "dev-sakamotocurrencyapp.firebaseapp.com",
//   projectId: "dev-sakamotocurrencyapp",
//   storageBucket: "dev-sakamotocurrencyapp.appspot.com",
//   messagingSenderId: "971914605548",
//   appId: "1:971914605548:web:99a61b297b7fe545f106c9",
//   measurementId: "G-XJXRTRGQ21",
// };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
