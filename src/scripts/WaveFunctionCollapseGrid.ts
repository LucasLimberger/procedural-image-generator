export { WaveFunctionCollapseGrid as default, Tile, type Cell, type Direction };

type Direction = "up" | "right" | "down" | "left";

class Cell<TileId extends string | number = string | number> {
  constructor(
    readonly x: number,
    readonly y: number,
    public possibilities: TileId[]
  ) {}
  get isCollapsed() {
    return this.possibilities.length === 1;
  }
}

class Tile<TileId extends string | number = string | number> {
  constructor(
    public id: TileId,
    public up: string | number | readonly (string | number)[],
    public right: string | number | readonly (string | number)[],
    public down: string | number | readonly (string | number)[],
    public left: string | number | readonly (string | number)[]
  ) {}
}

/**
 * Aplica o algoritmo de Wave Function Collapse sobre uma grade de células,
 * em que cada célula pode conter qualquer *Tile*.
 *
 * Cada *Tile* é definido por um identificador e contém uma aresta válida
 * ou lista de arestas válidas em cada direção cardeal
 */
class WaveFunctionCollapseGrid<
  TileId extends string | number = string | number
> {
  private grid: Cell<TileId>[];
  private _width;
  private _height;
  private _isDone = false;

  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  get isDone() {
    return this._isDone;
  }

  private readonly allTileIds: readonly TileId[];
  private readonly idToTile: Map<TileId, Tile<TileId>>;
  private collisionOcurred = false;
  private gridHistory: Cell<TileId>[][] = [];
  private collapseHistory: Cell<TileId>[] = [];
  private get latestCollapse() {
    return this.collapseHistory.at(-1)!;
  }

  constructor(width: number, height: number, tiles: readonly Tile<TileId>[]) {
    this._width = width;
    this._height = height;
    this.allTileIds = tiles.map(tile => tile.id);
    this.idToTile = new Map(tiles.map(tile => [tile.id, tile]));

    this.grid = Array(width * height)
      .fill(0)
      .map((_, i) => this.createCell(i));

    this.saveGridToHistory();
  }
  private createCell(gridIndex: number): Cell<TileId> {
    return new Cell(
      gridIndex % this._width,
      Math.floor(gridIndex / this._width),
      this.allTileIds.slice()
    );
  }

  /** Executa o algoritmo até a grade estiver completa */
  runUntilDone() {
    while (!this._isDone) {
      this.step();
    }
  }

  /** Avança o algoritmo 1 passo, até o próximo momento onde ele fará uma decisão */
  step() {
    if (this._isDone) return;
    this.collapseRandomCell();
    this.propagateChanges();
    if (this.collisionOcurred) this.backtrack();
    this.saveGridToHistory();
    this._isDone = this.grid.every(cell => cell.isCollapsed);
  }

  forEachCell(callback: (cell: Readonly<Cell<TileId>>) => void) {
    for (const cell of this.grid) {
      callback(cell);
    }
  }
  iterCells() {
    return this.grid.values() as IterableIterator<Readonly<Cell<TileId>>>;
  }
  clear() {
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i] = this.createCell(i);
    }
    this._isDone = false;
    this.gridHistory = [];
    this.collapseHistory = [];
    this.saveGridToHistory();
  }
  resizeAndClear(newWidth: number, newHeight: number) {
    this._width = newWidth;
    this._height = newHeight;
    this.grid.length = newWidth * newHeight;
    this.clear();
  }

  private collapseRandomCell() {
    const lowestEntropy = this.grid
      .filter(cell => !cell.isCollapsed)
      .reduce((a, b) => Math.min(a, b.possibilities.length), Infinity);
    const lowestEntropyCells = this.grid.filter(
      cell => cell.possibilities.length === lowestEntropy
    );
    const pickedCell = pickRandom(lowestEntropyCells);
    pickedCell.possibilities = [pickRandom(pickedCell.possibilities)];

    this.collapseHistory.push(pickedCell);

    function pickRandom<T>(array: readonly T[]) {
      return array[Math.floor(Math.random() * array.length)];
    }
  }

  private propagateChanges() {
    const startingCell = this.latestCollapse;
    const cellsToUpdate = new Set<Cell<TileId>>();
    for (const { neighbor } of this.getNeighboringCells(startingCell)) {
      if (!neighbor.isCollapsed) cellsToUpdate.add(neighbor);
    }

    while (cellsToUpdate.size > 0) {
      //retira a primeira célula do set
      const currentCell: Cell<TileId> = cellsToUpdate.values().next().value;
      cellsToUpdate.delete(currentCell);

      const startingLength = currentCell.possibilities.length;
      this.updateCellPossibilities(currentCell);

      if (this.collisionOcurred) return;

      if (currentCell.possibilities.length !== startingLength) {
        for (const { neighbor } of this.getNeighboringCells(currentCell)) {
          if (!neighbor.isCollapsed) cellsToUpdate.add(neighbor);
        }
      }
    }
  }
  private updateCellPossibilities(cell: Cell<TileId>) {
    for (const { neighbor, direction } of this.getNeighboringCells(cell)) {
      cell.possibilities = cell.possibilities.filter(possibleTile => {
        return this.neighborAllowsTile(possibleTile, neighbor, direction);
      });
    }
    if (cell.possibilities.length === 0) {
      this.collisionOcurred = true;
    }
  }
  private neighborAllowsTile(
    tile: TileId,
    neighborCell: Cell<TileId>,
    direction: Direction
  ) {
    const oppositeDir = WaveFunctionCollapseGrid.oppositeDirection[direction];
    const temp = this.idToTile.get(tile)![direction];
    const validEdges = temp instanceof Array ? temp : [temp];
    const neighborEdges = neighborCell.possibilities.flatMap(
      tileId => this.idToTile.get(tileId)![oppositeDir]
    );
    return validEdges.some(edge => neighborEdges.includes(edge));
  }
  private static readonly oppositeDirection: Record<Direction, Direction> = {
    up: "down",
    right: "left",
    down: "up",
    left: "right",
  };

  private *getNeighboringCells(cell: Cell<TileId>) {
    for (const { direction, x, y } of WaveFunctionCollapseGrid.adjacencies) {
      const neighbor = this.getCellAtPosition(cell.x + x, cell.y + y);
      if (neighbor !== null) {
        yield { neighbor, direction };
      }
    }
  }
  private getCellAtPosition(x: number, y: number) {
    if (x < 0 || x >= this._width || y < 0 || y >= this._height) return null;
    return this.grid[y * this._width + x];
  }
  // prettier-ignore
  private static readonly adjacencies: readonly {
    direction: Direction;
    x: number;
    y: number;
  }[] = [
		{ direction: "up",    x:  0,  y:  1 },
		{ direction: "right", x:  1,  y:  0 },
		{ direction: "down",  x:  0,  y: -1 },
		{ direction: "left",  x: -1,  y:  0 },
  ];

  private backtrack() {
    this.collisionOcurred = false;
    if (this.gridHistory.length === 0) throw new Error("Impossible tileset");

    this.grid = this.gridHistory.pop()!;
    const cellPicked = this.collapseHistory.pop()!;

    // remove a possibilidade que levou a uma colisão
    const index = cellPicked.y * this._width + cellPicked.x;
    const possibilityPicked = cellPicked.possibilities[0];
    const replacementCell = this.grid[index];
    replacementCell.possibilities = replacementCell.possibilities.filter(
      p => p !== possibilityPicked
    );

    if (replacementCell.possibilities.length === 0) {
      this.backtrack();
    }
  }

  private saveGridToHistory() {
    const gridCopy = this.grid.map(
      cell => new Cell(cell.x, cell.y, cell.possibilities.slice())
    );
    this.gridHistory.push(gridCopy);
  }
}
