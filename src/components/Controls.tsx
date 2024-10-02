"use client";

import styles from "./Controls.module.css";
import { useLanguageContext } from "@/custom hooks/customHooks";
import Switch from "./Switch";
import NumericInput from "./NumericInput";

interface ControlsProps {
  gridWidth: number;
  gridHeight: number;
  skipAnimation: boolean;
  onWidthChange: (newWidth: number) => void;
  onHeightChange: (newHeight: number) => void;
  onAnimationModeChange: (newPlayMode: boolean) => void;
  onRerunRequest: () => void;
}

export default function Controls({
  skipAnimation,
  gridWidth,
  gridHeight,
  onAnimationModeChange,
  onWidthChange,
  onHeightChange,
  onRerunRequest,
}: ControlsProps) {
  const languageStrings = useLanguageContext();
  return (
    <div className={styles.controls}>
      <button className={styles.button} onClick={() => onRerunRequest()}>
        {languageStrings.rerunButtonDescription}
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
        value={gridWidth}
        min={1}
        max={25}
        onChange={onWidthChange}
      />
      <NumericInput
        name={languageStrings.gridHeightSettingName}
        labelContent={languageStrings.gridHeightSettingLabel}
        value={gridHeight}
        min={1}
        max={25}
        onChange={onHeightChange}
      />
    </div>
  );
}
