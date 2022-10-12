import * as Localization from "expo-localization";
import i18n from "i18n-js";
i18n.fallbacks = true;
i18n.translations = { en };

const date = new Date();
const month = date.getMonth() + 1;

i18n.locale = Localization.locale;
const en = {
  startKon: "Welcome to the world of 'Kon'.",
  start: "Start",

  homeScreen: "Home",
  myUserName: "User Name",
  myUserEmailAddress: "Email Address",
  konOwnership: "Number of 'Kon' you have in your possession",
  monthlyKonUsage: "Number of 'Kons' you used during the month of " + month,
  detail:
    "*This application will be updated at midnight on the beginning of each month (" +
    month +
    "/01 for this month). First, you will lose 5% of [Number of 'Kons' you used during the month of " +
    month +
    "]. Instead, you will get 5% of the number of 'Kon' you spent in " +
    month +
    " (even if you spent more than 100000Kon, you will not get more than 5000Kon). And [Number of 'Kons' you used during the month of " +
    (month + 1) +
    "] will be zero.",
  logout: "Logout",
  login: "Login",
  attentionLogout: "Are you sure you want to logout?",
  cancel: "cancel",
  ok: "OK",
  accountDeletion: "Account Deletion",
  attentionAccountDeletion: "Do you really want to delete the account?",

  friendScreen: "Users",
  enterFriendName: "Enter an User's name",
  allFriends: "All",
  relevantFriendsOnly: "Related",

  sendScreen: "Send 'Kon'",
  sendTo: "Send to",
  konYouSend: "Amount of 'Kon' you send",
  enterNumbers: "Enter Numbers",
  sendKon: "Send 'Kon'",
  thanksMessage: "Thank you message",
  attentionSendKon: "Do you really want to send 'Kon'?",
  remainingAmount: "remaining amount",
  amountUseAfter: "Amount used after",
  exceedsBalance: "Exceeds the balance",
  checkInappropriateWord: "Inappropriate terminology is used",
  tooManyCharacters: "Too many characters",
  checkWholeNumbers: "Enter only whole numbers",

  giftScreen: "Gift",
  touchBar: "Touch the bottom bar to receive a 'Kon'!",

  rankingScreen: "Ranking",

  historyScreen: "Log",

  textOfLoginScreen: "Login screen",
  textOfEmailAddress: "Email Address",
  textOfPassword: "Password",
  enterEmail: "Enter your email address",
  newRegistration: "Registration",
  alertEmailOrPassword: "Email address or password is incorrect.",

  textOfRegisterScreen: "Register Screen",
  nickname: "Nickname",
  enterNickname: "Enter your nickname",
  overCharacter: "(6+ words)",
  warningDetail:
    "*It is not possible to change these entries after new registration. Please be aware of this.",
  alertNicknameConflict: "Nickname is duplicated with another user",
  exceedNickname: "Nickname exceeds 8 characters",
  includeJapanese: "Japanese language included",
  alertEmailFormat: "Email address is in the wrong format",
  alertEmailConflict: "Email address is duplicated with another user",
  alertLessPassword: "Password must be at least 6 characters",
};

