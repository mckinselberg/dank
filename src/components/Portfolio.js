import React, {Component} from 'react';
import Link from './Link.js';
//import ReactGA from 'react-ga';
import splashlogo from '../img/splash_logo.png';


export default class App extends Component{
  constructor(props) {
    super(props)
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

  componentDidMount() {
    //ReactGA.initialize('UA-18240989-1');
    //ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    const _fontSize = '1.13em';
    return (
      <div className="App">
        <div className={`splash`}>
          <img src={splashlogo} alt={`Dan Kinsley Web Developer Logo`}/>
          <div className={`experience`} >
            {this.addDecoration()}
            <h1>Full Stack Developer,<br/>currently seeking<br/> a contract or<br/> full-time position.</h1>
          </div>
        </div>
        <div className={`experience`}>
          
          <ul>
            {this.addDecoration()}
            <Link name="Resumé" url="/dan-kinsley-resume.pdf"/>
            {/*<Link name="Github" url="https://github.com/mckinselberg"/>*/}
          </ul>
          {this.addDecoration()}
          <h2>Current Job Skillset</h2>
          <p>HTML, SCSS<br/>
           XML/XSLT<br/>
           ES7 with React<br/>
           JavaScript <br/>
           Git, Azure <br/>
           QA<br/>
          </p>
          {this.addDecoration()}
          <h2>Select Work Experience</h2>
          <ul>
            <Link name="AllianceBernstein/a" url="https://www.alliancebernstein.com/sites/campaign/theme/volatility/crisis-dashboard.htm"/>
            <Link name="AllianceBernstein/b" url="https://www.alliancebernstein.com/sites/campaign/theme/tech-and-innovation.htm?Seg=56"/>
            <Link name="AllianceBernstein/c" url="https://www.alliancebernstein.com/investments/us/retirement/collective-investment-trusts/home.htm"/>
            <Link name="AllianceBernstein/d" url="https://www.alliancebernstein.com/investments/us/retirement/lifetime-income-strategy/home.htm"/>
            {/*<Link name="AllianceBernstein/d" url="https://www.alliancebernstein.com/investments/us/retirement/ira/home.htm"/>*/}
            <Link name="LPW Training Services" url="https://lpwtraining.com/"/>
            <Link name="Vintage Epicure" url="https://vintageepicure.com/"/>
            <Link name="Irwin Leighton" url="https://irwinleighton.com/"/>
            <Link name="Chista" url="https://www.chista.net"/>
          </ul>
          {this.addDecoration()}
          <h2>More Skills</h2>
          <p>
            <span style={{fontSize:_fontSize}}>R</span>esponsive Design.<br/>
            <span style={{fontSize:_fontSize}}>P</span>roject Management.<br/>
            <span style={{fontSize:_fontSize}}>L</span>AMP Stack App Development,<br/>
             including PHP &amp; DB dev<br/>
             <span style={{fontSize:_fontSize}}>A</span>pache Config, Implementation,<br/>
             &amp; Management with both<br/>
             Shell and API tools.<br/>
          </p>
        </div>
      </div>
    );
  }
}
