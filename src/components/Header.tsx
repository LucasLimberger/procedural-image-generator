"use client";

import styles from "./Header.module.css";
import useLanguageStrings from "@/custom-hooks/useLanguageStrings";
import LanguageSelector from "./LanguageSelector";

export default function Header() {
  const { title } = useLanguageStrings();
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
