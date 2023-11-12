import { addMessages, init, getLocaleFromNavigator } from "svelte-i18n";

import de from "./lang/de.json";
import en from "./lang/en.json";

addMessages("de", de);
addMessages("en", en);

init({
  fallbackLocale: "en",
  initialLocale: getLocaleFromNavigator(),
});
