import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import tr from './locales/tr.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';

const LANGUAGE_KEY = 'appLanguage';

const resources = {
  en: { translation: en },
  tr: { translation: tr },
};

export const initI18n = async () => {
  let selectedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
  if (!selectedLang) {
    const deviceLang = RNLocalize.getLocales()[0]?.languageCode;
    if (deviceLang === 'tr') {
      selectedLang = 'tr';
    } else {
      selectedLang = 'en';
    }
  }

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: selectedLang,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });

  return selectedLang;
};

export default i18n;
