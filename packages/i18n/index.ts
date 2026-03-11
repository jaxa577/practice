import { createI18n } from "vue-i18n";
import type { IntlNumberFormats, IntlDateTimeFormats } from "vue-i18n";
import ru from "./locales/ru";
import uz from "./locales/uz";

const numberFormats: IntlNumberFormats = {
  ru: {
    currency: {
      style: "currency",
      currency: "RUB",
      notation: "standard",
    },
  },
  uz: {
    currency: {
      style: "currency",
      currency: "UZS",
      notation: "standard",
    },
  },
} as const;

const datetimeFormats: IntlDateTimeFormats = {
  ru: {
    short: { year: "numeric", month: "short", day: "numeric" },
    long: { year: "numeric", month: "long", day: "numeric", weekday: "long" },
  },
  uz: {
    short: { year: "numeric", month: "short", day: "numeric" },
    long: { year: "numeric", month: "long", day: "numeric", weekday: "long" },
  },
} as const;

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: localStorage.getItem("jony_lang") || "ru",
  fallbackLocale: "ru",
  messages: { ru, uz },
  numberFormats,
  datetimeFormats,
});

export const globalLocale = i18n.global.locale;

export const changeLanguage = (newLang: "ru" | "uz") => {
  (globalLocale as any).value = newLang;
  localStorage.setItem("jony_lang", newLang);
};
