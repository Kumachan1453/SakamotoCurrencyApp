import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, getDocs, collection } from "firebase/firestore";

// 本番環境モード
// const firebaseConfig = {
//   apiKey: "AIzaSyB6srd7jvN3hCW5gFLc9yniGimACFTeni4",
//   authDomain: "sakamotocurrencyapp.firebaseapp.com",
//   projectId: "sakamotocurrencyapp",
//   storageBucket: "sakamotocurrencyapp.appspot.com",
//   messagingSenderId: "367955895931",
//   appId: "1:367955895931:web:7041aac36e6138ddf764de",
//   measurementId: "${config.measurementId}",
// };

// テスト環境モード
const firebaseConfig = {
  apiKey: "AIzaSyC5rEBggU9PcalM-vWtkXq3L2g-SECz7TI",
  authDomain: "dev-sakamotocurrencyapp.firebaseapp.com",
  projectId: "dev-sakamotocurrencyapp",
  storageBucket: "dev-sakamotocurrencyapp.appspot.com",
  messagingSenderId: "971914605548",
  appId: "1:971914605548:web:99a61b297b7fe545f106c9",
  measurementId: "G-XJXRTRGQ21",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
