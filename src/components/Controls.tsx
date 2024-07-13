"use client";

import styles from "./Controls.module.css";
import { useId } from "react";
import { useLanguageContext } from "@/custom hooks/customHooks";
import Toggle from "./Toggle";
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
  gridWidth,
  gridHeight,
  playInstantly,
  onWidthChange,
  onHeightChange,
  onPlayModeChange,
  onRerunRequest,
}: ControlsProps) {
  const languageStrings = useLanguageContext();
  const id = useId();
  return (
    <div className={styles.controls}>
      <button className={styles.button} onClick={() => onRerunRequest()}>
        {languageStrings.rerunButtonText}
      </button>
      <Toggle
        name="playInstantly"
        value="Instantâneo"
        isOn={playInstantly}
        onChange={checked => onPlayModeChange(checked)}
      />
      <label htmlFor={id + "-gridWidth"}>
        {languageStrings.gridWidthSetting}:
        <input
          id={id + "-gridWidth"}
          className={styles.numberInput}
          type="number"
          name="gridWidth"
          min={1}
          max={25}
          value={gridWidth}
          onChange={e => onWidthChange(parseInt(e.target.value))}
        />
      </label>
      <label htmlFor={id + "-gridHeight"}>
        {languageStrings.gridHeightSetting}:
        <input
          id={id + "-gridHeight"}
          className={styles.numberInput}
          type="number"
          name="gridHeight"
          min={1}
          max={25}
          value={gridHeight}
          onChange={e => onHeightChange(parseInt(e.target.value))}
        />
      </label>
    </div>
  );
}
