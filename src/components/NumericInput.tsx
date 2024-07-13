"use client";

import styles from "./NumericInput.module.css";
import { useId } from "react";

interface NumericInputProps {
  name: string;
  labelContent?: React.ReactNode;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (newValue: number) => void;
}

export default function NumericInput({
  labelContent,
  onChange,
  ...inputsProps
}: NumericInputProps) {
  const id = useId();
  return (
    <label htmlFor={id}>
      {labelContent}
      <input
        className={styles.input}
        id={id}
        type="number"
        {...inputsProps}
        onChange={e => onChange(clampedNumberInput(e))}
      />
    </label>
  );
}

function clampedNumberInput(e: React.ChangeEvent<HTMLInputElement>) {
  const min = Number(e.target.min || -Infinity);
  const max = Number(e.target.max || Infinity);
  const step = Number(e.target.step || 1);
  let value = Number(e.target.value);
  value = Math.round((value - min) / step) * step + min;
  return Math.min(max, Math.max(min, value));
}
