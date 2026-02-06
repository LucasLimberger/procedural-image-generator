"use client";

import styles from "./LanguageSelector.module.css";
import useLanguageStrings from "@/custom-hooks/useLanguageStrings";
import usePopupVisibility from "@/custom-hooks/usePopupVisibility";
import {
  getLanguageStringsFor,
  SUPPORTED_LANGUAGES,
} from "@/data/languageData";
import Image from "next/image";
import Link from "next/link";

export default function LanguageSelector() {
  const { popupRef, popupVisible, setPopupVisible } = usePopupVisibility(false);
  let popupClassName = styles.popupMenu;
  if (!popupVisible) {
    popupClassName += " " + styles.hidden;
  }

  const currentLanguage = useLanguageStrings().languageName;
  const options = SUPPORTED_LANGUAGES.filter(
    lang => getLanguageStringsFor(lang).languageName !== currentLanguage,
  );

  return (
    <div className={styles.languageSelector}>
      <button
        className={styles.button}
        onClick={() => setPopupVisible(prev => !prev)}
        aria-haspopup="menu"
      >
        <div className={styles.buttonNameWrapper}>{currentLanguage}</div>
        <div className={styles.imageWrapper}>
          <Image fill src="icons/language-icon.svg" alt="" />
        </div>
      </button>
      <menu className={popupClassName} ref={popupRef}>
        {options.map(lang => (
          <li key={lang} className={styles.localeOption}>
            <Link className={styles.link} href={`/${lang}`}>
              <span className={styles.optionName}>
                {getLanguageStringsFor(lang).languageName}
              </span>
            </Link>
          </li>
        ))}
      </menu>
    </div>
  );
}
