import React, { FC, useEffect, useState } from 'react'
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import { Colors } from '../models/Colors';
import { Player } from '../models/Player';
import CellComponent from './CellComponent';
import LostFigures from './LostFigures';

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard, currentPlayer, swapPlayer}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)


    useEffect(() => {
        highlightCells()
    }, [selectedCell])

    function click(cell: Cell) {
        if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell)
            setSelectedCell(null)
        } else {
            if(cell.figure?.color === currentPlayer?.color) {
                // swapPlayer()
                setSelectedCell(cell);
            }
        }
    }

    function avibleClick() {
        swapPlayer()
    }

    function highlightCells() {
        board.highlightCells(selectedCell)
        updateBoard()
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }
    

    return (
        <div>
            <h3>Ход у {currentPlayer?.color === Colors.WHITE ? 'Белых' : 'Черных'}</h3>
            <div className='board'>
                {board.cells.map((row, index) => 
                    <React.Fragment key={index} >
                        {row.map(cell => 
                            <CellComponent 
                                key={cell.id} 
                                cell={cell} 
                                click={click}
                                avibleClick={avibleClick}
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y} />    
                        )}
                    </React.Fragment>
                )}
            </div>
        </div>
    )
}

export default BoardComponent