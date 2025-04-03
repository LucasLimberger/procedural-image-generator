"use client";

import styles from "./Controls.module.css";
import useLocaleStrings from "@/custom-hooks/useLocaleStrings";
import NumericInput from "./NumericInput";
import OpenImageButton from "./OpenImageButton";
import PlayButton from "./PlayButton";
import Switch from "./Switch";

interface ControlsProps {
  gridWidth: number;
  gridHeight: number;
  skipAnimation: boolean;
  animationState: "done" | "running" | "paused";
  gridElementRef: React.RefObject<HTMLElement>;
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
  gridElementRef,
  onAnimationModeChange,
  onWidthChange,
  onHeightChange,
  onPlayPauseRestart,
}: ControlsProps) {
  const languageStrings = useLocaleStrings();

  return (
    <div className={styles.controls}>
      <PlayButton
        animationState={animationState}
        onPlayPauseRestart={onPlayPauseRestart}
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
      <Switch
        name={languageStrings.skipAnimationSettingName}
        value={languageStrings.skipAnimationSettingName}
        isOn={skipAnimation}
        onChange={checked => onAnimationModeChange(checked)}
      />
      <OpenImageButton
        gridElementRef={gridElementRef}
        gridWidth={gridWidth}
        gridHeight={gridHeight}
      />
    </div>
  );
}
