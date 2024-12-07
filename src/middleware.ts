import { type NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "./data/languageData";

export function middleware(request: NextRequest) {
  const languageHeader = request.headers.get("accept-language") ?? "*";
  const proposals = parseLanguageHeader(languageHeader);
  const locale = matchLocale(proposals, SUPPORTED_LOCALES, DEFAULT_LOCALE);
  request.nextUrl.pathname = `/${locale}${request.nextUrl.pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/"],
};

const LOCALE_REG_EXP = /(\*|[\w\-]+)(?:;q=([\d.]+))?/i;
function parseLanguageHeader(languageHeader: string) {
  return languageHeader
    .split(",")
    .map(string => string.match(LOCALE_REG_EXP))
    .filter(match => match !== null)
    .map(match => ({
      locale: match[1],
      quality: Number(match[2] ?? 1),
    }))
    .filter(proposal => !isNaN(proposal.quality))
    .sort((a, b) => b.quality - a.quality)
    .map(proposal => proposal.locale);
}

function matchLocale<T extends string>(
  proposedLocales: readonly string[],
  supportedLocales: readonly T[],
  defaultLocale: T
) {
  for (const proposal of proposedLocales) {
    if (proposal === "*") return defaultLocale;
    if (supportedLocales.includes(proposal as T)) return proposal as T;
  }
  return defaultLocale;
}
