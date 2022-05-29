import React, { FC, useState } from 'react';
import { Player } from '../models/Player';

interface TimerProps {
    currentPlayer: Player,
    restart: () => void,
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart}) => {
    const [blackTime, setBlackTime] = useState(300)
    const [whiteTime, setWhiteTime] = useState(300)

    function startTimer() {

    }


    return (
        <div>
            <div>
                <button onClick={restart}>Restart game</button>
            </div>
            <h2>Black - {blackTime}</h2>
            <h2>White - {whiteTime}</h2>
        </div>)
}