import { Tile } from "../scripts/WaveFunctionCollapseGrid";

export { TILESETS, type TilesetName, type TileName };

type TilesetName = keyof typeof TILESETS;

//extrai os nomes de tiles do objeto tilesets
type TileName = (typeof TILESETS)[TilesetName][number]["name"];

const enum TerrainTile {
  SKY = "sky",
  CENTER = "center",
  TOP = "top",
  RIGHT = "right",
  BOTTOM = "bottom",
  LEFT = "left",
  TOP_LEFT = "top left",
  BOTTOM_LEFT = "bottom left",
  BOTTOM_RIGHT = "bottom right",
  TOP_RIGHT = "top right",
  TOP_LEFT_INNER = "top left inner",
  TOP_RIGHT_INNER = "top right inner",
  BOTTOM_LEFT_INNER = "bottom left inner",
  BOTTOM_RIGHT_INNER = "bottom right inner",
}

const enum PipeTile {
  BLANK = "blank",
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
  UP = "t up",
  RIGHT = "t right",
  DOWN = "t down",
  LEFT = "t left",
}

//prettier-ignore
const TILESETS: {
  terrain: readonly Tile<TerrainTile>[];
  "pipe network": readonly Tile<PipeTile>[];
} = {
  terrain: [
    new Tile(TerrainTile.SKY,                [1, 2], [3, 4], [1, 2], [3, 4]),
    new Tile(TerrainTile.CENTER,             0, 0, 0, 0),
    new Tile(TerrainTile.TOP,                1, [5, 6], 0, [5, 6]),
    new Tile(TerrainTile.RIGHT,              [7, 8], 3, [7, 8], 0),
    new Tile(TerrainTile.BOTTOM,             0, [9, 10], 2, [9, 10]),
    new Tile(TerrainTile.LEFT,               [11, 12], 0, [11, 12], 4),
    new Tile(TerrainTile.TOP_LEFT,           1, [5, 6], [11, 12], 4),
    new Tile(TerrainTile.TOP_RIGHT,          1, 3, [7, 8], [5, 6]),
    new Tile(TerrainTile.BOTTOM_LEFT,        [11, 12], [9, 10], 2, 4),
    new Tile(TerrainTile.BOTTOM_RIGHT,       [7, 8], 3, [9, 10], 4),
    new Tile(TerrainTile.TOP_LEFT_INNER,     11, 0, 0, 5),
    new Tile(TerrainTile.TOP_RIGHT_INNER,    7, 6, 0, 0),
    new Tile(TerrainTile.BOTTOM_LEFT_INNER,  0, 0, 12, 9),
    new Tile(TerrainTile.BOTTOM_RIGHT_INNER, 0, 10, 8, 0),
  ],
  "pipe network": [
    new Tile(PipeTile.BLANK,      0, 0, 0, 0),
    new Tile(PipeTile.HORIZONTAL, 0, 1, 0, 1),
    new Tile(PipeTile.VERTICAL,   1, 0, 1, 0),
    new Tile(PipeTile.UP,         1, 1, 0, 1),
    new Tile(PipeTile.RIGHT,      1, 1, 1, 0),
    new Tile(PipeTile.DOWN,       0, 1, 1, 1),
    new Tile(PipeTile.LEFT,       1, 0, 1, 1),
    ],
};
