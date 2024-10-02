"use client";

import styles from "./Content.module.css";
import { useCallback, useEffect, useState } from "react";
import Controls from "./Controls";
import TilesetSelector from "./TilesetSelector";
import Grid from "./Grid";
import PauseOverlay from "./PauseOverlay";
import WaveFunctionCollapseGrid from "../scripts/WaveFunctionCollapseGrid";
import { TILESETS, TilesetName } from "../data/tileData";

export default function Content() {
  const intervalDuration = 100;
  const [running, setRunning] = useState(false);
  const [stepsTaken, setStepsTaken] = useState(0);
  const [settings, setSettings] = useState({
    activeTileset: "terrain" as TilesetName,
    gridWidth: 10,
    gridHeight: 10,
    skipAnimation: false,
  });
  const [wfcg, setWfcg] = useState(
    new WaveFunctionCollapseGrid(
      settings.gridWidth,
      settings.gridHeight,
      TILESETS[settings.activeTileset]
    )
  );

  if (running && settings.skipAnimation) {
    while (!wfcg.isDone) {
      wfcg.step();
      setStepsTaken(prev => prev + 1);
    }
  }

  useEffect(() => {
    if (!running || wfcg.isDone || settings.skipAnimation) return;
    const interval = setInterval(() => {
      wfcg.step();
      setStepsTaken(prev => prev + 1);
    }, intervalDuration);
    return () => clearInterval(interval);
  }, [running, wfcg, stepsTaken, settings.skipAnimation]);

  useEffect(() => {
    setStepsTaken(0);
  }, [wfcg, settings.gridWidth, settings.gridHeight, settings.activeTileset]);

  function rerun() {
    wfcg.clear();
    setStepsTaken(0);
  }

  const handleTilesetChange = useCallback((newTileset: TilesetName) => {
    setSettings(prev => ({ ...prev, activeTileset: newTileset }));
    setWfcg(
      prev =>
        new WaveFunctionCollapseGrid(
          prev.width,
          prev.height,
          TILESETS[newTileset]
        )
    );
  }, []);
  function handleWidthChange(newWidth: number) {
    setSettings(prev => ({ ...prev, gridWidth: newWidth }));
    wfcg.resizeAndClear(newWidth, settings.gridHeight);
  }
  function handleHeightChange(newHeight: number) {
    setSettings(prev => ({ ...prev, gridHeight: newHeight }));
    wfcg.resizeAndClear(settings.gridWidth, newHeight);
  }
  function handleAnimationModeChange(skipAnimation: boolean) {
    setSettings(prev => ({ ...prev, skipAnimation }));
  }

  return (
    <main className={styles.main}>
      <Controls
        gridWidth={settings.gridWidth}
        gridHeight={settings.gridHeight}
        skipAnimation={settings.skipAnimation}
        onWidthChange={handleWidthChange}
        onHeightChange={handleHeightChange}
        onAnimationModeChange={handleAnimationModeChange}
        onRerunRequest={rerun}
      />
      <section className={styles.contentSection}>
        <TilesetSelector
          value={settings.activeTileset}
          onSelect={handleTilesetChange}
        />
        <Grid
          width={settings.gridWidth}
          height={settings.gridHeight}
          cells={[...wfcg.iterCells()]}
          tilesetName={settings.activeTileset}
        />
        {!running && <PauseOverlay onDismiss={() => setRunning(true)} />}
      </section>
    </main>
  );
}
