"use client";

import styles from "./Toggle.module.css";
import { useId } from "react";

interface ToggleProps {
  name: string;
  value: string;
  isOn: boolean;
  onChange: (value: boolean) => void;
}

export default function Toggle({ name, value, isOn, onChange }: ToggleProps) {
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
        {value}
      </label>
    </div>
  );
}
