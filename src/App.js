import React, { Component } from 'react'

import './App.css';
import Canvas from './component/Canvas';
import GuessCount from './component/GuessCount';
import Riddle, {RIDDLES} from './component/Riddle';
import Proposal, {ALPHABET} from './component/Proposal';
import Lose from './component/Lose';



class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      riddles: this.pickAWord(),
      proposals: this.generateProposal(),
      selectedLetters : [],      
      guesses: 5,
      gameStatus : 'inProgress'
    }
  }

  pickAWord() {   

    const result = []    
    let oneWord = Math.floor(Math.random()* RIDDLES.length)
    oneWord = RIDDLES[oneWord]
    const word = oneWord.split('')

    while (word.length>0) {
      const letter = word.shift()
      result.push(letter)
    }
    return result
  }

  generateProposal() {

    let alphabet = [...ALPHABET.split('')]   

    return alphabet
  }

  getFeedBackForLetter(letter) {
    const{ selectedLetters } = this.state 
  
    return selectedLetters.includes(letter)    
  }
 

  getFeedBackForGuess(riddleLetter) {
    const {selectedLetters} = this.state          

    return selectedLetters.includes(riddleLetter)    
  }

  newGame = () => {
    this.setState({riddles: this.pickAWord(), selectedLetters: [], guesses: 5, gameStatus: 'inProgress'})
  }

   //arrow fx for binding
  handleClick = letter => {
    const{ guesses, riddles,selectedLetters } = this.state

    if(!riddles.includes(letter)) {
      const newGuesses = guesses -1
      this.setState({guesses: newGuesses})
    }     
 
    //to fix the bug of async behaviour adding the method direct to be sure to have the correct state of the selectedLetters
    this.setState({selectedLetters: [...selectedLetters,letter]}, () => {this.getGameStatus()})      
 
  }
  

  getGameStatus() {
    const {guesses, riddles, selectedLetters} = this.state
    
    const processedRiddle = Array.from(new Set(riddles))
    const result = selectedLetters.filter(elt => processedRiddle.includes(elt)).length === processedRiddle.length

    if(guesses > 0 && result) {
      this.setState({gameStatus : 'win'})
      return
    }    
  }

  render () {
    const {riddles, proposals, guesses, gameStatus} = this.state  
    const processedRiddle = Array.from(new Set(riddles))
    
    const RestartButton = ( <button className="newGame" onClick={this.newGame}>Rejouer?</button>)

    return (
      <div className="App">
        {guesses === 0 && <div>
           <Lose />
           {RestartButton}
           
           
        </div>}

        <GuessCount guesses={guesses}/>
        
      <div className="riddle-container">
        {riddles.map((riddleLetter, index) =>(
          <Riddle letter={riddleLetter} key={index} feedback={this.getFeedBackForGuess(riddleLetter) ? 'visible' : 'hidden'}/>
        ))}
      </div>

      
      <div className="proposal-container">
        
        {proposals.map((letter, index) =>(
          <Proposal letter={letter} key={index} feedback={this.getFeedBackForLetter(letter) ? 'red' : 'grey'} onClick={this.handleClick} />
        ))}    
        
      </div> 

      {gameStatus === 'win' &&
        <div className="wonSection">
          C'est Gagné !
          {RestartButton}
        </div>  
      }         
      
      </div>
    );
  
  }
}

export default App;
