import styles from "./Grid.module.css";
import { memo } from "react";
import { TilesetName } from "../data/tileData";
import Image from "next/image";

interface Cell {
  readonly x: number;
  readonly y: number;
  readonly value: string | null;
}

interface GridProps {
  gridRef: React.RefObject<HTMLDivElement>;
  width: number;
  height: number;
  cells: readonly Cell[];
  tilesetName: TilesetName;
}

export default function Grid({
  gridRef,
  width,
  height,
  cells,
  tilesetName,
}: GridProps) {
  return (
    <div className={styles.gridWrapper}>
      <div
        ref={gridRef}
        className={styles.grid}
        style={{ "--rows": height, "--columns": width } as React.CSSProperties}
      >
        {cells.map(cell => (
          <GridCell
            key={`${cell.x},${cell.y}`}
            tilesetName={tilesetName}
            tileName={cell.value}
          />
        ))}
      </div>
    </div>
  );
}

interface GridCellProps {
  tilesetName: TilesetName;
  tileName: string | null;
}

const GridCell = memo(function GridCell({
  tilesetName,
  tileName,
}: GridCellProps) {
  const tileSource = tileName === null ? "empty" : `${tilesetName}/${tileName}`;
  const style = {
    "--animation-delay-mult": Math.random(),
    "--image-scale": tileName === null ? 0 : 1,
  } as React.CSSProperties;

  // suppressHydrationWarning usado por causa do atraso aleatório na animação
  return (
    <div suppressHydrationWarning className={styles.gridCell} style={style}>
      <Image
        fill
        className={styles.tileImage}
        src={`tile-images/${tileSource}.svg`}
        alt=""
      />
    </div>
  );
});