i18n.translations = {
  en: {
    startKon: "Welcome to the world of 'Kon'.",
    start: "Start",

    homeScreen: "Home",
    myUserName: "User Name",
    myUserEmailAddress: "Email Address",
    konOwnership: "Number of 'Kon' you have in your possession",
    monthlyKonUsage: "Number of 'Kon' you used during the month of " + month,
    detail:
      "*This application will be updated at midnight on the beginning of each month (" +
      month +
      "/1 for this month). First, you will lose 5% of [Number of 'Kon' you used during the month of " +
      month +
      "]. Instead, you will get 5% of the number of 'Kon' you spent in " +
      month +
      " (even if you spent more than 100000Kon, you will not get more than 5000Kon). And [Number of 'Kon' you used during the month of " +
      (month + 1) +
      "] will be zero.",
    logout: "Logout",
    login: "Login",
    attentionLogout: "Are you sure you want to logout?",
    cancel: "cancel",
    ok: "OK",
    accountDeletion: "Account Deletion",
    attentionAccountDeletion: "Do you really want to delete the account?",

    friendScreen: "Users",
    enterFriendName: "Enter an User's name",
    allFriends: "All",
    relevantFriendsOnly: "Related",

    sendScreen: "Send 'Kon'",
    sendTo: "Send to",
    konYouSend: "Amount of 'Kon' you send",
    enterNumbers: "Enter Numbers",
    sendKon: "Send 'Kon'",
    thanksMessage: "Thank you message (max 15 words)",
    attentionSendKon: "Do you really want to send 'Kon'?",
    remainingAmount: "remaining amount",
    amountUseAfter: "Amount used after",
    exceedsBalance: "Exceeds the balance",
    checkInappropriateWord: "Inappropriate terminology is used",
    tooManyCharacters: "Too many characters",
    checkWholeNumbers: "Enter only whole numbers",

    giftScreen: "Gift",
    touchBar: "Touch the bottom bar to receive a 'Kon'!",

    rankingScreen: "Ranking",

    historyScreen: "Log",

    textOfLoginScreen: "Login screen",
    textOfEmailAddress: "Email Address",
    textOfPassword: "Password",
    enterEmail: "Enter your email address",
    enterPassword: "Enter your password",
    newRegistration: "Registration",
    alertEmailOrPassword: "Email address or password is incorrect.",

    textOfRegisterScreen: "Register Screen",
    nickname: "Nickname (max. 8 characters)",
    enterNickname: "Enter your nickname",
    overCharacter: "(6+ words)",
    warningDetail:
      "*It is not possible to change these entries after new registration. Please be aware of this.",
    alertNicknameConflict: "Nickname is duplicated with another user",
    exceedNickname: "Nickname exceeds 8 characters",
    includeJapanese: "Japanese language included",
    alertEmailFormat: "Email address is in the wrong format",
    alertEmailConflict: "Email address is duplicated with another user",
    alertLessPassword: "Password must be at least 6 characters",
  },

  ja: {
    startKon: "「Kon」の世界にようこそ",
    start: "はじめる",

    homeScreen: "ホーム",
    myUserName: "ユーザー名",
    myUserEmailAddress: "メールアドレス",
    konOwnership: "あなたが所持している「Kon」の数",
    monthlyKonUsage: "あなたが" + month + "月中に使用した「Kon」の数",
    detail:
      "※このアプリは、毎月月初め（今月の場合は" +
      month +
      "月1日）の0時に更新が行われます。まず【あなたが所持している「Kon」の数】の5%は失います。その代わり、【あなたが" +
      month +
      "月中に使用した「Kon」の数】の5%分を特典としてGETすることができます（ただし100000Kon以上ご使用された場合であっても5000Kon以上はもらえません）。そして【あなたが" +
      (month + 1) +
      "月中に使用した「Kon」の数】は0になります。",
    logout: "ログアウト",
    login: "ログイン",
    attentionLogout: "本当にログアウトしますか？",
    cancel: "キャンセル",
    ok: "OK",
    accountDeletion: "アカウント削除",
    attentionAccountDeletion: "本当にアカウントを削除しますか？",

    friendScreen: "ユーザー",
    enterFriendName: "ユーザー名を入力",
    allFriends: "すべて",
    relevantFriendsOnly: "関連のみ",

    sendScreen: "「Kon」を送る",
    sendTo: "送る相手",
    konYouSend: "あなたが送る「Kon」の額",
    enterNumbers: "数字を入力",
    sendKon: "「Kon」を送る",
    thanksMessage: "感謝のメッセージ（15文字以内）",
    attentionSendKon: "本当に「Kon」を送りますか？",
    remainingAmount: "残額",
    amountUseAfter: "使用後の使用量",
    exceedsBalance: "残額を上回ってます",
    checkInappropriateWord: "不適切な用語が使われています",
    tooManyCharacters: "字数が多すぎます",
    checkWholeNumbers: "整数のみ入力してください",

    giftScreen: "ギフト",
    touchBar: "下のバーをタッチして「Kon」を受け取ろう!",

    rankingScreen: "ランキング",

    historyScreen: "履歴",

    textOfLoginScreen: "ログイン画面",
    textOfEmailAddress: "メールアドレス",
    textOfPassword: "パスワード",
    enterEmail: "メールアドレスを入力",
    enterPassword: "パスワードを入力",
    newRegistration: "新規登録",
    alertEmailOrPassword: "メールアドレスもしくはパスワードが間違っています。",

    textOfRegisterScreen: "新規登録画面",
    nickname: "ニックネーム（8文字以内）",
    enterNickname: "ニックネームを入力",
    overCharacter: "（6文字以上）",
    warningDetail:
      "※新規登録後にこれらの記入事項を変更することはできません。ご注意ください。",
    alertNicknameConflict: "ニックネームが他のユーザーと重複しています",
    exceedNickname: "ニックネームが8文字を超えています",
    includeJapanese: "日本語が含まれています",
    alertEmailFormat: "メールアドレスの形式が間違っています",
    alertEmailConflict: "メールアドレスが他のユーザーと重複しています",
    alertLessPassword: "パスワードは6文字以上にしてください",
  },

  pt: {
    startKon: "Bem-vindo ao mundo de 'Kon'.",
    start: "Começar",

    homeScreen: "Início",
    myUserName: "Nome do Utilizador",
    myUserEmailAddress: "endereço de e-mail",
    konOwnership: "Número de 'Kons' que você tem em sua posse",
    monthlyKonUsage: "Número de 'Kons' que você usou durante o mês de " + month,
    detail:
      "*Este pedido é atualizado à meia-noite do início de cada mês (Número de 'Kon' que você usou durante o mês de " +
      month +
      "). Primeiro, você perde 5% do [Número de 'Kon' que você tem em sua posse]. Em vez disso, você receberá 5% do [Número de 'Kon' que você usou durante o mês de " +
      month +
      "] como recompensa (mas você não receberá mais de 5000 Kon, mesmo que você tenha gasto mais de 100000 Kon). E [Número de 'Kon' que você usou durante o mês de " +
      (month + 1) +
      "] será zero.",
    logout: "Logout",
    login: "Login",
    attentionLogout: "Você realmente quer terminar a sessão?",
    cancel: "cancelar",
    ok: "OK",
    accountDeletion: "Eliminação de conta",
    attentionAccountDeletion: "Você realmente quer excluir sua conta?",

    friendScreen: "Usuários",
    enterFriendName: "Digite o nome de um Usuário",
    allFriends: "Todos",
    relevantFriendsOnly: "Relacionado",

    sendScreen: "Enviar 'Kon'",
    sendTo: "a quem enviá-lo para",
    konYouSend: "Quantidade de 'Kon' que você envia",
    enterNumbers: "Digite os números",
    sendKon: "Envie uma 'Kon'",
    thanksMessage: "Mensagem de agradecimento (máx 15 palavras)",
    attentionSendKon: "Você realmente quer enviar 'Kon'?",
    remainingAmount: "montante restante",
    amountUseAfter: "Quantidade utilizada após o uso",
    exceedsBalance: "Excede o valor restante",
    checkInappropriateWord: "É utilizada uma terminologia inapropriada",
    tooManyCharacters: "Demasiados caracteres",
    checkWholeNumbers: "Por favor, digite apenas números inteiros",

    giftScreen: "Presente",
    touchBar: "Toque na barra abaixo para receber um 'Kon'!",

    rankingScreen: "Ranking",

    historyScreen: "História",

    textOfLoginScreen: "tela de login",
    textOfEmailAddress: "endereço de e-mail",
    textOfPassword: "Senha",
    enterEmail: "Digite seu endereço de e-mail",
    enterPassword: "Digite sua senha",
    newRegistration: "Registro",
    alertEmailOrPassword: "Endereço de e-mail ou senha incorretos.",

    textOfRegisterScreen: "tela de registro",
    nickname: "Apelido (máx. 8 caracteres)",
    enterNickname: "Digite seu apelido",
    overCharacter: "(6+ palavras)",
    warningDetail:
      "*Não é possível alterar estas entradas após novo registro. Por favor, note que.",
    alertNicknameConflict: "O apelido é duplicado com outro usuário",
    exceedNickname: "O apelido excede 8 caracteres",
    includeJapanese: "Inclusive a língua japonesa",
    alertEmailFormat: "O endereço de e-mail está no formato errado",
    alertEmailConflict: "O endereço de e-mail é duplicado com outro usuário",
    alertLessPassword: "As senhas devem ter pelo menos 6 caracteres",
  },

  zh: {
    startKon: "欢迎来到 'Kon '的世界。",
    start: "开始...",

    homeScreen: "首页",
    myUserName: "帐号",
    myUserEmailAddress: "电子邮件地址",
    konOwnership: "你所拥有的'Kons'的数量",
    monthlyKonUsage: "您在 " + month + "月份使用的 'Kon'数量",
    detail:
      "*本申请在每个月月初的午夜更新（就本月而言，是" +
      month +
      "月1日）。 首先，你失去5%的[你拥有的'康'的数量]。相反，你将得到[你在" +
      month +
      "月期间消费的'Kon'数量]的5%作为奖励（但你不会得到超过5000Kon，即使你消费超过100000Kon）。而[你在" +
      (month + 1) +
      "月期间花费的'康'的数量]将为零。",
    logout: "登出",
    login: "登录",
    attentionLogout: "你真的想登出吗？",
    cancel: "取消",
    ok: "认可",
    accountDeletion: "删除账户",
    attentionAccountDeletion: "你真的想删除你的账户吗？",

    friendScreen: "用户",
    enterFriendName: "输入你的用户名。",
    allFriends: "所有",
    relevantFriendsOnly: "相关的只有",

    sendScreen: "发送 ‘Kon'",
    sendTo: "寄给谁",
    konYouSend: "你发送的'Kon'数量",
    enterNumbers: "输入数字",
    sendKon: "发送 ‘Kon'",
    thanksMessage: "谢谢你的留言（最多15个字）",
    attentionSendKon: "你真的想发送'Kon'吗？",
    remainingAmount: "剩余金额",
    amountUseAfter: "使用后的数量",
    exceedsBalance: "超过剩余金额",
    checkInappropriateWord: "使用了不适当的术语",
    tooManyCharacters: "角色太多",
    checkWholeNumbers: "请只输入整数",

    giftScreen: "礼物",
    touchBar: "触摸下面的栏，就可以收到 ‘Kon'!",

    rankingScreen: "排名",

    historyScreen: "历史",

    textOfLoginScreen: "登录屏幕",
    textOfEmailAddress: "电子邮件地址",
    textOfPassword: "(密码",
    enterEmail: "输入你的电子邮件地址",
    enterPassword: "输入你的密码",
    newRegistration: "新注册",
    alertEmailOrPassword: "电子邮件地址或密码不正确。",

    textOfRegisterScreen: "新的注册屏幕",
    nickname: "绰号（最多8个字符）",
    enterNickname: "输入你的绰号",
    overCharacter: "(至少6个字符)",
    warningDetail: "*在新注册后不可能改变这些条目。请注意。",
    alertNicknameConflict: "绰号与其他用户重复",
    exceedNickname: "绰号超过8个字符",
    includeJapanese: "包括日语",
    alertEmailFormat: "电子邮件地址的格式不对",
    alertEmailConflict: "电子邮件地址与其他用户重复",
    alertLessPassword: "密码必须至少有6个字符长",
  },
};

