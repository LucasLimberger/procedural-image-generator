"use client";

import styles from "./Controls.module.css";
import useLocaleStrings from "@/custom-hooks/useLocaleStrings";
import Image from "next/image";
import NumericInput from "./NumericInput";
import Switch from "./Switch";

interface ControlsProps {
  gridWidth: number;
  gridHeight: number;
  skipAnimation: boolean;
  animationState: "done" | "running" | "paused";
  onWidthChange: (newWidth: number) => void;
  onHeightChange: (newHeight: number) => void;
  onAnimationModeChange: (skipAnimation: boolean) => void;
  onPlayPauseRestart: () => void;
}

export default function Controls({
  skipAnimation,
  gridWidth,
  gridHeight,
  animationState,
  onAnimationModeChange,
  onWidthChange,
  onHeightChange,
  onPlayPauseRestart,
}: ControlsProps) {
  const languageStrings = useLocaleStrings();

  let playButtonSrc: string;
  let playButtonDescription: string;
  let playButtonClassName = styles.button + " ";
  if (animationState === "done") {
    playButtonSrc = "restart-icon";
    playButtonDescription = languageStrings.rerunButtonDescription;
    playButtonClassName += styles.restartButton;
  } else if (animationState === "running") {
    playButtonSrc = "pause-icon";
    playButtonDescription = languageStrings.pauseButtonDescription;
    playButtonClassName += styles.pauseButton;
  } else {
    playButtonSrc = "play-icon";
    playButtonDescription = languageStrings.playButtonDescription;
    playButtonClassName += styles.playButton;
  }

  return (
    <div className={styles.controls}>
      <button
        className={playButtonClassName}
        onClick={onPlayPauseRestart}
        aria-label={playButtonDescription}
      >
        <Image
          fill
          className={styles.buttonIcon}
          src={`icons/${playButtonSrc}.svg`}
          alt={playButtonDescription}
          title={playButtonDescription}
        />
      </button>
      <NumericInput
        name={languageStrings.gridWidthSettingName}
        labelContent={languageStrings.gridWidthSettingLabel}
        defaultValue={gridWidth}
        min={1}
        max={25}
        onChange={onWidthChange}
      />
      <NumericInput
        name={languageStrings.gridHeightSettingName}
        labelContent={languageStrings.gridHeightSettingLabel}
        defaultValue={gridHeight}
        min={1}
        max={25}
        onChange={onHeightChange}
      />
      <Switch
        name={languageStrings.skipAnimationSettingName}
        value={languageStrings.skipAnimationSettingName}
        isOn={skipAnimation}
        onChange={checked => onAnimationModeChange(checked)}
      />
    </div>
  );
}
