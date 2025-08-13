import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';
import translationID from './locales/id/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        name: 'English',
        translation: translationEN,
      },
      id: {
        name: 'Bahasa Indonesia',
        translation: translationID,
      },
    },
    lng: 'id', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