const startKon = i18n.t("startKon");
const start = i18n.t("start");

const homeScreen = i18n.t("homeScreen");
const myUserName = i18n.t("myUserName");
const myUserEmailAddress = i18n.t("myUserEmailAddress");
const konOwnership = i18n.t("konOwnership");
const monthlyKonUsage = i18n.t("monthlyKonUsage");
const detail = i18n.t("detail");
const logout = i18n.t("logout");
const login = i18n.t("login");
const attentionLogout = i18n.t("attentionLogout");
const cancel = i18n.t("cancel");
const ok = i18n.t("ok");
const accountDeletion = i18n.t("accountDeletion");
const attentionAccountDeletion = i18n.t("attentionAccountDeletion");

const friendScreen = i18n.t("friendScreen");
const enterFriendName = i18n.t("enterFriendName");
const allFriends = i18n.t("allFriends");
const relevantFriendsOnly = i18n.t("relevantFriendsOnly");

const sendScreen = i18n.t("sendScreen");
const sendTo = i18n.t("sendTo");
const konYouSend = i18n.t("konYouSend");
const enterNumbers = i18n.t("enterNumbers");
const sendKon = i18n.t("sendKon");
const thanksMessage = i18n.t("thanksMessage");
const attentionSendKon = i18n.t("attentionSendKon");
const remainingAmount = i18n.t("remainingAmount");
const amountUseAfter = i18n.t("amountUseAfter");
const exceedsBalance = i18n.t("exceedsBalance");
const checkInappropriateWord = i18n.t("checkInappropriateWord");
const tooManyCharacters = i18n.t("tooManyCharacters");
const checkWholeNumbers = i18n.t("checkWholeNumbers");

