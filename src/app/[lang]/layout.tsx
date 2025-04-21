import "./globals.css";
import { Roboto } from "next/font/google";
import { SUPPORTED_LOCALES } from "@/data/languageData";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
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

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map(locale => ({ lang: locale }));
}

type Params = ReturnType<typeof generateStaticParams>[number];
interface RootLayoutProps {
  children: React.ReactNode;
  params: Params;
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  return (
    <html lang={params.lang}>
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
