import { useRef, useState, useEffect } from "react";

export default function usePopupVisibility(initialyVisible: boolean) {
  const popupRef = useRef<HTMLElement>(null);
  const [popupVisible, setPopupVisible] = useState(initialyVisible);

  function handleClick(event: MouseEvent) {
    if (popupRef.current === null) return;
    if (popupRef.current.contains(event.target as Node)) return;
    setPopupVisible(false);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      setPopupVisible(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  return {
    popupRef,
    popupVisible,
    setPopupVisible,
  };
}
