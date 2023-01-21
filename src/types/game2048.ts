enum Direction {
  Up,
  Right,
  Down,
  Left
}

export class game2048 {
  private readonly _tiles : Tiles;
  private _score : number;
  constructor(size : number = 4) {
    this._tiles = new Tiles(size);
    this._score = 0;
  }
  
  setState = (tiles_ : number[][]) => {
    this._tiles.setState(tiles_);
  }

  getState = () : number[][] => {
    return this._tiles.getState();
  }

  getScore = () : number => {
    return this._score;
  }

  moveLeft() : Map<string, string> {
    const movements = new Map<string, string>();
    const moveDirection = Direction.Left;
    for (let r = 0; r < this._tiles.size; r++) {
      const firstTile = this._tiles.getFirstTile(moveDirection, r);
      this.move(firstTile, moveDirection, movements);
    }
    return movements;
  }

  moveRight() : Map<string, string> {
    const movements = new Map<string, string>();
    const moveDirection = Direction.Right;
    for (let r = 0; r < this._tiles.size; r++) {
      const firstTile = this._tiles.getFirstTile(moveDirection, r);
      this.move(firstTile, moveDirection, movements);
    }
    return movements;
  }

  moveUp() : Map<string, string> {
    const movements = new Map<string, string>();
    const moveDirection = Direction.Up;
    for (let c = 0; c < this._tiles.size; c++) {
      const firstTile = this._tiles.getFirstTile(moveDirection, c);
      this.move(firstTile, moveDirection, movements);
    }
    return movements;
  }

  moveDown() : Map<string, string> {
    const movements = new Map<string, string>();
    const moveDirection = Direction.Down;
    for (let c = 0; c < this._tiles.size; c++) {
      const firstTile = this._tiles.getFirstTile(moveDirection, c);
      this.move(firstTile, moveDirection, movements);
    }
    return movements;
  }

  private move(firstTile : Tile, direction : Direction, movements : Map<string, string>) {
    let t : Tile | null = firstTile; 
    while (t != null) {
      let nextNonZeroTile = this._tiles.getNextNonZero(t, direction);
      if (nextNonZeroTile == null) break;
      if (t.value === 0) {
        t.add(nextNonZeroTile);
        movements.set(nextNonZeroTile.address(), t.address());
        nextNonZeroTile.value = 0;
        nextNonZeroTile = this._tiles.getNextNonZero(nextNonZeroTile, direction);
      }
      if (nextNonZeroTile == null) break;
      if (t.value === nextNonZeroTile.value) {
        this._score += t.add(nextNonZeroTile);
        movements.set(nextNonZeroTile.address(), t.address());
        nextNonZeroTile.value = 0; 
      }
      t = this._tiles.getNext(t, direction);
    }
  }

  isGameOver() : boolean {
    for (let r = 0; r < this._tiles.size; r++) {
      for (let c = 0; c < this._tiles.size; c++) {
        const t = this._tiles.getTile(r, c); 
        if (t == null) break;
        if (t?.value === 0)
        {
          return false;
        }
        else if (t?.value === this._tiles.getNext(t, Direction.Left)?.value)
        {
          return false;
        }
        else if (t?.value === this._tiles.getNext(t, Direction.Up)?.value)
        {
          return false;
        }
      }
    }
    return true;
  }

  fillRandomTiles(fillCount : number = 0, fillValues : number[] = [2, 4]) {
    var emtpyTiles = [];
    for (let r = 0; r < this._tiles.size; r++) {
      for (let c = 0; c < this._tiles.size; c++) {
        if (this._tiles.getTile(r, c)?.value === 0)
        {
          emtpyTiles.push({row: r, col : c});
        }
      }
    }
    if (emtpyTiles.length === 0) {
      return;
    }
    else if (emtpyTiles.length === 1) {
      const rndLoc = emtpyTiles[0];
      const rndVal = fillValues[Math.floor(Math.random() * fillValues.length)];
      const tile = this._tiles.getTile(rndLoc.row, rndLoc.col);
      if (tile != null) tile.value = rndVal;
    } else {
      fillCount = fillCount > 0 ? fillCount : Math.ceil(Math.random() * 2);
      for (let f = 0; f < fillCount; f++) {
        const rndLoc = emtpyTiles[Math.floor(Math.random() * emtpyTiles.length)];
        const rndVal = fillValues[Math.floor(Math.random() * fillValues.length)];
        const tile = this._tiles.getTile(rndLoc.row, rndLoc.col);
        if (tile != null) tile.value = rndVal;
      }
    }
  }
}

class Tile {
  public value : number;
  public get r() : number { return this._r; };
  public get c() : number { return this._c; };

  constructor(private readonly _r: number, private readonly _c : number) {
    this.value = 0;
  }

  add(tile : Tile) : number {
    this.value += tile.value;
    return this.value;
  }

  address(): string {
    return this._r + "-" + this._c;
  }
}

class Tiles {
  private readonly _tiles : Tile[][];
  constructor(public readonly size: number = 4) {
    this._tiles = [];
    for (let r = 0; r < this.size; r++) {
      this._tiles[r] = [];
      for (let c = 0; c < this.size; c++) {
        this._tiles[r][c] = new Tile(r, c);
      }
    }
  }

  getTile(r : number, c : number) : Tile | null{
    return r < 0 || c < 0 || r >= this.size || c >= this.size ?  null : this._tiles[r][c];
  }

  getNext(tile: Tile, moveDirection : Direction) : Tile | null {
    if (moveDirection === Direction.Down) {
      return this.getTile(tile.r - 1, tile.c);
    }
    else if (moveDirection === Direction.Left) {
      return this.getTile(tile.r, tile.c + 1);
    }
    else if (moveDirection === Direction.Up) {
      return this.getTile(tile.r + 1, tile.c);
    }
    else if (moveDirection === Direction.Right) {
      return this.getTile(tile.r, tile.c - 1);
    }
    return null;
  }

  getNextNonZero(tile :Tile, moveDirection : Direction) : Tile | null {
    let nextTile : Tile | null = tile;
    do
    {
      nextTile = this.getNext(nextTile, moveDirection);
      if (nextTile == null) return null;
      else if (nextTile.value > 0) return nextTile;
    } while (true);
  }

  getFirstTile(moveDirection: Direction, rc : number) : Tile {
    if (rc < 0 || rc >= this.size) throw new Error("Bad rc value");
    if (moveDirection === Direction.Up) {
      return this._tiles[0][rc];
    }
    else if (moveDirection === Direction.Right) {
      return this._tiles[rc][this.size - 1];
    }
    else if (moveDirection === Direction.Down) {
      return this._tiles[this.size - 1][rc];
    }
    else if (moveDirection === Direction.Left) {
      return this._tiles[rc][0];
    }
    throw new Error("Bad direction value");
  }

  setState = (tiles_ : number[][]) => {
    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        this._tiles[r][c].value = tiles_[r][c];
      }
    }
  }

  getState = () : number[][] => {
    const state = Array.from(Array(this.size), _ => Array(this.size).fill(0));
    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        state[r][c] = this._tiles[r][c].value;
      }
    }
    return state;
  }
}