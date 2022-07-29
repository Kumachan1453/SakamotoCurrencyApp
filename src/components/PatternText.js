// import * as Localization from "expo-localization";
// import i18n from "i18n-js";
// i18n.translations = {
//   en: { welcome: "Hello" },
//   ja: { welcome: "こんにちは" },
// };
// i18n.locale = Localization.locale;
// i18n.fallbacks = true;

// export const myUserName = (i18n.translations = {
//   en: { myUserName: "User Name" },
//   ja: { myUserName: "ユーザー名" },
//   Portuguese: { myUserName: "Nome do Utilizador" },
// });

// const date = new Date().toLocaleString();
const date = new Date();
const month = date.getMonth() + 1;
// export const howMuchDouYouUseYourCoinThisMonth =
//   "あなたが" + month + "月中に使用した「Kon」の数";
export const howMuchDouYouUseYourCoinThisMonth = "あなたが使用した「Kon」の数";
