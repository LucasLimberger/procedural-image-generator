import { memo } from "react";
import styles from "./PauseOverlay.module.css";
import Image from "next/image";

interface PauseOverlayProps {
  onDismiss: () => void;
}

const PauseOverlay = memo(function PauseOverlay({
  onDismiss,
}: PauseOverlayProps) {
  return (
    <div className={styles.PauseOverlay}>
      <button onClick={onDismiss}>
        <Image src="" alt="Botão de Play" />
      </button>
    </div>
  );
});
export default PauseOverlay;
