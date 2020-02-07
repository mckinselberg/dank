import React, {Component} from 'react';
import { sample } from 'lodash';
 
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
        'hinge',
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
      randomAnimation:null,
    }
  }
  componentDidMount() {
    setTimeout(()=> {
      this.setState({
        randomAnimation:sample(this.state.animations),
      })
    },1000)
  }
  render() {
    return (
      <div>
        <div className={`splash animated ${this.state.randomAnimation}`}></div>
        <div className={`experience animated  ${this.state.randomAnimation}`} >
          {/*<ul>
            <li>http://irwinleighton.com</li>
            <li>https://vintnersalliance.com/</li>
            <li>https://vintageepicure.com/</li>
            <li>https://chista.net/</li>
          </ul>*/}
          <h1>I am a freelance web developer,<br/>currently seeking a full-time position.</h1>
	        <p>These are a few of the websites<br/>I've had the pleasure of working on:</p>
        </div>
      </div>
    );
  }
}
