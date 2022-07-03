import { locale } from "expo-localization";
import i18n from "i18n-js";

import { translations } from "./translations";

// Set the key-value pairs for the different languages you want to support.
i18n.translations = translations;

// Set the locale once at the beginning of your app.
i18n.locale = locale;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

export { i18n };
