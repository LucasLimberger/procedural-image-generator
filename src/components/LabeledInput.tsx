"use client";

import styles from "./LabeledInput.module.css";
import { useId } from "react";

type LabeledInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function LabeledInput(props: LabeledInputProps) {
  const id = useId();
  const className =
    props.className === undefined
      ? props.className + " " + styles.input
      : styles.input;
  return (
    <>
      <label htmlFor={id}>{props.children}</label>
      <input {...props} className={className} id={id} />
    </>
  );
}
