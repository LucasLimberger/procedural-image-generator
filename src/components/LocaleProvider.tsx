"use client";

import { createContext } from "react";
import { DEFAULT_LOCALE, type SupportedLocale } from "@/data/languageData";

export const localeContext = createContext<SupportedLocale>(DEFAULT_LOCALE);

interface LocaleProviderProps {
  children: React.ReactNode;
  value: SupportedLocale;
}

export default function LocaleProvider({
  value,
  children,
}: LocaleProviderProps) {
  return (
    <localeContext.Provider value={value}>{children}</localeContext.Provider>
  );
}
