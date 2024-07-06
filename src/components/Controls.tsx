"use client";

import styles from "./Controls.module.css";
import { useContext, useId } from "react";
import { LanguageContext } from "./LanguageContextProvider";
import Toggle from "./Toggle";
import STRINGS from "@/data/languageData";

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
  const language = useContext(LanguageContext);
  const id = useId();
  return (
    <div className={styles.controls}>
      <button className={styles.button} onClick={() => onRerunRequest()}>
        {STRINGS[language].rerunButtonText}
      </button>
      <Toggle
        name="playInstantly"
        value="Instantâneo"
        isOn={playInstantly}
        onChange={checked => onPlayModeChange(checked)}
      />
      <label htmlFor={id + "-gridWidth"}>
        {STRINGS[language].gridWidthSetting}:
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
        {STRINGS[language].gridHeightSetting}:
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
