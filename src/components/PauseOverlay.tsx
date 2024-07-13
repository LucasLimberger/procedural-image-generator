"use client";

import styles from "./PauseOverlay.module.css";
import { memo } from "react";
import { useLanguageContext } from "@/custom hooks/customHooks";
import Image from "next/image";

interface PauseOverlayProps {
  onDismiss: () => void;
}

const PauseOverlay = memo(function PauseOverlay({
  onDismiss,
}: PauseOverlayProps) {
  const { playButtonAlt } = useLanguageContext();
  return (
    <div className={styles.pauseOverlay}>
      <button className={styles.playButton} onClick={onDismiss}>
        <Image fill src="./icons/play button.svg" alt={playButtonAlt} />
      </button>
    </div>
  );
});
export default PauseOverlay;
