import { game2048 } from "./game2048";

describe('moveLeft', () => {
  it('#1', () => {
    const game = new game2048();
    game.setState([
      [0, 2, 0, 0], 
      [2, 2, 0, 0], 
      [0, 2, 0, 2], 
      [2, 2, 2, 2]]);
    const movements = game.moveLeft();
    const newState = game.getState(); 
    expect(newState).toEqual([
      [2, 0, 0, 0], 
      [4, 0, 0, 0], 
      [4, 0, 0, 0], 
      [4, 4, 0, 0]]);
    expect(game.getScore()).toBe(16);
    expect(movements).toEqual(
      new Map([
        ["0-1", "0-0"],
        ["1-1", "1-0"],
        ["2-1", "2-0"],
        ["2-3", "2-0"],
        ["3-1", "3-0"],
        ["3-2", "3-1"],
        ["3-3", "3-1"]
      ]));
  });

  it('#2', () => {
    const game = new game2048();
    game.setState([
      [8, 2, 2, 0], 
      [2, 2, 0, 8], 
      [16, 2, 8, 128], 
      [2, 2, 2, 2]]);
    const movements = game.moveLeft();
    const newState = game.getState(); 
    expect(newState).toEqual([
      [8, 4, 0, 0], 
      [4, 8, 0, 0], 
      [16, 2, 8, 128], 
      [4, 4, 0, 0]]);
    expect(game.getScore()).toBe(16);
    expect(movements).toEqual(
      new Map([
        ["0-2", "0-1"],
        ["1-1", "1-0"],
        ["1-3", "1-1"],
        ["3-1", "3-0"],
        ["3-2", "3-1"],
        ["3-3", "3-1"]
      ]));
  });
});


describe('moveRight', () => {
  it('#1', () => {
    const game = new game2048();
    game.setState([
      [0, 2, 0, 0], 
      [2, 2, 0, 0], 
      [0, 2, 0, 2], 
      [2, 2, 2, 2]]);
    game.moveRight();
    const newState = game.getState(); 
    expect(newState).toEqual([
      [0, 0, 0, 2], 
      [0, 0, 0, 4], 
      [0, 0, 0, 4], 
      [0, 0, 4, 4]]);
    expect(game.getScore()).toBe(16);
  });

  it('#2', () => {
    const game = new game2048();
    game.setState([
      [8, 2, 2, 0], 
      [2, 2, 0, 8], 
      [16, 2, 8, 128], 
      [2, 2, 2, 2]]);
    game.moveRight();
    const newState = game.getState(); 
    expect(newState).toEqual([
      [0, 0, 8, 4], 
      [0, 0, 4, 8], 
      [16, 2, 8, 128], 
      [0, 0, 4, 4]]);
    expect(game.getScore()).toBe(16);
  });

  it('#3', () => {
    const game = new game2048();
    game.setState([
      [128, 2, 256, 128], 
      [32, 128, 16, 8], 
      [16, 8, 4, 0], 
      [4, 2, 4, 4]]);
    game.moveRight();
    const newState = game.getState(); 
    expect(newState).toEqual([
      [128, 2, 256, 128], 
      [32, 128, 16, 8], 
      [0, 16, 8, 4], 
      [0, 4, 2, 8]]);
    expect(game.getScore()).toBe(8);
  });
});

describe('moveUp', () => {
  it('#1', () => {
    const game = new game2048();
    game.setState([
      [0, 2, 0, 0], 
      [2, 2, 0, 0], 
      [0, 2, 0, 2], 
      [2, 2, 2, 2]]);
    game.moveUp();
    const newState = game.getState(); 
    expect(newState).toEqual([
      [4, 4, 2, 4], 
      [0, 4, 0, 0], 
      [0, 0, 0, 0], 
      [0, 0, 0, 0]]);
    expect(game.getScore()).toBe(16);
  });

  it('#2', () => {
    const game = new game2048();
    game.setState([
      [8, 2, 2, 0], 
      [2, 2, 0, 8], 
      [16, 2, 8, 128], 
      [2, 2, 2, 2]]);
    game.moveUp();
    const newState = game.getState(); 
    expect(newState).toEqual([
      [8, 4, 2, 8], 
      [2, 4, 8, 128], 
      [16, 0, 2, 2], 
      [2, 0, 0, 0]]);
    expect(game.getScore()).toBe(8);
  });
});

describe('moveDown', () => {
  it('#1', () => {
    const game = new game2048();
    game.setState([
      [0, 2, 0, 0], 
      [2, 2, 0, 0], 
      [0, 2, 0, 2], 
      [2, 2, 2, 2]]);
    game.moveDown();
    const newState = game.getState(); 
    expect(newState).toEqual([
      [0, 0, 0, 0], 
      [0, 0, 0, 0], 
      [0, 4, 0, 0], 
      [4, 4, 2, 4]]);
    expect(game.getScore()).toBe(16);
  });

  it('#2', () => {
    const game = new game2048();
    game.setState([
      [8, 2, 2, 0], 
      [2, 2, 0, 8], 
      [16, 2, 8, 128], 
      [2, 2, 2, 2]]);
    game.moveDown();
    const newState = game.getState(); 
    expect(newState).toEqual([
      [8, 0, 0, 0], 
      [2, 0, 2, 8], 
      [16, 4, 8, 128], 
      [2, 4, 2, 2]]);
    expect(game.getScore()).toBe(8);
  });
});

describe('isGameOver', () => {
  it('#1', () => {
    const game = new game2048();
    game.setState([
      [0, 2, 0, 0], 
      [2, 2, 0, 0], 
      [0, 2, 0, 2], 
      [2, 2, 2, 2]]);
    const isGameOver = game.isGameOver();
    expect(isGameOver).toBe(false);
  });

  it('#2', () => {
    const game = new game2048();
    game.setState([
      [8, 2, 256, 2048], 
      [2, 8, 4, 1024], 
      [8, 32, 16, 2], 
      [2, 64, 2, 4]]);
    const isGameOver = game.isGameOver();
    expect(isGameOver).toBe(true);
  });

  it('#3', () => {
    const game = new game2048();
    game.setState([
      [2, 2, 256, 2048], 
      [2, 8, 4, 1024], 
      [8, 32, 16, 2], 
      [2, 64, 2, 4]]);
    const isGameOver = game.isGameOver();
    expect(isGameOver).toBe(false);
  });

  it('#4', () => {
    const game = new game2048();
    game.setState([
      [2, 2, 256, 2048], 
      [2, 4, 4, 1024], 
      [8, 32, 16, 2], 
      [2, 64, 2, 4]]);
    const isGameOver = game.isGameOver();
    expect(isGameOver).toBe(false);
  });
});
