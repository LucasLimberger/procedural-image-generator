"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./Content.module.css";
import TilesetSelector from "./TilesetSelector";
import Grid from "./Grid";
import PauseOverlay from "./PauseOverlay";
import WaveFunctionCollapseGrid from "../scripts/WaveFunctionCollapseGrid";
import { TILESETS, TilesetName, TileName } from "../scripts/tileData";
import Controls from "./Controls";

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

  if (running && !wfcg.isDone && settings.playInstantly) {
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
  function rerun() {
    wfcg.clear();
  }
  const handleTilesetChange = useCallback((newTileset: TilesetName) => {
    setSettings(prev => ({ ...prev, activeTileset: newTileset }));
      setWfcg(
      prev =>
        new WaveFunctionCollapseGrid<TileName>(
          prev.width,
          prev.height,
          TILESETS[newTileset]
        )
      );
  }, []);
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
        <Controls
          gridWidth={settings.gridWidth}
          gridHeight={settings.gridHeight}
          playInstantly={settings.playInstantly}
          onWidthChange={handleWidthChange}
          onHeightChange={handleHeightChange}
          onPlayModeChange={handlePlayModeChange}
          onRerunRequest={rerun}
          />
        <section className={styles.bottomSection}>
          <TilesetSelector
            value={settings.activeTileset}
            onSelect={handleTilesetChange}
          />
          <div className={styles.display}>
            <Grid
              width={settings.gridWidth}
              height={settings.gridHeight}
              cells={[...wfcg.iterCells()]}
              tilesetName={settings.activeTileset}
            />
            {!running && <PauseOverlay onDismiss={() => setRunning(true)} />}
          </div>
        </section>
      </main>
    </>
  );
}
