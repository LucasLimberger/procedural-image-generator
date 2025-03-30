import styles from "./Grid.module.css";
import { memo } from "react";
import { TilesetName } from "../data/tileData";
import Image from "next/image";

interface Cell {
  readonly x: number;
  readonly y: number;
  readonly collapsedState: string | null;
}

interface GridProps {
  width: number;
  height: number;
  cells: readonly Cell[];
  tilesetName: TilesetName;
}

export default function Grid({ width, height, cells, tilesetName }: GridProps) {
  return (
    <div className={styles.gridWrapper}>
      <div
        className={styles.grid}
        style={{ "--rows": height, "--columns": width } as React.CSSProperties}
      >
        {cells.map(cell => (
          <GridCell
            key={`${cell.x},${cell.y}`}
            tilesetName={tilesetName}
            tileName={cell.collapsedState ?? null}
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
