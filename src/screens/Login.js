import firebase from "firebase";

// Firebase 初期化
const config = {
  apiKey: "api-key",
  authDomain: "project-id.firebaseapp.com",
  databaseURL: "https://project-id.firebaseio.com",
  projectId: "project-id",
  storageBucket: "project-id.appspot.com",
  messagingSenderId: "sender-id",
};
firebase.initializeApp(config);

export const Login = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
      alert("Login Success!");
    })
    .catch((error) => {
      alert(error.message);
    });
};

export default Login;
