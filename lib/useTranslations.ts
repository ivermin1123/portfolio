"use client";
import { useMemo } from "react";

import { useLocale } from "@/components/providers/LocaleProvider";

// Import all translation files
import en from "../locales/en.json";
import vi from "../locales/vi.json";

const translations = {
  en,
  vi,
};

export function useTranslations() {
  const { currentLocale } = useLocale();

  const t = useMemo(() => {
    const currentTranslations = translations[currentLocale.code as keyof typeof translations];

    return function translate(key: string, params?: Record<string, string>) {
      const keys = key.split(".");
      let value: any = currentTranslations;

      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = value[k];
        } else {
          // Fallback to English if translation not found
          const fallbackValue = translations.en;
          for (const fallbackKey of keys) {
            if (
              fallbackValue &&
              typeof fallbackValue === "object" &&
              fallbackKey in fallbackValue
            ) {
              value = fallbackValue[fallbackKey as keyof typeof fallbackValue];
            } else {
              return key; // Return key if no translation found
            }
          }
          break;
        }
      }

      if (typeof value === "string" && params) {
        return value.replace(/\{(\w+)\}/g, (match, param) => {
          return params[param] || match;
        });
      }

      return value;
    };
  }, [currentLocale.code]);

  return { t, currentLocale };
}
