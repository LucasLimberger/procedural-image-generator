"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./Content.module.css";
import TilesetSelector from "./TilesetSelector";
import Grid from "./Grid";
import PauseOverlay from "./PauseOverlay";
import WaveFunctionCollapseGrid from "../scripts/WaveFunctionCollapseGrid";
import { TILESETS, TilesetName, TileName } from "../scripts/tileData";
import Toggle from "./Toggle";
import LabeledInput from "./LabeledInput";

export default function Content() {
  const [running, setRunning] = useState(false);
  const [settings, setSettings] = useState({
    activeTileset: "terrain" as TilesetName,
    gridWidth: 10,
    gridHeight: 10,
    playInstantly: false,
  });
  const [wfcg, setWfcg] = useState(
    new WaveFunctionCollapseGrid<TileName>(
      settings.gridWidth,
      settings.gridHeight,
      TILESETS[settings.activeTileset]
    )
  );

  if (running) {
    wfcg.runUntilDone();
  }
  // useEffect(() => {
  //   if (!running || wfcg.isDone) return;
  //   if (settings.playInstantly) {
  //     wfcg.runUntilDone();
  //     setWfcg(wfcg);
  //     return;
  //   } else {
  //     const interval = setInterval(() => {
  //       wfcg.step();
  //       setWfcg(wfcg);
  //     }, 1000);
  //     return () => clearInterval(interval);
  //   }
  // }, [running, wfcg]);

  const handleTilesetChange = useCallback(
    (newTileset: TilesetName) => {
      setWfcg(
        new WaveFunctionCollapseGrid<TileName>(
          settings.gridWidth,
          settings.gridHeight,
          TILESETS[newTileset]
        )
      );
      setSettings(prev => ({ ...prev, activeTileset: newTileset }));
    },
    [settings.activeTileset]
  );
  function handleWidthChange(newWidth: number) {
    if (newWidth === 0 || isNaN(newWidth)) return;
    setSettings(prev => ({ ...prev, gridWidth: newWidth }));
    wfcg.resizeAndClear(newWidth, settings.gridHeight);
  }
  function handleHeightChange(newHeight: number) {
    if (newHeight === 0 || isNaN(newHeight)) return;
    setSettings(prev => ({ ...prev, gridHeight: newHeight }));
    wfcg.resizeAndClear(settings.gridWidth, newHeight);
  }
  function handlePlayModeChange(playInstantly: boolean) {
    setSettings(prev => ({ ...prev, playInstantly: playInstantly }));
  }
  return (
    <>
      <main className={styles.main}>
        <div className={styles.controls}>
          <button onClick={() => handleTilesetChange(settings.activeTileset)}>
            Rerun
          </button>
          <Toggle
            name="playInstantly"
            content="Instantâneo"
            onChange={handlePlayModeChange}
          />
          <LabeledInput
            name="gridWidth"
            type="number"
            min={1}
            max={30}
            value={settings.gridWidth}
            onChange={e => handleWidthChange(parseInt(e.target.value))}
          />
          <LabeledInput
            name="gridHeight"
            type="number"
            min={1}
            max={30}
            value={settings.gridHeight}
            onChange={e => handleHeightChange(parseInt(e.target.value))}
          />
        </div>
        <section className={styles.section}>
          <TilesetSelector
            value={settings.activeTileset}
            onSelect={handleTilesetChange}
          />
          {running ? (
            <Grid
              width={settings.gridWidth}
              height={settings.gridHeight}
              cells={[...wfcg.iterCells()]}
              tilesetName={settings.activeTileset}
            />
          ) : (
            <PauseOverlay onDismiss={() => setRunning(true)} />
          )}
        </section>
      </main>
    </>
  );
}
