import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from '../public/locales/en/common.json';
import nlTranslations from '../public/locales/nl/common.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enTranslations },
      nl: { common: nlTranslations },
    },
    lng: 'en', // Set default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;