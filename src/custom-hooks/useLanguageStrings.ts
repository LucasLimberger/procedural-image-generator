"use client";

import { usePathname } from "next/navigation";
import {
  getLanguageStringsFor,
  type SupportedLanguage,
} from "@/data/languageData";

/**
 * @returns as strings do idioma atual
 */
export default function useLanguageStrings() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] as SupportedLanguage;
  // O midleware garante que o idioma no URL será um dos suportados
  return getLanguageStringsFor(locale);
}
