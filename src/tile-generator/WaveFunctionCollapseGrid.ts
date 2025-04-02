export { WaveFunctionCollapseGrid as default, Tile, type Cell, type Direction };

type Direction = "up" | "right" | "down" | "left";

class Cell<State extends string | number = string | number> {
  constructor(
    readonly x: number,
    readonly y: number,
    public possibleStates: State[]
  ) {}
  get isCollapsed() {
    return this.possibleStates.length === 1;
  }
  get value() {
    return this.isCollapsed ? this.possibleStates[0] : null;
  }
}

class Tile<TileName extends string | number = string | number> {
  constructor(
    public name: TileName,
    public up: string | number | readonly (string | number)[],
    public right: string | number | readonly (string | number)[],
    public down: string | number | readonly (string | number)[],
    public left: string | number | readonly (string | number)[]
  ) {}
}

/**
 * Aplica o algoritmo de Wave Function Collapse sobre uma grade de células, em
 * que cada célula irá conter um nome de *Tile* como estado.
 *
 * Cada *Tile* usa um nome como identificador e determina uma aresta válida ou
 * uma lista de arestas válidas em cada direção cardeal. Dois *Tiles* podem ser
 * vizinhos somente se as arestas encostadas forem compatíveis.
 */
class WaveFunctionCollapseGrid<
  TileName extends string | number = string | number
