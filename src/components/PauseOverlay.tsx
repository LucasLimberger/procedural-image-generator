"use client";

import styles from "./PauseOverlay.module.css";
import { memo, useContext } from "react";
import { LanguageContext } from "./LanguageContextProvider";
import Image from "next/image";
import STRINGS from "@/data/languageData";

interface PauseOverlayProps {
  onDismiss: () => void;
}

const PauseOverlay = memo(function PauseOverlay({
  onDismiss,
}: PauseOverlayProps) {
  const language = useContext(LanguageContext);
  const alt = STRINGS[language].playButtonAlt;
  return (
    <div className={styles.pauseOverlay}>
      <button className={styles.playButton} onClick={onDismiss}>
        <Image fill src="./icons/play button.svg" alt={alt} />
      </button>
    </div>
  );
});
export default PauseOverlay;
