import { useState, useEffect, useCallback } from "react";
import WaveFunctionCollapseGrid from "@/scripts/WaveFunctionCollapseGrid";
import { TilesetName, TILESETS } from "@/data/tileData";

export default function useTileGridGenerator() {
  const [stepsTaken, setStepsTaken] = useState(0);
  const [settings, setSettings] = useState({
    paused: true,
    activeTileset: "terrain" as TilesetName,
    gridWidth: 10,
    gridHeight: 10,
    skipAnimation: false,
  });
  const [wfcg, setWfcg] = useState(
    new WaveFunctionCollapseGrid<string>(
      settings.gridWidth,
      settings.gridHeight,
      TILESETS[settings.activeTileset]
    )
  );

  let state: "done" | "running" | "paused";
  if (wfcg.isDone) {
    state = "done";
  } else if (settings.paused) {
    state = "paused";
  } else {
    state = "running";
  }

  if (state === "running" && settings.skipAnimation) {
    while (!wfcg.isDone) {
      wfcg.step();
      setStepsTaken(prev => prev + 1);
    }
    state = "done";
  }

  // Animação
  const gridSize = settings.gridWidth * settings.gridHeight;
  const intervalDuration = Math.min(500, 5000 / gridSize);
  useEffect(() => {
    if (state !== "running" || settings.skipAnimation) return;
    const interval = setInterval(() => {
      wfcg.step();
      setStepsTaken(prev => prev + 1);
    }, intervalDuration);
    return () => clearInterval(interval);
  }, [state, settings.skipAnimation, wfcg, intervalDuration]);

  // Funções a serem chamdas de fora

  const restart = useCallback(() => {
    wfcg.clear();
    setStepsTaken(0);
  }, [wfcg]);

  const updateSettings = useCallback(
    (changes: Partial<typeof settings>) => {
      setSettings(prev => {
        const mergedSettings = { ...prev, ...changes };

        if (mergedSettings.activeTileset !== prev.activeTileset) {
          setStepsTaken(0);
          setWfcg(
            new WaveFunctionCollapseGrid(
              mergedSettings.gridWidth,
              mergedSettings.gridHeight,
              TILESETS[mergedSettings.activeTileset]
            )
          );
        } else if (
          mergedSettings.gridWidth !== prev.gridWidth ||
          mergedSettings.gridHeight !== prev.gridHeight
        ) {
          wfcg.resize(mergedSettings.gridWidth, mergedSettings.gridHeight);
        }

        return mergedSettings;
      });
    },
    [wfcg]
  );

  const cells = [...wfcg.iterCells()];
  return {
    cells,
    state,
    stepsTaken,
    restart,
    settings,
    updateSettings,
  } as const;
}
