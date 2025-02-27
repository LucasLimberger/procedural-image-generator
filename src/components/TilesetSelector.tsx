import styles from "./TilesetSelector.module.css";
import { memo } from "react";
import Image from "next/image";
import { TILESETS, TilesetName } from "@/data/tileData";

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

interface TilesetOptionProps {
  tilesetName: TilesetName;
  isSelected: boolean;
  onSelect: (tilesetName: TilesetName) => void;
}

const TilesetOption = memo(function TilesetOption({
  tilesetName,
  isSelected,
  onSelect,
}: TilesetOptionProps) {
  let buttonClassName = styles.tilesetOptionButton;
  if (isSelected) {
    buttonClassName += " " + styles.selected;
  }

  return (
    <button
      className={buttonClassName}
      disabled={isSelected}
      onClick={() => {
        onSelect(tilesetName);
      }}
    >
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          fill
          src={`tileset-images/${tilesetName}.svg`}
          alt=""
        />
      </div>
    </button>
  );
});
