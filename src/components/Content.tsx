"use client";

import styles from "./Content.module.css";
import { useCallback } from "react";
import useTileGridGenerator from "@/custom-hooks/useTileGridGenerator";
import Controls from "./Controls";
import Grid from "./Grid";
import TilesetSelector from "./TilesetSelector";
import PauseOverlay from "./PauseOverlay";

export default function Content() {
  const { cells, state, restart, settings, updateSettings } =
    useTileGridGenerator();

  const handlePlayPauseRestart = useCallback(() => {
    if (state === "done") {
      restart();
    } else {
      updateSettings({ paused: state !== "paused" });
    }
  }, [state, restart, updateSettings]);

  return (
    <main className={styles.main}>
      <Controls
        gridWidth={settings.gridWidth}
        gridHeight={settings.gridHeight}
        skipAnimation={settings.skipAnimation}
        animationState={state}
        onWidthChange={newWidth => updateSettings({ gridWidth: newWidth })}
        onHeightChange={newHeight => updateSettings({ gridHeight: newHeight })}
        onAnimationModeChange={skipAnimation =>
          updateSettings({ skipAnimation })
        }
        onPlayPauseRestart={handlePlayPauseRestart}
      />
      <section className={styles.contentSection}>
        <div className={styles.stripedBackground}>
          <TilesetSelector
            value={settings.activeTileset}
            onSelect={newTileset =>
              updateSettings({ activeTileset: newTileset })
            }
          />
        </div>
        <div className={styles.gridWrapper}>
          <Grid
            width={settings.gridWidth}
            height={settings.gridHeight}
            cells={cells}
            tilesetName={settings.activeTileset}
          />
        </div>
        <div className={styles.stripedBackground} />
        {settings.paused && (
          <div className={styles.pauseOverlayWrapper}>
            <PauseOverlay onDismiss={handlePlayPauseRestart} />
          </div>
        )}
      </section>
    </main>
  );
}
