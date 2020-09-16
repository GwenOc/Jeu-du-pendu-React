import React from 'react'
import PropTypes from 'prop-types'

import './Riddle.css'

const HIDDENSYMBOL = '_'

const Riddle = ({letter, feedback}) => <div className="riddle">
    <span className="symbol">
        {feedback === 'hidden' ? HIDDENSYMBOL : letter }
    </span>
</div>

Riddle.propTypes = {
    letter : PropTypes.string.isRequired,
    feedback: PropTypes.oneOf([
        'visible',
        'hidden'
    ])    
}

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
    'jAVASCRIPT',
    'PROGRAMME',    
]

