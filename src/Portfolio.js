import React, {Component} from 'react';
//import logo from './splash_logo.png';
import './css/Portfolio.css';
import './css/animate.css';
import RandomAnimations from './components/RandomAnimations.js';
//import Mastermind from './components/Mastermind/Game.js';
//import Advice from './components/Advice/App';
//import PortfolioItem from './components/PortfolioItem.js';
import Link from './components/Link.js';


export default class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      splash:'shown',
      mm:'hidden',
      advice:'hidden',
      ab:'hidden'
    }
    this.setMMVisibility = this.setMMVisibility.bind(this);
    this.setABVisibility = this.setABVisibility.bind(this);
    this.visibility = ['hidden','shown'];
  }

  setMMVisibility() {
    if (this.state.mm === this.visibility[1]) {
      this.setState({
        mm:this.visibility[0]
      });
    } else {
      this.setState({
        mm:this.visibility[1]
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
        {/*
        <div className={'buttons'}>
          <button onClick={this.setABVisibility} className={this.state.ab === this.visibility[1] ? `active` : ``}>AllianceBernstein</button>
          <button onClick={this.setMMVisibility} className={this.state.mm === this.visibility[1] ? `active` : ``}>Mutant Media</button>
          <button onClick={this.setChistaVisibility} className={this.state.chista === this.visibility[1] ? `active` : ``}>Chista</button>
        </div>
        <div className={`Portfolio`}>
          <PortfolioItem class={`AB ${this.state.ab} `} name="ab" url="https://www.alliancebernstein.com/investments/us/home.htm"/>
          <PortfolioItem class={`MM ${this.state.mm} `} name="mm" url="https://web.archive.org/web/20190714155011/https://mutantmedia.com/interactive/"/>
        </div>
        */}
        <div className="experience">
          <ul>
            <Link name="Resume" url="/dan-kinsley-resume.pdf"/>
            <Link name="AllianceBernstein" url="https://www.alliancebernstein.com/investments/us/home.htm"/>
            <Link name="Vintage Epicure" url="https://vintageepicure.com/"/>
            <Link name="Mutant Media (Archive)" url="https://web.archive.org/web/20190714155011/https://mutantmedia.com/interactive/"/>
            <Link name="Irwin Leighton" url="https://irwinleighton.com/"/>
          </ul>

        </div>
      </div>
    );
  }
}
