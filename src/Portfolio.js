import React, {Component} from 'react';
//import logo from './splash_logo.png';
import './css/Portfolio.css';
import './css/animate.css';
import RandomAnimations from './components/RandomAnimations.js';
import Mastermind from './components/Mastermind/Game.js';
import Advice from './components/Advice/App';
import PortfolioItem from './components/PortfolioItem.js';



export default class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      splash:'shown',
      mastermind:'hidden',
      advice:'hidden',
      ab:'hidden'
    }
    this.setMastermindVisibility = this.setMastermindVisibility.bind(this);
    this.setAdviceVisibility = this.setAdviceVisibility.bind(this);
    this.setABVisibility = this.setABVisibility.bind(this);
    this.visibility = ['hidden','shown']
  }

  setMastermindVisibility() {
    if (this.state.mastermind === this.visibility[1]) {
      this.setState({
        mastermind:this.visibility[0]
      });
    } else {
      this.setState({
        mastermind:this.visibility[1]
      });

    }
  }

  setAdviceVisibility() {
    if (this.state.advice === this.visibility[1]) {
      this.setState({
        advice:this.visibility[0]
      });
    } else {
      this.setState({
        advice:this.visibility[1]
      });

    }
  }

  setABVisibility() {
    if (this.state.ab === this.visibility[1]) {
      this.setState({
        ab:this.visibility[0]
      });
    } else {
      this.setState({
        ab:this.visibility[1]
      });

    }
  }

  render() {
    return (
      <div className="App">
        <div className={`Splash ${this.state.splash}`}>
            <RandomAnimations />
        </div>
        <div className={'buttons'}>
          <button onClick={this.setABVisibility} className={this.state.ab === this.visibility[1] ? `active` : ``}>ab</button>
          <button onClick={this.setMastermindVisibility} className={this.state.mastermind === this.visibility[1] ? `active` : ``}>Mastermind</button>
          <button onClick={this.setAdviceVisibility} className={this.state.advice === this.visibility[1] ? `active` : ``}>Advice</button>
        </div>
        <div className={`Portfolio`}>
          <div className={`AB ${this.state.ab} portfolio-item `}>
            <PortfolioItem name="ab"/>
          </div>
          <div className={`Mastermind ${this.state.mastermind} portfolio-item`}>
            <Mastermind />
          </div>
          <div className={`Advice ${this.state.advice} portfolio-item`}>
            <Advice />
          </div>
        </div>
      </div>
    );
  }
}
