// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './public/locales/en/common.json';
import nlTranslations from './public/locales/nl/common.json';
import { Translations } from './types/i18n';

i18n
  .use(initReactI18next)
  .init<Translations>({
    resources: {
      en: { common: enTranslations },
      nl: { common: nlTranslations },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;