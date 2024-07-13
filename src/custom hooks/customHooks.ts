"use client";

import { useContext } from "react";
import { LanguageContext } from "@/components/LanguageContextProvider";
import STRINGS from "@/data/languageData";

/**
 * @returns as strings da língua que o provedor de contexto de idioma fornece.
 */
export function useLanguageContext() {
  const language = useContext(LanguageContext);
  return STRINGS[language];
}
