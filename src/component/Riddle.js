import React from 'react'

import './Riddle.css'

const HIDDENSYMBOL = '_'

const Riddle = ({letter,index, feedback}) => <div className="riddle">
    <span className="symbol">
        {feedback === 'hidden' ? HIDDENSYMBOL : letter }
    </span>
</div>

export default Riddle

export const RIDDLES = [
    'VARIABLE',
    'RECURSIVITE',
    'FONCTION',
    'BOUCLE',
    'CLOSURE',
    'FIZZBUZZ',
    'HELLOWORLD',
    'FRAMEWORK',
    'BOOLEAN',
    'HEXADECIMAL',
    'DESIGN',
    'DEBUG',
    'BRENDANEICH',
    'ALGORYTHME',    
]