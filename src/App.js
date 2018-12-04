import React, { Component } from 'react';
import './App.css';
import shuffle from 'lodash.shuffle'

const GuessCount = ({guesses}) => <div className="guesses white-text">Essais : {guesses}</div>

class Touche extends Component {
  constructor(props) {
    super(props)

    this.state = {
      clicked: false,
    }
  }

  handleKeyClick = () => {
    console.log(this.props.lettre)
    this.props.clickedLetter(this.props.lettre)
    this.props.count()
    this.setState({
      clicked: true
    })
  }
  
  render() {
    return(
      <span className={`btn ${this.state.clicked ? 'disabled' : 'waves-effect waves-light'}`} onClick={this.handleKeyClick}>
        {this.props.lettre}
      </span>
    )
  }
} 

const GenerateMask = ({mot, used}) => {
  return mot.map((lettre, index) => (
    <span key={index} className="mask">{computeDisplay(lettre, used)}</span>
  ))
}

const GenerateKeyboard = ({ligne, count, clickedLetter}) => {
  return ligne.map((lettre, index) => (
    <Touche lettre={lettre} key={index} count={count} clickedLetter={clickedLetter} />
  ))
}

function computeDisplay(phrase, usedLetters) {
  return phrase.replace(/\w/g,
    (letter) => (usedLetters.has(letter) ? letter : '_')
  )
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentWord: this.tableMot(),
      guesses: 0,
      matchedLetterIndices: [],
      usedLetters: new Set(),
    }
    this.clickedLetter = this.clickedLetter.bind(this)
  }    

  tableMot() {
    const listMots = ["REACT", "RUBY", "JAVASCRIPT", "PYTHON", "CHROME", "FIREFOX", "WINDOWS", "INTERNET"]
    const resultMot = shuffle(listMots)
    return Array.from(resultMot[0])
  }

  handleGameState() {
    this.setState({
      guesses: this.state.guesses + 1
    })
  }

  clickedLetter(lettre) {
    this.state.usedLetters.add(lettre)
  }

  render() {
    const {guesses} = this.state
    //const won = matchedLetterIndices === keyboard.length
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const keyboard = Array.from(alphabet)
    const premiereLigneKB = keyboard.slice(0, 13)
    const deuxiemeLigneKB = keyboard.slice(13)

    return (
      <div className="App container">
        <div className="row">
          <div className="card blue-grey col s2 offset-s10">
            <GuessCount guesses={guesses}  />
          </div>
        </div>
        <div className="row">
          <div className="card masques col s4 offset-s4">
            <GenerateMask mot={this.state.currentWord} used={this.state.usedLetters} />
          </div>
        </div>

        <div>
          <GenerateKeyboard ligne={premiereLigneKB} count={this.handleGameState.bind(this)} clickedLetter={this.clickedLetter} />
          <br />
          <GenerateKeyboard ligne={deuxiemeLigneKB} count={this.handleGameState.bind(this)} clickedLetter={this.clickedLetter} />
      </div>
      </div>
    );
  }
}

export default App;