const giftScreen = i18n.t("giftScreen");
const touchBar = i18n.t("touchBar");

const rankingScreen = i18n.t("rankingScreen");

const historyScreen = i18n.t("historyScreen");

const textOfLoginScreen = i18n.t("textOfLoginScreen");
const textOfEmailAddress = i18n.t("textOfEmailAddress");
const textOfPassword = i18n.t("textOfPassword");
const enterEmail = i18n.t("enterEmail");
const enterPassword = i18n.t("enterPassword");
const newRegistration = i18n.t("newRegistration");
const alertEmailOrPassword = i18n.t("alertEmailOrPassword");

const textOfRegisterScreen = i18n.t("textOfRegisterScreen");
const nickname = i18n.t("nickname");
const enterNickname = i18n.t("enterNickname");
const overCharacter = i18n.t("overCharacter");
const warningDetail = i18n.t("warningDetail");
const alertNicknameConflict = i18n.t("alertNicknameConflict");
const exceedNickname = i18n.t("exceedNickname");
const includeJapanese = i18n.t("includeJapanese");
const alertEmailFormat = i18n.t("alertEmailFormat");
const alertEmailConflict = i18n.t("alertEmailConflict");
const alertLessPassword = i18n.t("alertLessPassword");

export {
  startKon,
  start,
  homeScreen,
  myUserName,
  myUserEmailAddress,
  konOwnership,
  monthlyKonUsage,
  detail,
  logout,
  login,
  attentionLogout,
  cancel,
  ok,
  accountDeletion,
  attentionAccountDeletion,
  friendScreen,
  enterFriendName,
  allFriends,
  relevantFriendsOnly,
  sendScreen,
  sendTo,
  konYouSend,
  enterNumbers,
  sendKon,
  thanksMessage,
  attentionSendKon,
  remainingAmount,
  amountUseAfter,
  exceedsBalance,
  checkInappropriateWord,
  tooManyCharacters,
  checkWholeNumbers,
  giftScreen,
  touchBar,
  rankingScreen,
  historyScreen,
  textOfLoginScreen,
  textOfEmailAddress,
  textOfPassword,
  enterEmail,
  enterPassword,
  newRegistration,
  alertEmailOrPassword,
  textOfRegisterScreen,
  nickname,
  enterNickname,
  overCharacter,
  warningDetail,
  alertNicknameConflict,
  exceedNickname,
  includeJapanese,
  alertEmailFormat,
  alertEmailConflict,
  alertLessPassword,
};