> {
  private grid: Cell<TileName>[];
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

  private readonly allTileNames: readonly TileName[];
  private readonly nameToTile: Map<TileName, Tile<TileName>>;
  private collisionOcurred = false;
  private gridHistory: Cell<TileName>[][] = [];
  private collapseHistory: (Cell<TileName> | null)[] = [];
  private get latestCollapse() {
    return this.collapseHistory.at(-1)!;
  }

  constructor(width: number, height: number, tiles: readonly Tile<TileName>[]) {
    this._width = width;
    this._height = height;
    this.allTileNames = tiles.map(tile => tile.name);
    this.nameToTile = new Map(tiles.map(tile => [tile.name, tile]));

    this.grid = Array(width * height);
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i] = this.createCell(i);
    }
    this.saveGridToHistory();
  }

  /** Executa o algoritmo até a grade estiver completa. */
  runUntilDone() {
    while (!this._isDone) {
      this.step();
    }
  }

  /** Avança o algoritmo 1 passo, até o próximo momento onde ele fará uma decisão. */
  step() {
    if (this._isDone) return;
    this.collapseRandomCell();
    this.propagateChanges(this.latestCollapse);
    if (this.collisionOcurred) this.backtrack();
    this.saveGridToHistory();
    this._isDone = this.grid.every(cell => cell.isCollapsed);
  }

  forEachCell(callback: (cell: Readonly<Cell<TileName>>) => void) {
    for (const cell of this.grid) {
      callback(cell);
    }
  }

  iterCells() {
    return this.grid.values() as IterableIterator<Readonly<Cell<TileName>>>;
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

  resize(newWidth: number, newHeight: number) {
    const newGrid = Array<Cell<TileName>>(newWidth * newHeight);
    const newCells: Cell<TileName>[] = [];
    for (let y = 0; y < newHeight; y++) {
      for (let x = 0; x < newWidth; x++) {
        const gridIndex = y * newWidth + x;
        let cell = this.getCellAtPosition(x, y);
        if (cell === null) {
          cell = new Cell(x, y, this.allTileNames.slice());
          newCells.push(cell);
        }
        newGrid[gridIndex] = cell;
      }
    }

    this.grid = newGrid;
    this._width = newWidth;
    this._height = newHeight;

    this.collapseHistory.push(null); // null indica que a grade foi redimensionada
    for (const cell of newCells) {
      this.propagateChanges(cell);
    }
    if (this.collisionOcurred) this.backtrack();
    this.saveGridToHistory();
    this._isDone = this.grid.every(cell => cell.isCollapsed);
  }

  resizeAndClear(newWidth: number, newHeight: number) {
    this._width = newWidth;
    this._height = newHeight;
    this.grid.length = newWidth * newHeight;
    this.clear();
  }

  private createCell(gridIndex: number): Cell<TileName> {
    return new Cell(
      gridIndex % this._width,
      Math.floor(gridIndex / this._width),
      this.allTileNames.slice()
    );
  }

  private collapseRandomCell() {
    // A entropia de uma célula é a quantidade de estados possíveis dela
    const lowestEntropy = this.grid
      .filter(cell => !cell.isCollapsed)
      .reduce((a, b) => Math.min(a, b.possibleStates.length), Infinity);
    const lowestEntropyCells = this.grid.filter(
      cell => cell.possibleStates.length === lowestEntropy
    );

    const pickedCell = pickRandom(lowestEntropyCells);
    const pickedTileName = pickRandom(pickedCell.possibleStates);
    pickedCell.possibleStates = [pickedTileName];

    this.collapseHistory.push(pickedCell);

    function pickRandom<T>(array: readonly T[]) {
      return array[Math.floor(Math.random() * array.length)];
    }
  }

  private propagateChanges(startingCell: Cell<TileName>) {
    const cellsToUpdate = new Set<Cell<TileName>>();
    for (const { neighbor } of this.getNeighboringCells(startingCell)) {
      if (!neighbor.isCollapsed) cellsToUpdate.add(neighbor);
    }

    while (cellsToUpdate.size > 0) {
      const currentCell = cellsToUpdate.values().next().value!;
      cellsToUpdate.delete(currentCell);

      const startingLength = currentCell.possibleStates.length;
      this.updateCellPossibilities(currentCell);

      if (this.collisionOcurred) return;

      if (currentCell.possibleStates.length !== startingLength) {
        for (const { neighbor } of this.getNeighboringCells(currentCell)) {
          if (!neighbor.isCollapsed) cellsToUpdate.add(neighbor);
        }
      }
    }
  }

  private updateCellPossibilities(cell: Cell<TileName>) {
    for (const { neighbor, direction } of this.getNeighboringCells(cell)) {
      cell.possibleStates = cell.possibleStates.filter(tileName => {
        return this.neighborAllowsTile(tileName, neighbor, direction);
      });
    }
    if (cell.possibleStates.length === 0) {
      this.collisionOcurred = true;
    }
  }

  private neighborAllowsTile(
    tileName: TileName,
    neighborCell: Cell<TileName>,
    direction: Direction
  ) {
    const oppositeDir = WaveFunctionCollapseGrid.oppositeDirection[direction];
    const allowedEdges = neighborCell.possibleStates.flatMap(
      neighborTileName => this.getTileFromName(neighborTileName)[oppositeDir]
    );
    const temp = this.getTileFromName(tileName)[direction];
    const edges = temp instanceof Array ? temp : [temp];
    return edges.some(edge => allowedEdges.includes(edge));
  }

  private getTileFromName(tileName: TileName) {
    return this.nameToTile.get(tileName)!;
  }

  private static readonly oppositeDirection = {
    up: "down",
    right: "left",
    down: "up",
    left: "right",
  } as const;

  private *getNeighboringCells(cell: Cell<TileName>) {
    for (const { direction, x, y } of WaveFunctionCollapseGrid.adjacencies) {
      const neighbor = this.getCellAtPosition(cell.x + x, cell.y + y);
      if (neighbor !== null) {
        yield { neighbor, direction };
      }
    }
  }

  private getCellAtPosition(x: number, y: number) {
    if (x < 0 || x >= this._width || y < 0 || y >= this._height) return null;
    return this.grid[y * this._width + x] ?? null;
  }
  // prettier-ignore
  private static readonly adjacencies = [
		{ direction: "up",    x:  0,  y: -1 },
		{ direction: "right", x:  1,  y:  0 },
		{ direction: "down",  x:  0,  y:  1 },
		{ direction: "left",  x: -1,  y:  0 },
  ] as const;

  private backtrack() {
    this.collisionOcurred = false;
    if (this.gridHistory.length === 0) throw new Error("Impossible tileset");

    this.grid = this.gridHistory.pop()!;
    const cellPicked = this.collapseHistory.pop() as Cell<TileName> | null;

    if (cellPicked === null) {
      // Um valor nulo indica que a grade foi redimensionada
      const resizedWidth = this.width;
      const resizedHeight = this.height;
      const lastCell = this.grid.at(-1)!;
      this._width = lastCell.x + 1;
      this._height = lastCell.y + 1;
      this.resize(resizedWidth, resizedHeight);
      return;
    }

    // Remove o Tile que causou a colisão
    const tileNamePicked = cellPicked.value!;
    const recoveredCell = this.getCellAtPosition(cellPicked.x, cellPicked.y)!;
    removeTileFromPossibilities(recoveredCell, tileNamePicked);

    if (recoveredCell.possibleStates.length === 0) {
      this.backtrack();
    }

    function removeTileFromPossibilities(
      cell: Cell<TileName>,
      tileName: TileName
    ) {
      cell.possibleStates = cell.possibleStates.filter(s => s !== tileName);
    }
  }

  private saveGridToHistory() {
    const gridCopy = this.grid.map(
      cell => new Cell(cell.x, cell.y, cell.possibleStates.slice())
    );
    this.gridHistory.push(gridCopy);
  }
}
