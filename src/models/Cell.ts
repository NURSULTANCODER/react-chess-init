import { Board } from "./Board";
import { Figure, FigureNames } from './fidures/Figure'
import { Colors } from './Colors'
import { Player } from "./Player";
import { Queen } from "./fidures/Queen";

export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null;
    board: Board;
    available: boolean;
    id: number;

    constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.board = board;
        this.available = false;
        this.id = Math.random();
    }

    isEmpty() {
        return this.figure === null;
    }

    isShah() {
        return this.figure?.name === FigureNames.KING;
    }

    isEnemy(target: Cell):boolean {
        if (target.figure) {
            return this.figure?.color !== target.figure.color
        }
        return false;
    }

    isEmptyVertical(target: Cell): boolean {
        if(this.x !== target.x) {
            return false
        }

        const min = Math.min(this.y, target.y)
        const max = Math.max(this.y, target.y)

        for (let y = min + 1; y < max; y++) {
            if(!this.board.getCeel(this.x, y).isEmpty()) {
                return false
            }else if(this.isShah()) {
                this.board.shah = this.figure?.color === Colors.WHITE ? new Player(Colors.WHITE) : new Player(Colors.BLACK)
            }
        }

        return true
    }

    isEmptyHorizontal(target: Cell): boolean {
        if(this.y !== target.y) {
            return false
        }

        const min = Math.min(this.x, target.x)
        const max = Math.max(this.x, target.x)

        for (let x = min + 1; x < max; x++) {
            if(!this.board.getCeel(x, this.y).isEmpty()) {
                return false
            }
        }

        return true
    }

    isEmptyDiagonal(target: Cell): boolean {
        const absX = Math.abs(target.x - this.x)
        const absY = Math.abs(target.y - this.y)
        if(absY !== absX) {
            return false
        }

        const dy = this.y < target.y ? 1 : -1
        const dx = this.x < target.x ? 1 : -1

        for (let i = 1; i < absY; i++) {
            if(!this.board.getCeel(this.x + dx * i, this.y + dy * i).isEmpty()) {
                return false
            }
        }

        return true
    }

    setFigure(figure: Figure) {
        this.figure = figure;
        this.figure.cell = this;
    }

    addLostFigure(figure: Figure) {
        figure.color === Colors.WHITE ?
            this.board.lostWhiteFigures.push(figure)
            : this.board.lostBlackFigures.push(figure)
    }

    moveFigure(target: Cell) {
        if(this.figure && this.figure?.canMove(target)) {
            this.figure?.moveFigure(target);
            if (target.figure) {
               this.addLostFigure(target.figure)
            }
            if (target.figure?.name === FigureNames.KING && target.figure.color !== this.figure.color) {
                console.log('shah');
            }
            if((this.figure.name === FigureNames.PAWN) && ((target.y === 0 && this.figure.color === Colors.WHITE) || (target.y === 7 && this.figure.color === Colors.BLACK))) {
                new Queen(this.figure.color, this.board.getCeel(target.x, target.y))
                this.figure = null;
            } else {
                target.setFigure(this.figure)
                this.figure = null;
            }
        }
    }
}