"use client";

import styles from "./LanguageSelector.module.css";
import Image from "next/image";
import Link from "next/link";
import useLocaleStrings from "@/custom-hooks/useLocaleStrings";
import STRINGS, { SUPPORTED_LOCALES } from "@/data/languageData";
import usePopupVisibility from "@/custom-hooks/usePopupVisibility";

export default function LanguageSelector() {
  const { popupRef, popupVisible, setPopupVisible } = usePopupVisibility(false);
  let popupClassName = styles.popupMenu;
  if (!popupVisible) {
    popupClassName += " " + styles.hidden;
  }

  const { localeName: currentLocaleName } = useLocaleStrings();
  const options = SUPPORTED_LOCALES.filter(
    locale => STRINGS[locale].localeName !== currentLocaleName
  );

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.button}
        onClick={() => setPopupVisible(prev => !prev)}
        aria-haspopup="menu"
      >
        <div className={styles.buttonNameWrapper}>{currentLocaleName}</div>
        <div className={styles.imageWrapper}>
          <Image fill src="icons/language-icon.svg" alt="" />
        </div>
      </button>
      <menu className={popupClassName} ref={popupRef}>
        {options.map(locale => (
          <li key={locale} className={styles.localeOption}>
            <Link className={styles.link} href={`/${locale}`}>
              <span className={styles.optionName}>
                {STRINGS[locale].localeName}
              </span>
            </Link>
          </li>
        ))}
      </menu>
    </div>
  );
}
