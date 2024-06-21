import styles from "./TilesetSelector.module.css";
import { memo } from "react";
import TilesetOption from "./TilesetOption";
import { TILESETS, TilesetName } from "@/scripts/tileData";

interface TilesetSelectorProps {
  value: TilesetName;
  onSelect: (tilesetName: TilesetName) => void;
}

const TilesetSelector = memo(function TilesetSelector({
  value,
  onSelect,
}: TilesetSelectorProps) {
  return (
    <div className={styles.tilesetSelector}>
      {Object.keys(TILESETS).map(name => (
        <TilesetOption
          key={name}
          tilesetName={name as TilesetName}
          isSelected={value === name}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
});
export default TilesetSelector;
