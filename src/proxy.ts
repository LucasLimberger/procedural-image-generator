import { type NextRequest, NextResponse } from "next/server";
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "./data/languageData";

export const config = {
  matcher: [
    "/",
    "/\([a-zA-Z]{2,3}(?:-[a-zA-Z0-9]+)?)", // Corresponde a um locale
  ],
};

export function proxy(request: NextRequest) {
  const locale = request.nextUrl.pathname.split("/")[1];

  // Se for um idioma válido
  if (SUPPORTED_LANGUAGES.includes(locale as SupportedLanguage)) {
    return;
  }

  // Se for um locale cujo idioma é válido
  for (const lang of SUPPORTED_LANGUAGES) {
    if (locale.startsWith(lang)) {
      request.nextUrl.pathname = "/" + lang;
      return NextResponse.redirect(request.nextUrl);
    }
  }

  // Determinar idioma a ser usado a partir das preferências do navegador
  const languageHeader = request.headers.get("accept-language") ?? "*";
  const proposals = parseLanguageHeader(languageHeader);
  const newLocale = negotiateLocale(
    proposals,
    SUPPORTED_LANGUAGES,
    DEFAULT_LANGUAGE,
  );
  request.nextUrl.pathname = "/" + newLocale;
  return NextResponse.redirect(request.nextUrl);
}

function negotiateLocale<T extends string>(
  proposedLocales: readonly string[],
  supportedLocales: readonly T[],
  defaultLocale: T,
) {
  for (const proposal of proposedLocales) {
    if (proposal === "*") return defaultLocale;
    if (supportedLocales.includes(proposal as T)) {
      return proposal as T;
    }
  }
  return defaultLocale;
}

const LANGUAGE_HEADER_REG_EXP = /(\*|[\w\-]+)(?:;q=([\d.]+))?/i;

function parseLanguageHeader(languageHeader: string) {
  return languageHeader
    .split(",")
    .map(string => string.match(LANGUAGE_HEADER_REG_EXP))
    .filter(match => match !== null)
    .map(match => ({
      locale: match[1],
      quality: Number(match[2] ?? 1),
    }))
    .filter(proposal => !isNaN(proposal.quality))
    .sort((a, b) => b.quality - a.quality)
    .map(proposal => proposal.locale);
}
