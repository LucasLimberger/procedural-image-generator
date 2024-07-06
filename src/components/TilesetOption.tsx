"use client";

import styles from "./TilesetOption.module.css";
import { memo } from "react";
import Image from "next/image";
import { TilesetName } from "@/data/tileData";

interface TilesetOptionProps {
  tilesetName: TilesetName;
  isSelected: boolean;
  onSelect: (tilesetName: TilesetName) => void;
}

const TilesetOption = memo(function TilesetOption({
  tilesetName,
  isSelected,
  onSelect,
}: TilesetOptionProps) {
  let buttonClasses = styles.tilesetOptionButton;
  if (isSelected) buttonClasses += " " + styles.selectedTileset;
  return (
    <button
      className={buttonClasses}
      onClick={() => {
        if (!isSelected) onSelect(tilesetName);
      }}
    >
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          fill
          src={`./tileset images/${tilesetName}.svg`}
          alt=""
        />
      </div>
    </button>
  );
});
export default TilesetOption;
