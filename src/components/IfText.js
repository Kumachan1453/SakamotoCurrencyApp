import { RecentlyExchangedFriendsDataRecipientUserId } from "./RecentlyExchangedFriendsData";
import { UserDataName } from "./UserData";

const jpCheck = (Email) => {
  const regexEmail = /[亜-熙ぁ-んァ-ヶ]/;
  return regexEmail.test(Email);
};

const blankCheck = (props) => {
  const regexEmail = /[^\s　]/;
  return !regexEmail.test(props);
};

const checkEmailFormat = (Email) => {
  const regexEmail =
    /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
  return !regexEmail.test(Email);
};

const checkNameConflict = (userName) => {
  const nameList = [];
  UserDataName.forEach((docs) => {
    nameList.push(docs.name);
  });
  const regexNameConflict = nameList.some((element) => element === userName);
  return regexNameConflict;
};

const checkRecentlyExchangedFriendsDataIdConflict = (
  recentlyExchangedFriendsId
) => {
  const idList = [];
  RecentlyExchangedFriendsDataRecipientUserId.forEach((item) => {
    idList.push(item.id);
  });
  const regexIdConflict = idList.some(
    (element) => element === recentlyExchangedFriendsId
  );
  return regexIdConflict;
};

const checkNgWord = (userName) => {
  const regexUserName =
    /viado|viad○|porra|めくら|つんぼ|知恵遅れ|どもり|狂|バカ|アホ|ばか|あほ|ばーか|バーカ|阿呆|きちがい|キチがい|キチガイ|キ◯ガイ|キチ◯イ|ちんば|やぶにらみ|土人|殺|死|害|あばずれ|アバずれ|アバズレ|ビッチ|ビ◯チ|びっち|ビッち|クソ野郎|くそやろう|くそ野郎|糞|うんち|ウンチ|ババア|ジジイ|ばばあ|じじい|ファック|fuck|f○ck|fu○k|fxxk|fxck|fuxk|童貞|せっくす|セックス|セ◯クス|sex|まんこ|ちんこ|ま◯こ|ち◯こ|ちんちん|ち◯ち◯|ち◯ちん|中出し|中◯し|おっぱい|オッパイ|オ◯パイ|お◯ぱい|オ◯パイ|フェラチオ|フ◯ラチオ|パイズリ/i;
  return regexUserName.test(userName);
};
export {
  jpCheck,
  blankCheck,
  checkEmailFormat,
  checkNgWord,
  checkNameConflict,
  checkRecentlyExchangedFriendsDataIdConflict,
};
