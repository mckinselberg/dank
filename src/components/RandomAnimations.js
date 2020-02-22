import React, {Component} from 'react';
import { sample } from 'lodash';
import splashlogo from '../img/splash_logo.png';
 
export default class RandomAnimations extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
      randomAnimation1:null,
      randomAnimation2:null
    }
    this.randomAnimation1 = sample(this.state.animations);
  }
  componentDidMount() {
  }
  render() {
    return (
      <div>
        <div className={`splash`}>
          <img className={`animated ${this.randomAnimation1}`} src={splashlogo} alt={`Dan Kinsley Web Developer Logo`}/>
          {console.log(splashlogo.clientHeight)}
          <div className={`experience animated  ${this.randomAnimation1}`} >
          <h1>Front-End Developer,<br/>currently seeking a <br/>contract or full-time position.</h1>
        </div>
        </div>
        
      </div>
    );
  }
}
