import "./globals.css";
import { Roboto } from "next/font/google";
import { type SupportedLocale } from "@/data/languageData";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

interface RootLayoutProps {
  children: React.ReactNode;
  params: { lang: SupportedLocale };
}

export default function RootLayout({
  children,
  params: { lang },
}: RootLayoutProps) {
  return (
    <html lang={lang}>
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
