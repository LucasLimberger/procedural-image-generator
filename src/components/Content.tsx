"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./Content.module.css";
import TilesetSelector from "./TilesetSelector";
import Grid from "./Grid";
import PauseOverlay from "./PauseOverlay";
import WaveFunctionCollapseGrid from "../scripts/WaveFunctionCollapseGrid";
import { TILESETS, TilesetName, TileName } from "../scripts/tileData";
import Toggle from "./Toggle";

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

  function handleWidthChange(newWidth: number) {
    setSettings(prev => ({ ...prev, gridWidth: newWidth }));
    wfcg.resizeAndClear(newWidth, settings.gridHeight);
  }
  function handleHeightChange(newHeight: number) {
    setSettings(prev => ({ ...prev, gridWidth: newHeight }));
    wfcg.resizeAndClear(settings.gridWidth, newHeight);
  }
  function handlePlayModeChange(playInstantly: boolean) {
    setSettings(prev => ({ ...prev, playInstantly: playInstantly }));
  }
  function handleTilesetChange(newTileset: TilesetName) {
    setWfcg(
      new WaveFunctionCollapseGrid<TileName>(
        settings.gridWidth,
        settings.gridHeight,
        TILESETS[newTileset]
      )
    );
    setSettings(prev => ({ ...prev, activeTileset: newTileset }));
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
            onChange={e => handlePlayModeChange(e.target.checked)}
          />
          <input
            name="gridWidth"
            type="range"
            min={2}
            max={30}
            value={settings.gridWidth}
            onChange={e => handleWidthChange(parseInt(e.target.value))}
          />
          <input
            name="gridHeight"
            type="range"
            min={2}
            max={30}
            value={settings.gridHeight}
            onChange={e => handleHeightChange(parseInt(e.target.value))}
          />
        </div>
        <div className={styles.section}>
          <TilesetSelector
            currentTileset={settings.activeTileset}
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
        </div>
      </main>
    </>
  );
}
