"use client";

import styles from "./Controls.module.css";
import useLocaleStrings from "@/custom hooks/useLocaleStrings";
import Switch from "./Switch";
import NumericInput from "./NumericInput";
import Image from "next/image";

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
  let playButtonAlt: string;
  let playButtonClassName = styles.button + " ";
  if (animationState === "done") {
    playButtonSrc = "restart icon";
    playButtonAlt = languageStrings.rerunButtonDescription;
    playButtonClassName += styles.restartButton;
  } else if (animationState === "running") {
    playButtonSrc = "pause icon";
    playButtonAlt = languageStrings.pauseButtonDescription;
    playButtonClassName += styles.pauseButton;
  } else {
    playButtonSrc = "play icon";
    playButtonAlt = languageStrings.playButtonDescription;
    playButtonClassName += styles.playButton;
  }

  return (
    <div className={styles.controls}>
      <button className={playButtonClassName} onClick={onPlayPauseRestart}>
        <Image
          fill
          className={styles.buttonIcon}
          src={`./icons/${playButtonSrc}.svg`}
          alt={playButtonAlt}
          title={playButtonAlt}
        />
      </button>
      <Switch
        name={languageStrings.skipAnimationSettingName}
        value={languageStrings.skipAnimationSettingName}
        isOn={skipAnimation}
        onChange={checked => onAnimationModeChange(checked)}
      />
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
    </div>
  );
}
