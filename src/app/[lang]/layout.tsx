import "./globals.css";
import { Roboto } from "next/font/google";
import {
  getLanguageStringsFor,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/data/languageData";
import type { Metadata } from "next";

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map(language => ({ lang: language }));
}

type GenerateMetadataProps = {
  params: Promise<{ lang: SupportedLanguage }>;
};

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: getLanguageStringsFor(lang).title,
    icons: {
      icon: [
        {
          url: "/light-theme-icon.png",
          media: "(prefers-color-scheme: light)",
        },
        {
          url: "/dark-theme-icon.png",
          media: "(prefers-color-scheme: dark)",
        },
      ],
    },
  };
}

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  return (
    <html lang={lang}>
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
