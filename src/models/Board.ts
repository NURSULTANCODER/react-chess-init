import {Cell} from './Cell'
import { Colors } from './Colors'
import { Bishop } from './fidures/Bishop'
import { Figure } from './fidures/Figure'
import { King } from './fidures/King'
import { Knight } from './fidures/Knight'
import { Pawn } from './fidures/Pawn'
import { Queen } from './fidures/Queen'
import { Rook } from './fidures/Rook'
import { Player } from './Player'

export class Board {
    cells: Cell[][] = []
    lostBlackFigures: Figure[] = []
    lostWhiteFigures: Figure[] = []
    shah: Player | null = null

    public initCells() {
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = []
            for (let j = 0; j < 8; j++) {
                if((i + j) % 2 !== 0) {
                    row.push(new Cell(this, j, i, Colors.BLACK, null)) // black
                }else {
                    row.push(new Cell(this, j, i, Colors.WHITE, null)) // white
                }
            }
            this.cells.push(row)
        }
    }

    public highlightCells(selectedCell: Cell | null) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i]
            for (let j = 0; j < row.length; j++) {
                const target = row[j]
                target.available = !!selectedCell?.figure?.canMove(target)
            }
        }
    }

    public getCopyBoard() {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        newBoard.lostBlackFigures = this.lostBlackFigures;
        newBoard.lostWhiteFigures = this.lostWhiteFigures;
        newBoard.shah = this.shah;
        return newBoard;
    }

    public getCeel(x:number, y:number) {
        return this.cells[y][x]
    }

    private addPawns() {
        for (let i = 0; i < 8; i++) {
            new Pawn(Colors.BLACK, this.getCeel(i, 1))
            new Pawn(Colors.WHITE, this.getCeel(i, 6))
        }
    }

    private addBishop() {
        new Bishop(Colors.BLACK, this.getCeel(2, 0))
        new Bishop(Colors.BLACK, this.getCeel(5, 0))
        new Bishop(Colors.WHITE, this.getCeel(2, 7))
        new Bishop(Colors.WHITE, this.getCeel(5, 7))
    }

    private addKings() {
        new King(Colors.BLACK, this.getCeel(4, 0))
        new King(Colors.WHITE, this.getCeel(4, 7))
    }

    private addQueens() {
        new Queen(Colors.BLACK, this.getCeel(3, 0))
        new Queen(Colors.WHITE, this.getCeel(3, 7))
    }

    private addKnights() {
        new Knight(Colors.BLACK, this.getCeel(1, 0))
        new Knight(Colors.BLACK, this.getCeel(6, 0))
        new Knight(Colors.WHITE, this.getCeel(1, 7))
        new Knight(Colors.WHITE, this.getCeel(6, 7))
    }

    private addRooks() {
        new Rook(Colors.BLACK, this.getCeel(0, 0))
        new Rook(Colors.BLACK, this.getCeel(7, 0))
        new Rook(Colors.WHITE, this.getCeel(0, 7))
        new Rook(Colors.WHITE, this.getCeel(7, 7))
    }


    public addFigure() {
        this.addBishop()
        this.addKings()
        this.addKnights()
        this.addQueens()
        this.addPawns()
        this.addRooks()
    }

    public gameOver() {

    }
}