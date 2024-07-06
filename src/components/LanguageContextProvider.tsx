"use client";

import { createContext, useEffect, useState } from "react";
import STRINGS from "@/data/languageData";

type SupportedLanguage = keyof typeof STRINGS;
const DEFAULT_LANGUAGE: SupportedLanguage = "en";
export const LanguageContext =
  createContext<SupportedLanguage>(DEFAULT_LANGUAGE);

interface LanguageContextProviderProps {
  children: React.ReactNode;
  value?: SupportedLanguage;
}

export default function LanguageContextProvider({
  value,
  children,
}: LanguageContextProviderProps) {
  const [preRendering, setPreRendering] = useState(true);
  useEffect(() => setPreRendering(false), []);

  value = value ?? (preRendering ? DEFAULT_LANGUAGE : getBrowserLanguage());
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

function getBrowserLanguage(): SupportedLanguage {
  const firstSupportedLanguage = navigator.languages
    .map(language => language.split("-")[0])
    .find((language): language is SupportedLanguage => language in STRINGS);
  return firstSupportedLanguage ?? DEFAULT_LANGUAGE;
}
