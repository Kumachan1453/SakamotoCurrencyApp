import { UserDataName } from "./UserData";

//アドレスの日本語入力チェック
const jpCheck = (Email) => {
  const regexEmail = /[亜-熙ぁ-んァ-ヶ]/;
  return regexEmail.test(Email);
};

//アドレス,パスワードの空文字チェック
const blankCheck = (props) => {
  const regexEmail = /[^\s　]/;
  return !regexEmail.test(props);
};

//アドレスの形式チェック('英数字' + @ + '英数字' + . + '英数字'の形式のみ可)
const checkEmailFormat = (Email) => {
  const regexEmail =
    /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
  return !regexEmail.test(Email);
};

//名前重複チェック（未完成）
const checkNameConflict = (userName) => {
  const nameList = [];
  for (const docs of UserDataName) {
    console.log(docs);
  }
  // const regexNameConflict = UserDataName[0].name === userName;
  const regexNameConflict = nameList === userName;
  // console.log("UserDataName[0].name", UserDataName[0].name);
  return regexNameConflict;
};

//【閲覧注意】不適切用語チェック
const checkNgWord = (userName) => {
  const regexUserName =
    /めくら|つんぼ|知恵遅れ|どもり|キチガイ|キ◯ガイ|キチ◯イ|ちんば|やぶにらみ|土人|殺|死|害|クソ野郎|くそやろう|くそ野郎|糞|うんち|ババア|ジジイ|ばばあ|じじい|ファック|fuck|f○ck|fu○k|fxxk|fxck|fuxk|童貞|せっくす|セックス|セ◯クス|sex|まんこ|ちんこ|ま◯こ|ち◯こ|ちんちん|ち◯ち◯|ち◯ちん|中出し|中◯し|おっぱい|オッパイ|オ◯パイ|お◯ぱい|オ◯パイ|フェラチオ|フ◯ラチオ|パイズリ/i;
  return regexUserName.test(userName);
};
export {
  jpCheck,
  blankCheck,
  checkEmailFormat,
  checkNgWord,
  checkNameConflict,
};
