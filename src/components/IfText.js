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

//【閲覧注意】不適切用語チェック
const ngWord = [
  "めくら",
  "つんぼ",
  "知恵遅れ",
  "どもり",
  "キチガイ",
  "キ◯ガイ",
  "キチ◯イ",
  "ちんば",
  "やぶにらみ",
  "土人",
  "殺",
  "死",
  "害",
  "クソ",
  "くそ",
  "糞",
  "ババア",
  "ジジイ",
  "ばばあ",
  "じじい",
  "ファック",
  "FUCK",
  "Fuck",
  "fuck",
  "F○CK",
  "F○ck",
  "f○ck",
  "FU○K",
  "Fu○k",
  "fu○k",
  "セックス",
  "セ◯クス",
  "SEX",
  "Sex",
  "sex",
  "まんこ",
  "ちんこ",
  "ま◯こ",
  "ち◯こ",
  "ちんちん",
  "ち◯ち◯",
  "ち◯ちん",
  "中出し",
  "中◯し",
  "おっぱい",
  "オッパイ",
  "お◯ぱい",
  "オ◯パイ",
  "フェラチオ",
  "フ◯ラチオ",
  "パイズリ",
];

export { jpCheck, blankCheck, checkEmailFormat, ngWord };
