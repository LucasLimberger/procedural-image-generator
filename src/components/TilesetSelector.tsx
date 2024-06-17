import styles from "./TilesetSelector.module.css";
import TilesetOption from "./TilesetOption";
import { TILESETS, TilesetName } from "@/scripts/tileData";

interface TilesetSelectorProps {
  currentTileset: TilesetName;
  onSelect: (tilesetName: TilesetName) => void;
}

export default function TilesetSelector({
  currentTileset,
  onSelect,
}: TilesetSelectorProps) {
  return (
    <div className={styles.tilesetSelector}>
      {Object.keys(TILESETS).map(name => (
        <TilesetOption
          key={name}
          tilesetName={name as TilesetName}
          isSelected={currentTileset === name}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
