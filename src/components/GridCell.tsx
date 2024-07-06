"use client";

import { memo } from "react";
import styles from "./GridCell.module.css";
import { TilesetName, TileName } from "@/data/tileData";
import Image from "next/image";

interface GridCellProps {
  tilesetName: TilesetName;
  tileName: TileName | null;
}

const GridCell = memo(function GridCell({
  tilesetName,
  tileName,
}: GridCellProps) {
  const tileSource = tileName === null ? "empty" : `${tilesetName}/${tileName}`;
  return (
    <div className={styles.gridCell}>
      <Image
        fill
        className={styles.tileImage}
        src={`./tile images/${tileSource}.svg`}
        alt=""
      />
    </div>
  );
});
export default GridCell;
