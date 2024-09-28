"use client";

import styles from "./Controls.module.css";
import { useLanguageContext } from "@/custom hooks/customHooks";
import Toggle from "./Toggle";
import NumericInput from "./NumericInput";

interface ControlsProps {
  gridWidth: number;
  gridHeight: number;
  playInstantly: boolean;
  onWidthChange: (newWidth: number) => void;
  onHeightChange: (newHeight: number) => void;
  onPlayModeChange: (newPlayMode: boolean) => void;
  onRerunRequest: () => void;
}

export default function Controls({
  playInstantly,
  gridWidth,
  gridHeight,
  onPlayModeChange,
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
      <Toggle
        name={languageStrings.playInstantlySettingName}
        value={languageStrings.playInstantlySettingName}
        isOn={playInstantly}
        onChange={checked => onPlayModeChange(checked)}
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
