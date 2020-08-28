import React, { Component } from 'react'

import './App.css';
import Canvas from './Canvas';
import GuessCount from './GuessCount';
import Riddle, {RIDDLES} from './Riddle';
import Proposal, {ALPHABET} from './Proposal';
import WonButton from './WonButton';


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      riddles: this.pickAWord(),
      proposals: this.generateProposal(),
      selectedLetters : [],
      won: false
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
    const{ selectedLetters } = this.state
    this.setState({selectedLetters: [...selectedLetters,letter]})
    console.log(selectedLetters)
  }

  render () {
    const {riddles, proposals, won} = this.state    

    return (
      <div className="App">
        <GuessCount guesses={0} />

      <div className="riddle-container">
        {riddles.map((riddleLetter, index) =>(
          <Riddle letter={riddleLetter} key={index} feedback={this.getFeedBackForGuess(riddleLetter) ? 'visible' : 'hidden'}/>
        ))}
      </div>

      
      <div className="proposal-container">
        
        {proposals.map((letter, index) =>(
          <Proposal letter={letter} key={index} feedback={this.getFeedBackForLetter(letter) ? 'red' : 'grey'} onClick={this.handleClick} />
        ))}

        <WonButton />
        
        
      </div>

      <Canvas />
      
      </div>
    );
  
  }
}

export default App;
