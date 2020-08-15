import React, {Component} from 'react';
import RandomAnimations from './RandomAnimations.js';
import { sample } from 'lodash';
import Link from './Link.js';


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
    this.addDecoration = this.addDecoration.bind(this);
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
  addDecoration() {
    return <p style={{textAlign:"center",padding:0,margin:0,fontSize:'2em',color:'#324C7E'}}>.</p>;
  }

  render() {
    const _fontSize = '1.13em';
    return (
      <div className="App">
        <div className={`Splash ${this.state.splash}`}>
            <RandomAnimations />
        </div>
        <div className={`experience animated ${this.randomAnimation}`}>
          {this.addDecoration()}
          <h2>Current Job Skillset</h2>
          <p>HTML5, XML, XSLT, CSS3, SCSS,<br/>ES6+, React, webpack <br/> Git, Azure</p>
          <br/>
          {this.addDecoration()}
          <h2>More Skills</h2>
          <p><span style={{fontSize:_fontSize}}>U</span>I, UX Design and QA.<br/>
            <span style={{fontSize:_fontSize}}>L</span>AMP Stack App Development,<br/>
             including PHP &amp; DB dev<br/>
             <span style={{fontSize:_fontSize}}>A</span>pache Config, Implementation,<br/>
             &amp; Management with both<br/>
             Shell and API tools.<br/>
             <span style={{fontSize:_fontSize}}>R</span>esponsive Design.<br/>
             <span style={{fontSize:_fontSize}}>P</span>roject Management.<br/>
             </p>
          <br/>
          {this.addDecoration()}
          <h2>Work Experience</h2>
          <ul>
            <Link name="AllianceBernstein/a" url="https://www.alliancebernstein.com/sites/campaign/theme/volatility/crisis-dashboard.htm"/>
            <Link name="AllianceBernstein/b" url="https://www.alliancebernstein.com/sites/campaign/theme/tech-and-innovation.htm?Seg=56"/>
            <Link name="AllianceBernstein/c" url="https://www.alliancebernstein.com/investments/us/retirement/collective-investment-trusts/home.htm"/>
            <Link name="AllianceBernstein/d" url="https://www.alliancebernstein.com/investments/us/retirement/lifetime-income-strategy/home.htm"/>
            {/*<Link name="AllianceBernstein/d" url="https://www.alliancebernstein.com/investments/us/retirement/ira/home.htm"/>*/}
            <Link name="Irwin Leighton" url="https://irwinleighton.com/"/>
            <Link name="LPW Training Services" url="https://lpwtraining.com/"/>
            <Link name="Vintage Epicure" url="https://vintageepicure.com/"/>
            <Link name="Chista" url="https://www.chista.net"/>
          </ul>
          <br/>
          <ul>
            {this.addDecoration()}
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
