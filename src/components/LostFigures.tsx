import React, { FC } from "react";
import { Figure } from "../models/fidures/Figure";

interface LostProps {
    figures: Figure[]
}

const LostFigures: FC<LostProps> = ({ figures }) => {

    return (
        <div className="lost">
            {figures.map(figure => <img key={figure.id} src={figure.logo ? figure.logo : ''} alt='' />)}
        </div>
    )
}

export default LostFigures