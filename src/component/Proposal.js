import React from 'react'
import PropTypes from 'prop-types'

import './Proposal.css'

const Proposal = ({ letter, feedback, onClick }) => <div className={`proposal ${feedback}`}  onClick = {() => onClick(letter)}>{letter}</div>

Proposal.propTypes = {
    letter : PropTypes.string.isRequired,
    feedback : PropTypes.oneOf([
        'dark',
        'light'
    ]),
    onclick : PropTypes.func.isRequired
}

export default Proposal

export const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'