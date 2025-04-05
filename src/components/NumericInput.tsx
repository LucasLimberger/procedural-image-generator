import styles from "./NumericInput.module.css";
import { useId, useRef } from "react";

interface NumericInputProps {
  labelContent?: React.ReactNode;
  name: string;
  defaultValue: number;
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
  const prevValue = useRef(inputsProps.defaultValue);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = adjustedNumberInput(e.target);
    if (newValue !== prevValue.current) {
      prevValue.current = newValue;
      onChange(newValue);
    }
  }

  function adjustedNumberInput(inputElement: HTMLInputElement) {
    const value = Number(inputElement.value);
    if (inputElement.value === "" || isNaN(value)) {
      return prevValue.current;
    }
    const min = Number(inputElement.min || -Infinity);
    const max = Number(inputElement.max || Infinity);
    const step = Number(inputElement.step || 1);
    const roundedValue = Math.round((value - min) / step) * step + min;
    return Math.min(max, Math.max(min, roundedValue));
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    e.target.value = prevValue.current.toString();
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
        onBlur={handleBlur}
      />
    </label>
  );
}
