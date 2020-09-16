import React from 'react'
import PropTypes from 'prop-types'

import './GuessCount.css'

const GuessCount = ({guesses}) => <div className='guesscount'>Nombre d'erreurs restantes : {5 -guesses}

</div>

GuessCount.propTypes = {
    guesses : PropTypes.number.isRequired
}

export default GuessCount