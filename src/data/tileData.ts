import { Tile } from "../tile-generator/WaveFunctionCollapseGrid";

export { TILESETS, type TilesetName };

type TilesetName = keyof typeof TILESETS;

// prettier-ignore
const TILESETS = {
  terrain: [
    new Tile("sky",                "00", "00", "00", "00"),
    new Tile("center",             "11", "11", "11", "11"),
    new Tile("top",                "00", "01", "11", "01"),
    new Tile("right",              "10", "00", "10", "11"),
    new Tile("bottom",             "11", "10", "00", "10"),
    new Tile("left",               "01", "11", "01", "00"),
    new Tile("top-left",           "00", "01", "01", "00"),
    new Tile("top-right",          "00", "00", "10", "01"),
    new Tile("bottom-left",        "01", "10", "00", "00"),
    new Tile("bottom-right",       "10", "00", "00", "10"),
    new Tile("top-left-inner",     "11", "10", "10", "11"),
    new Tile("top-right-inner",    "11", "11", "01", "10"),
    new Tile("bottom-left-inner",  "10", "01", "11", "11"),
    new Tile("bottom-right-inner", "01", "11", "11", "01"),
    new Tile("main-diagonal",      "10", "01", "01", "10"),
    new Tile("secondary-diagonal", "01", "10", "10", "01"),
  ],
  "pipe-network": [
    new Tile("blank",      0, 0, 0, 0),
    new Tile("horizontal", 0, 1, 0, 1),
    new Tile("vertical",   1, 0, 1, 0),
    new Tile("t-up",       1, 1, 0, 1),
    new Tile("t-right",    1, 1, 1, 0),
    new Tile("t-down",     0, 1, 1, 1),
    new Tile("t-left",     1, 0, 1, 1),
  ]
};
