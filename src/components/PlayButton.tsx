"use client";

import styles from "./PlayButton.module.css";
import useLocaleStrings from "@/custom-hooks/useLocaleStrings";
import Image from "next/image";

interface PlayButtonProps {
  animationState: "done" | "running" | "paused";
  onPlayPauseRestart: () => void;
}

export default function PlayButton({
  animationState,
  onPlayPauseRestart,
}: PlayButtonProps) {
  const languageStrings = useLocaleStrings();

  let playButtonSrc: string;
  let playButtonDescription: string;
  let playButtonClassName = styles.button + " ";
  if (animationState === "done") {
    playButtonSrc = "restart-icon";
    playButtonClassName += styles.restartButton;
    playButtonDescription = languageStrings.rerunButtonDescription;
  } else if (animationState === "running") {
    playButtonSrc = "pause-icon";
    playButtonClassName += styles.pauseButton;
    playButtonDescription = languageStrings.pauseButtonDescription;
  } else {
    playButtonSrc = "play-icon";
    playButtonClassName += styles.playButton;
    playButtonDescription = languageStrings.playButtonDescription;
  }

  return (
    <button
      className={playButtonClassName}
      onClick={onPlayPauseRestart}
      aria-label={playButtonDescription}
    >
      <Image
        fill
        className={styles.buttonIcon}
        src={`icons/${playButtonSrc}.svg`}
        alt=""
        title={playButtonDescription}
      />
    </button>
  );
}
