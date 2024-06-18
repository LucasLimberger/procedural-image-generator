"use client";

import { memo } from "react";
import styles from "./GridCell.module.css";
import { TileName, TilesetName } from "@/scripts/tileData";
import Image from "next/image";

interface GridCellProps {
  tilesetName: TilesetName;
  tileName: TileName | null;
  c: string;
}

const GridCell = memo(function GridCell({ c, tilesetName, tileName }: GridCellProps) {
  const tileSource = tileName === null ? "empty" : `${tilesetName}/${tileName}`;
  return (
    <div className={styles.gridCell} id={c}>
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
