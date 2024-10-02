"use client";

import styles from "./NumericInput.module.css";
import { useId, useRef } from "react";

interface NumericInputProps {
  labelContent?: React.ReactNode;
  name: string;
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
  const prevValue = useRef(inputsProps.value);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = adjustedNumberInput(e);
    if (newValue != prevValue.current) {
      prevValue.current = newValue;
      onChange(newValue);
    }
  }

  function adjustedNumberInput(e: React.ChangeEvent<HTMLInputElement>) {
    const min = Number(e.target.min || -Infinity);
    const max = Number(e.target.max || Infinity);
    const step = Number(e.target.step || 1);
    let value = Number(e.target.value);
    value = Math.round((value - min) / step) * step + min;
    return Math.min(max, Math.max(min, value));
  }

  return (
    <label className={styles.label} htmlFor={id}>
      {labelContent}
      <input
        className={styles.input}
        id={id}
        type="number"
        {...inputsProps}
        onChange={handleChange}
      />
    </label>
  );
}
