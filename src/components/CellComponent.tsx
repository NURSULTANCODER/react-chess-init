import React, { FC } from 'react'
import { Cell } from '../models/Cell'

interface CellProps {
    cell: Cell,
    selected: boolean,
    click: (cell: Cell) => void,
    avibleClick: () => void;
}

const CellComponent: FC<CellProps> = ({ cell, selected, click, avibleClick }) => {
    
    function handleClick() {
        if(cell.available) {
            avibleClick()
        }
        click(cell)
    }

    return (
        <div className={['cell', cell.color, selected ? 'selected' : '', cell.available && cell.figure ? 'avaibleFigure' : ''].join(' ')} 
            onClick={() => handleClick()}
        >
            {cell.available && !cell.figure ? (<div className='avaible'></div>) : (<></>)}
            {cell.figure?.logo && <img src={cell.figure.logo} alt='' />}
        </div>
    )
}

export default CellComponent