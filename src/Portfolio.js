import React, {Component} from 'react';
//import logo from './splash_logo.png';
import './css/Portfolio.css';
import './css/animate.css';
import RandomAnimations from './components/RandomAnimations.js';
import { sample } from 'lodash';
//import Mastermind from './components/Mastermind/Game.js';
//import Advice from './components/Advice/App';
//import PortfolioItem from './components/PortfolioItem.js';
import Link from './components/Link.js';


export default class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      splash:'shown',
      advice:'hidden',
      mastermind:'hidden',
      animations:[
          'bounce',
          'flash',
          'pulse',
          'rubberBand',
          'shake',
          'headShake',
          'swing',
          'tada',
          'wobble',
          'jello',
          'bounceIn',
          'bounceInDown',
          'bounceInLeft',
          'bounceInRight',
          'bounceInUp',
          'fadeIn',
          'fadeInDown',
          'fadeInDownBig',
          'fadeInLeft',
          'fadeInLeftBig',
          'fadeInRight',
          'fadeInRightBig',
          'fadeInUp',
          'fadeInUpBig',
          'flipInX',
          'flipInY',
          'lightSpeedIn',
          'rotateIn',
          'rotateInDownLeft',
          'rotateInDownRight',
          'rotateInUpLeft',
          'rotateInUpRight',
          //'hinge',
          'rollIn',
          'zoomIn',
          'zoomInDown',
          'zoomInLeft',
          'zoomInRight',
          'zoomInUp',
          'slideInDown',
          'slideInLeft',
          'slideInRight',
        'slideInUp'],
    }
    this.randomAnimation = sample(this.state.animations);
    this.setVisibility = this.setVisibility.bind(this);
    this.visibility = ['hidden','shown'];
  }

  setVisibility(e) {
    let target = e.target.value.toLowerCase();
    if (this.state[target] === this.visibility[1]) {
      this.setState({
        [target]:this.visibility[0]
      });
    } else {
      this.setState({
        [target]:this.visibility[1]
      });

    }
  }

  render() {
    return (
      <div className="App">
        <div className={`Splash ${this.state.splash}`}>
            <RandomAnimations />
        </div>
        <div className={`experience animated ${this.randomAnimation}`}>
          <ul>
            <Link name="AllianceBernstein/a" url="https://www.alliancebernstein.com/sites/campaign/theme/tech-and-innovation.htm"/>
            <Link name="AllianceBernstein/b" url="https://www.alliancebernstein.com/investments/us/retirement/collective-investment-trusts/home.htm"/>
            <Link name="AllianceBernstein/c" url="https://www.alliancebernstein.com/investments/us/retirement/lifetime-income-strategy/home.htm"/>
            {/*<Link name="AllianceBernstein/d" url="https://www.alliancebernstein.com/investments/us/retirement/ira/home.htm"/>*/}
            {/*<Link name="Mutant Media (Archive)" url="https://web.archive.org/web/20190714155011/https://mutantmedia.com/interactive/"/>*/}
            <Link name="Irwin Leighton" url="https://irwinleighton.com/"/>
            <Link name="LPW Training Services" url="https://lpwtraining.com/"/>
            <Link name="Vintage Epicure" url="https://vintageepicure.com/"/>
            <Link name="Chista" url="https://www.chista.net"/>
          </ul>
          <br/>
          <br/>
          <br/>
          <h2>Current Job Skillset</h2>
          <p>HTML5, XML, CSS3, SCSS,<br/>JavaScript, React, Git Bash</p>
          <ul>
            <Link name="Resumé" url="/dan-kinsley-resume.pdf"/>
            {/*<Link name="Github" url="https://github.com/mckinselberg"/>*/}
          </ul>
          
          {/*}
          <div className={'buttons'}>
            <button onClick={this.setVisibility} className={this.state.mastermind === this.visibility[1] ? `active` : ``} value="mastermind">Mastermind</button>
            <p>{`< Some Apps I've created >`}</p>
            <button onClick={this.setVisibility} className={this.state.advice === this.visibility[1] ? `active` : ``} value="advice">Advice</button>
          </div>
          <div className={`Portfolio`}>
            <div className={`portfolio-item ${this.state.mastermind === this.visibility[1] ? `shown` : `hidden`}`}>
              <Mastermind/>
            </div>
            <div className={`portfolio-item ${this.state.advice === this.visibility[1] ? `shown` : `hidden`}`}>
              <Advice/>
            </div>
          </div>
          */}
        </div>
      </div>
    );
  }
}
