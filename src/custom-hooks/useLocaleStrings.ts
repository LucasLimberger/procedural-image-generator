"use client";

import { usePathname } from "next/navigation";
import STRINGS, { type SupportedLocale } from "@/data/languageData";

/**
 * @returns as strings do locale atual
 */
export default function useLocaleStrings() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] as SupportedLocale;
  return STRINGS[locale];
}
