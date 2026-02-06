"use client";

import styles from "./OpenImageButton.module.css";
import { useEffect, useState } from "react";
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
  const [offscreenCanvas, setOffscreenCanvas] = useState<OffscreenCanvas>();
  useEffect(() => {
    setOffscreenCanvas(new OffscreenCanvas(1, 1));
  }, []);

  async function handleClick() {
    if (offscreenCanvas === undefined) return;

    const canvasContext = offscreenCanvas.getContext("2d", {
      alpha: false,
      willReadFrequently: false,
    })!;
    offscreenCanvas.width = gridWidth * TILE_SIZE;
    offscreenCanvas.height = gridHeight * TILE_SIZE;

    const tileImages = [...gridElementRef.current!.querySelectorAll("img")];
    await Promise.all(tileImages.map(img => img.decode()));

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
