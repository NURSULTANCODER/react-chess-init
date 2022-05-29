import React, { useEffect, useState } from 'react';
import './App.css'
import BoardComponent from './components/BoardComponent';
import LostFigures from './components/LostFigures';
import { Board } from './models/Board';
import { Colors } from './models/Colors';
import { Player } from './models/Player';

const App = () => {
  const [board, setBoard] = useState(new Board())
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  useEffect(() => {
    restart()
    setCurrentPlayer(whitePlayer)
  }, [])

  useEffect(() => {
    console.log(board.shah, 'black');
}, [board])

  function restart() {
    const newBoard = new Board()
    newBoard.initCells()
    newBoard.addFigure()
    setBoard(newBoard)
  }

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  return (
    <div className='app'>
      <LostFigures figures={board.lostBlackFigures} />
      <BoardComponent 
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
      <LostFigures figures={board.lostWhiteFigures} />
    </div>
  );
};

export default App;


//сделать шах check
//сделать мат mat
//запрет хода при угрозе королью 
//взятие пешки TakePawn
//ракировка castling
//таймер Timer
//
//
//