import { Tile } from "../scripts/WaveFunctionCollapseGrid";

export { TILESETS, type TilesetName };

type TilesetName = keyof typeof TILESETS;

//prettier-ignore
const TILESETS = {
  terrain: [
    new Tile("sky",                [1, 2], [3, 4], [1, 2], [3, 4]),
    new Tile("center",             0, 0, 0, 0),
    new Tile("top",                1, [5, 6], 0, [5, 6]),
    new Tile("right",              [7, 8], 3, [7, 8], 0),
    new Tile("bottom",             0, [9, 10], 2, [9, 10]),
    new Tile("left",               [11, 12], 0, [11, 12], 4),
    new Tile("top left",           1, [5, 6], [11, 12], 4),
    new Tile("top right",          1, 3, [7, 8], [5, 6]),
    new Tile("bottom left",        [11, 12], [9, 10], 2, 4),
    new Tile("bottom right",       [7, 8], 3, [9, 10], 4),
    new Tile("top left inner",     11, 0, 0, 5),
    new Tile("top right inner",    7, 6, 0, 0),
    new Tile("bottom left inner",  0, 0, 12, 9),
    new Tile("bottom right inner", 0, 10, 8, 0),
  ],
  "pipe network": [
    new Tile("blank",      0, 0, 0, 0),
    new Tile("horizontal", 0, 1, 0, 1),
    new Tile("vertical",   1, 0, 1, 0),
    new Tile("t up",         1, 1, 0, 1),
    new Tile("t right",      1, 1, 1, 0),
    new Tile("t down",       0, 1, 1, 1),
    new Tile("t left",       1, 0, 1, 1),
    ],
};
