"use client";

import styles from "./Switch.module.css";
import { useId } from "react";

interface SwitchProps {
  name: string;
  value: string;
  isOn: boolean;
  onChange: (value: boolean) => void;
}

export default function Switch({ name, value, isOn, onChange }: SwitchProps) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className={styles.label}>
        <input
          type="checkbox"
          id={id}
          name={name}
          value={value}
          checked={isOn}
          onChange={e => onChange(e.target.checked)}
          className={styles.checkbox}
        />
        <span className={styles.sliderTrack} />
        {value}
      </label>
    </div>
  );
}
