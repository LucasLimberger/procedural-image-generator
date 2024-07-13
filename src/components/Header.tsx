"use client";

import styles from "./Header.module.css";
import { useLanguageContext } from "@/custom hooks/customHooks";

export default function Header() {
  const { title } = useLanguageContext();
  return (
    <>
      <title>{title}</title>
      <header className={styles.header}>
        <h1 className={styles.h1}>{title}</h1>
      </header>
    </>
  );
}
