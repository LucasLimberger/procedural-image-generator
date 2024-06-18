import styles from "./Grid.module.css";
import GridCell from "./GridCell";
import { Cell } from "../scripts/WaveFunctionCollapseGrid";
import { TilesetName, TileName } from "../scripts/tileData";

interface GridProps {
  width: number;
  height: number;
  cells: Iterable<Cell<TileName>>;
  tilesetName: TilesetName;
}

export default function Grid({ width, height, cells, tilesetName }: GridProps) {
  const cellElements: React.ReactNode[] = Array(width * height);
  for (const cell of cells) {
    const { x, y } = cell;
    const index = (height - y - 1) * width + x; //inverte a coordenada y
    cellElements[index] = (
      <GridCell
        key={`${x},${y}`}
        c={`${x},${y}`}
        tilesetName={tilesetName}
        tileName={cell.isCollapsed ? cell.possibilities[0] : null}
      />
    );
  }
  return (
    <div className={styles.gridWrapper}>
      <div
        className={styles.grid}
        style={{ "--rows": height, "--columns": width } as React.CSSProperties}
      >
        {cellElements}
      </div>
    </div>
  );
}
