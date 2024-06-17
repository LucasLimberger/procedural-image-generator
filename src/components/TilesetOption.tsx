"use client";

import Image from "next/image";
import styles from "./TilesetOption.module.css";
import { TilesetName } from "@/scripts/tileData";

interface TilesetOptionProps {
  tilesetName: TilesetName;
  isSelected: boolean;
  onSelect: (tilesetName: TilesetName) => void;
}

export default function TilesetOption({
  tilesetName,
  isSelected,
  onSelect,
}: TilesetOptionProps) {
  let buttonClasses = styles.tilesetOptionButton;
  if (isSelected) buttonClasses += " " + styles.selectedTileset;
  return (
    <button className={buttonClasses} onClick={() => onSelect(tilesetName)}>
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
}
