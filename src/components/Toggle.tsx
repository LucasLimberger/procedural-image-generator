"use client";

import styles from "./Toggle.module.css";
import { useId } from "react";

interface ToggleProps {
  name: string;
  content: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
        onChange={onChange}
        className={styles.checkbox}
      />
      <label htmlFor={id} className={styles.label}>
        {content}
      </label>
    </div>
  );
}
