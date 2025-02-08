import styles from "./Grid.module.css";
import { memo } from "react";
import Image from "next/image";
import { type Cell } from "../scripts/WaveFunctionCollapseGrid";
import { TilesetName } from "../data/tileData";
import { log } from "console";

interface GridProps {
  width: number;
  height: number;
  cells: Cell<string>[];
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
