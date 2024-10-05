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
  const [paused, setPaused] = useState(true);
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

  if (settings.skipAnimation && !paused) {
    while (!wfcg.isDone) {
      wfcg.step();
      setStepsTaken(prev => prev + 1);
    }
  }

  let animationState: "done" | "running" | "paused";
  if (wfcg.isDone) animationState = "done";
  else if (paused) animationState = "paused";
  else animationState = "running";

  useEffect(() => {
    if (animationState !== "running" || settings.skipAnimation) return;
    const interval = setInterval(() => {
      wfcg.step();
      setStepsTaken(prev => prev + 1);
    }, intervalDuration);
    return () => clearInterval(interval);
  }, [wfcg, animationState, settings.skipAnimation, intervalDuration]);

  const handleTilesetChange = useCallback((newTileset: TilesetName) => {
    setSettings(prev => ({ ...prev, activeTileset: newTileset }));
    setStepsTaken(0);
    setWfcg(
      prev =>
        new WaveFunctionCollapseGrid(
          prev.width,
          prev.height,
          TILESETS[newTileset]
        )
    );
  }, []);

  function handlePlayPause() {
    if (wfcg.isDone) {
      wfcg.clear();
      setStepsTaken(0);
    } else {
      setPaused(prev => !prev);
    }
  }
  function handleWidthChange(newWidth: number) {
    setSettings(prev => ({ ...prev, gridWidth: newWidth }));
    wfcg.resizeAndClear(newWidth, settings.gridHeight);
    setStepsTaken(0);
  }
  function handleHeightChange(newHeight: number) {
    setSettings(prev => ({ ...prev, gridHeight: newHeight }));
    wfcg.resizeAndClear(settings.gridWidth, newHeight);
    setStepsTaken(0);
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
        animationState={animationState}
        onWidthChange={handleWidthChange}
        onHeightChange={handleHeightChange}
        onAnimationModeChange={handleAnimationModeChange}
        onPlayPause={handlePlayPause}
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
        {paused && <PauseOverlay onDismiss={handlePlayPause} />}
      </section>
    </main>
  );
}
