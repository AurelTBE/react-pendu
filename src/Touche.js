import React from 'react';

const Touche = ({ lettre, feedback}) => (
    <div className={`lettre ${feedback}`}>
        <span className={feedback === 'clicked' ? "btn disabled" : "btn waves-effect waves-light"}>
            {lettre}
        </span>
    </div>
)

export default Touche