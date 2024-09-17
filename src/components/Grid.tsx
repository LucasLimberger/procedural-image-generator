import styles from "./Grid.module.css";
import GridCell from "./GridCell";
import { Cell } from "../scripts/WaveFunctionCollapseGrid";
import { TilesetName, TileName } from "../data/tileData";

interface GridProps {
  width: number;
  height: number;
  cells: Iterable<Cell<TileName>>;
  tilesetName: TilesetName;
}

export default function Grid({ width, height, cells, tilesetName }: GridProps) {
  return (
    <div className={styles.gridWrapper}>
      <div
        className={styles.grid}
        style={{ "--rows": height, "--columns": width } as React.CSSProperties}
      >
        {[...cells].map(cell => (
          <GridCell
            key={`${cell.x},${cell.y}`}
            tilesetName={tilesetName}
            tileName={cell.isCollapsed ? cell.possibilities[0] : null}
          />
        ))}
      </div>
    </div>
  );
}
