import React, { createContext, useState, useEffect, useContext } from 'react';
import i18n from '../i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LanguageType = 'en' | 'tr';

interface LanguageContextType {
  language: LanguageType;
  changeLanguage: (lng: LanguageType) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  changeLanguage: () => {},
});

const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageType>('en');

  useEffect(() => {
    (async () => {
      const savedLang = await AsyncStorage.getItem('appLanguage');
      if (savedLang) {
        i18n.changeLanguage(savedLang);
        setLanguage(savedLang as LanguageType);
      }
    })();
  }, []);

  const changeLanguage = async (lng: LanguageType) => {
    await i18n.changeLanguage(lng);
    setLanguage(lng);
    await AsyncStorage.setItem('appLanguage', lng);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
export default LanguageProvider;
