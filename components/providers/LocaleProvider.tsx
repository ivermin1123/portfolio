"use client";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type Locale = {
  code: string;
  name: string;
  flag: string;
};

type LocaleContextType = {
  currentLocale: Locale;
  setCurrentLocale: (_locale: Locale) => void;
  locales: Locale[];
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const locales: Locale[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
];

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [currentLocale, setCurrentLocale] = useState<Locale>(locales[0]);

  useEffect(() => {
    // Load saved locale from localStorage
    const savedLocale = localStorage.getItem("locale");
    if (savedLocale) {
      const found = locales.find(_locale => _locale.code === savedLocale);
      if (found) {
        setCurrentLocale(found);
      }
    }
  }, []);

  const handleSetCurrentLocale = (locale: Locale) => {
    setCurrentLocale(locale);
    localStorage.setItem("locale", locale.code);
    // No URL changes needed for client-side locale switching
  };

  return (
    <LocaleContext.Provider
      value={{
        currentLocale,
        setCurrentLocale: handleSetCurrentLocale,
        locales,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
