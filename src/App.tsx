import React, { useState } from 'react';
import './App.css';
import { GameBoard } from './components/game-board';
import { game2048 } from './types/game2048';
import { decompress } from './types/url-compression';

function App() {
  const [theme, setTheme] = useState('light');
  
  function toggleTheme() {
    if (theme === 'light') {
      setTheme('dark');
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      setTheme('light');
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }

  let game = new game2048();
  // game.setState([
  //   [4096, 2048, 1024, 512], 
  //   [256, 128, 64, 32], 
  //   [16, 8, 4, 2], 
  //   [8192, 0, 0, ]]);

  let state : number[][] | undefined;
  const searchParams = new URLSearchParams(window.location.search);
  const encodedData = searchParams.get('data');
  if (encodedData) {
    state = decompress<number[][]>(encodedData);
  }

  if (state)
    game.setState(state);
  else {
    game.fillRandomTiles(2);
  }

  return <div>
      <button onClick={toggleTheme}>Theme={theme}</button>
      <GameBoard game={game} />
    </div>;
}

export default App;
