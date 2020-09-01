import React from 'react'
import cerceuil from './cercueil.png';


import './Lose.css'

const Lose = () => <div className="loseWindow">    
    <div className="message-container">
    <p>Vous êtes mort</p>   
    <img src={cerceuil} className="cerceuil" alt="cerceuil" />
    </div>
    
    <button className="newGame">Rejouer?</button>
</div>

export default Lose