import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import topbar_en from "../src/i18n/en/topbar";
import inferences_en from "../src/i18n/en/inferences";
import lots_en from "../src/i18n/en/lots";
import properties_en from "../src/i18n/en/properties";
import users_en from "../src/i18n/en/users";
import login_en from "../src/i18n/en/login";
import errors_en from "../src/i18n/en/errors";
import notfound_en from "../src/i18n/en/notfound";

import topbar_es from "../src/i18n/es/topbar";
import inferences_es from "../src/i18n/es/inferences";
import lots_es from "../src/i18n/es/lots";
import properties_es from "../src/i18n/es/properties";
import users_es from "../src/i18n/es/users";
import login_es from "../src/i18n/es/login";
import errors_es from "../src/i18n/es/errors";
import notfound_es from "../src/i18n/es/notfound";

const supportedLngs = ["en", "es"];

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    // debug: true,
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    supportedLngs,
    resources: {
      en: {
        translation: {
          topbar: topbar_en,
          inferences: inferences_en,
          lots: lots_en,
          properties: properties_en,
          users: users_en,
          login: login_en,
          errors: errors_en,
          notfound: notfound_en,
        },
      },
      es: {
        translation: {
          topbar: topbar_es,
          inferences: inferences_es,
          lots: lots_es,
          properties: properties_es,
          users: users_es,
          login: login_es,
          errors: errors_es,
          notfound: notfound_es,
        },
      },
    },
  });

export default i18n;
