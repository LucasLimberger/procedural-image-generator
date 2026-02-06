"use client";

import styles from "./OpenImageButton.module.css";
import useLanguageStrings from "@/custom-hooks/useLanguageStrings";
import Image from "next/image";

interface OpenImageButtonProps {
  gridElementRef: React.RefObject<HTMLElement>;
  gridWidth: number;
  gridHeight: number;
}

const TILE_SIZE = 48;

export default function OpenImageButton({
  gridElementRef,
  gridWidth,
  gridHeight,
}: OpenImageButtonProps) {
  const { openImageDescription } = useLanguageStrings();

  async function handleClick() {
    const offscreenCanvas = new OffscreenCanvas(
      gridWidth * TILE_SIZE,
      gridHeight * TILE_SIZE,
    );
    const canvasContext = offscreenCanvas.getContext("2d", {
      alpha: false,
      willReadFrequently: false,
    })!;

    const tileImages = [...gridElementRef.current!.querySelectorAll("img")];

    // Aguarda até todas as imagens renderizarem
    await Promise.all(tileImages.map(img => img.decode()));

    // Copia todas as imagens para o canvas
    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        canvasContext.drawImage(
          tileImages.shift()!,
          x * TILE_SIZE,
          y * TILE_SIZE,
          TILE_SIZE,
          TILE_SIZE,
        );
      }
    }

    offscreenCanvas
      .convertToBlob()
      .then(blob => {
        const url = URL.createObjectURL(blob);
        window.open(url);
      })
      .catch(console.error);
  }

  return (
    <button
      className={styles.button}
      onClick={handleClick}
      aria-label={openImageDescription}
    >
      <Image
        fill
        className={styles.buttonIcon}
        src={`icons/open-image-icon.svg`}
        alt=""
        title={openImageDescription}
      />
    </button>
  );
}
