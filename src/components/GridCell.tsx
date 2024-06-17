"use client";

import { memo } from "react";
import styles from "./GridCell.module.css";
import { TileName, TilesetName } from "@/scripts/tileData";
import Image from "next/image";

interface GridCellProps {
  tilesetName: TilesetName;
  tileName: TileName | null;
}

const GridCell = memo(function GridCell({ tilesetName, tileName }: GridCellProps) {
  const tileSource = tileName === null ? "empty" : `${tilesetName}/${tileName}`;
  return (
    <div className={styles.gridCell}>
      <img className={styles.tileImage} src={`./tile images/${tileSource}.svg`} alt="" />
    </div>
  );
});
export default GridCell;
