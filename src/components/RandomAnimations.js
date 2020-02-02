import React, {Component} from 'react';
import logo from '../splash_logo.png';
import { sample } from 'lodash';
import _ from 'lodash';
 
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
      animated:false
    }
  }

  componentDidMount() {
    setTimeout(()=> {
      this.setState({
        randomAnimation:_.sample(this.state.animations),
        animated:true
      })
    },1000)
  }

  render() {
    return (
            <div className={`splash ${this.state.animated ? 'animated' : ''} ${this.state.randomAnimation}`}></div>
    );
  }
}
