// import firebase from "firebase";

// // Firebase 初期化
// const config = {
//   apiKey: "api-key",
//   authDomain: "project-id.firebaseapp.com",
//   databaseURL: "https://project-id.firebaseio.com",
//   projectId: "project-id",
//   storageBucket: "project-id.appspot.com",
//   messagingSenderId: "sender-id",
// };
// firebase.initializeApp(config);

// // ユーザ登録
// export const signup = (email, password) => {
//   firebase
//     .auth()
//     .createUserWithEmailAndPassword(email, password)
//     .then((user) => {
//       if (user) {
//         console.log("Success to Signup");
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// // メール＆パスワードログイン
// export const login = (email, password) => {
//   firebase
//     .auth()
//     .signInWithEmailAndPassword(email, password)
//     .then((response) => {
//       alert("Login Success!");
//     })
//     .catch((error) => {
//       alert(error.message);
//     });
// };

// export default firebase;
