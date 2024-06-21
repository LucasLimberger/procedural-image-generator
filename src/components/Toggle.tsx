"use client";

import styles from "./Toggle.module.css";
import { useId } from "react";

interface ToggleProps {
  name: string;
  content: string;
  onChange: (value: boolean) => void;
}

export default function Toggle({ name, content, onChange }: ToggleProps) {
  const id = useId();
  return (
    <div>
      <input
        type="checkbox"
        id={id}
        name={name}
        value={content}
        onChange={e => onChange(e.target.checked)}
        className={styles.checkbox}
      />
      <label htmlFor={id} className={styles.label}>
        {content}
      </label>
    </div>
  );
}
