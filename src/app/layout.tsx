import "./globals.css";
import { Roboto } from "next/font/google";
import LanguageContextProvider from "@/components/LanguageContextProvider";
import Header from "@/components/Header";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={roboto.className}>
        <LanguageContextProvider>
          <Header />
          {children}
        </LanguageContextProvider>
      </body>
    </html>
  );
}
