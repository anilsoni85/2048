import React, { useState, useEffect } from "react";
import './game-board.css';
import { game2048 } from "../types/game2048";
import { SwipeEventData, useSwipeable } from "react-swipeable";
type GameBoardProps = {
  game : game2048
}

export const GameBoard = (props : GameBoardProps) : JSX.Element => {
  let [gameState, setGameState] = useState(props.game.getState());
  let [isGameOver, setIsGameOver] = useState(props.game.isGameOver());

  const audio = new Audio('/swipe.mp3');
  
  const handlers = useSwipeable({
    preventScrollOnSwipe: false,
    onSwiped: (eventData: SwipeEventData) => {
      console.log("User Swiped!", eventData);
      let isValidMove = false;
      switch (eventData.dir)
      {
        case "Up": 
          props.game.moveUp();
          isValidMove = true;
          break;
        case "Down":
          props.game.moveDown();
          isValidMove = true;
          break;
        case "Left":
          props.game.moveLeft();
          isValidMove = true;
          break;
        case "Right":
          props.game.moveRight();
          isValidMove = true;
          break;
      }
      if (isValidMove) {
        audio.play();
        props.game.fillRandomTiles();
        setGameState(props.game.getState());
        const isGameOver = props.game.isGameOver();
        if (isGameOver) {
          setIsGameOver(isGameOver);
        }
      }
    }
  });

  const handleOnKeyDown = (evt : KeyboardEvent) => {
    let isValidMove = false;
    switch (evt.key)
    {
      case "ArrowUp": 
        props.game.moveUp();
        isValidMove = true;
        break;
      case "ArrowDown":
        props.game.moveDown();
        isValidMove = true;
        break;
      case "ArrowLeft":
        props.game.moveLeft();
        isValidMove = true;
        break;
      case "ArrowRight":
        props.game.moveRight();
        isValidMove = true;
        break;
    }
    if (isValidMove) {
      audio.play();
      props.game.fillRandomTiles();
      setGameState(props.game.getState());
      const isGameOver = props.game.isGameOver();
      if (isGameOver) {
        setIsGameOver(isGameOver);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleOnKeyDown);

    return () => {
      window.removeEventListener('keydown', handleOnKeyDown);
    };
  });
 
  return (
  <div className="container" {...handlers}>
    <div className="heading">
      <h1 className="title">2048</h1>
      <div className="scores-container">
        <div className="score-container">{props.game.getScore()}</div>
        <div className="best-container">0</div>
      </div>
    </div>
    <div className="game-container">
      <div className={`game-message${isGameOver ? " game-over" : ""}`} >
        <p>Game over!</p>
        <div className="lower">
          <a className="keep-playing-button">Keep going</a>
          <a className="retry-button">Try again</a>
        </div>
      </div>
      <div className="grid-container">
        <div className="grid-row">
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
        </div>
        <div className="grid-row">
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
        </div>
        <div className="grid-row">
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
        </div>
        <div className="grid-row">
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
        </div>
      </div>
      <div className="tiles-container">
      {
        gameState.map((rows, r) => rows
          .map((cell, c) => {
            return cell > 0 ? (
            <div key={`${r}-${c}`} className={`tile tile-position-${c+1}-${r+1} tile-${cell > 2048 ? "super": cell}`}>
              <div className="tile-inner">{cell}</div>
            </div>) : (null);
        }))
      }
      </div>
    </div>
  </div>);
}