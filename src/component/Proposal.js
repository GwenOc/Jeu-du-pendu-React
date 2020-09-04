import React from 'react'

import './Proposal.css'

const Proposal = ({letter, index, feedback, onClick, status}) => <div className={`proposal ${feedback}`}  onClick = {() => onClick(letter)}>{letter}</div>

export default Proposal

export const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'