"use client";

import styles from "./Header.module.css";
import { useContext } from "react";
import { LanguageContext } from "./LanguageContextProvider";
import STRINGS from "@/data/languageData";

export default function Header() {
  const language = useContext(LanguageContext);
  const title = STRINGS[language].title;
  return (
    <>
      <title>{title}</title>
      <header className={styles.header}>
        <h1 className={styles.h1}>{title}</h1>
      </header>
    </>
  );
}
