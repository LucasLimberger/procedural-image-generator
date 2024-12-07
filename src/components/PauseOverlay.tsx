"use client";

import styles from "./PauseOverlay.module.css";
import { memo } from "react";
import { useLocaleStrings } from "@/custom hooks/customHooks";
import Image from "next/image";

interface PauseOverlayProps {
  onDismiss: () => void;
}

const PauseOverlay = memo(function PauseOverlay({
  onDismiss,
}: PauseOverlayProps) {
  const { playButtonDescription } = useLocaleStrings();
  return (
    <div className={styles.backdrop}>
      <button className={styles.playButton} onClick={onDismiss}>
        <Image
          fill
          src="./icons/play icon.svg"
          alt={playButtonDescription}
          title={playButtonDescription}
        />
      </button>
    </div>
  );
});
export default PauseOverlay;
