import { locale } from "expo-localization";
import i18n from "i18n-js";

import { translations } from "./translations";

i18n.translations = translations;

i18n.locale = locale;

i18n.fallbacks = true;

export { i18n };
