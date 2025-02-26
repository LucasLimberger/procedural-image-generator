"use client";

import styles from "./Header.module.css";
import useLocaleStrings from "@/custom-hooks/useLocaleStrings";
import LanguageSelector from "./LanguageSelector";

export default function Header() {
  const { title } = useLocaleStrings();
  return (
    <>
      <title>{title}</title>
      <header className={styles.header}>
        <h1 className={styles.h1}>{title}</h1>
        <div className={styles.languageSelectorWrapper}>
          <LanguageSelector />
        </div>
      </header>
    </>
  );
}
