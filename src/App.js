import React, { Component } from 'react'

import './App.css';
import Canvas from './Canvas';
import GuessCount from './GuessCount';
import Riddle, {RIDDLES} from './Riddle';
import Proposal, {ALPHABET} from './Proposal';
import WonButton from './WonButton';
import Lose from './Lose';


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      riddles: this.pickAWord(),
      proposals: this.generateProposal(),
      selectedLetters : [],
      won: false,
      guesses: 5
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

   //arrow fx for binding
  handleClick = letter => {
    const{ selectedLetters, guesses, riddles } = this.state

    if(!riddles.includes(letter)) {
      const newGuesses = guesses -1
      this.setState({guesses: newGuesses})
    }
    this.setState({selectedLetters: [...selectedLetters,letter]})    
  }

  render () {
    const {riddles, proposals, won, guesses} = this.state    

    return (
      <div className="App">
        {guesses === 0 && <Lose />}
        <GuessCount guesses={guesses} />

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
      <WonButton />      

      <Canvas />
      
      </div>
    );
  
  }
}

export default App;
