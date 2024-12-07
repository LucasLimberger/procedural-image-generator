"use client";

import { useContext } from "react";
import { localeContext } from "@/components/LocaleProvider";
import STRINGS from "@/data/languageData";

/**
 * @returns as strings do locale fornescido pelo provedor de contexto de locales.
 */
export function useLocaleStrings() {
  const locale = useContext(localeContext);
  return STRINGS[locale];
}
