import React from 'react';
import ReactDOM from 'react-dom';
//CSS
import './index.css';
import './css/Portfolio.css';
import './css/animate.css';
//Components
import Portfolio from './components/Portfolio';
import Mastermind from './components/Mastermind/Game';
import Quotes from './components/Quotes/QuotesComponent';
import Tetris from './components/Tetris/Tetris';

import qs from './utilities/qs';
import * as serviceWorker from './serviceWorker';
const loadTitle = document.title;

const buildDiv = (id, component) => {
  let div = document.createElement('div');
  div.setAttribute('id', component);
  return div;
}

const buildCanv = (id, component, w, h) => {
  let canv = document.createElement('canvas');
  canv.setAttribute('id', component);
  canv.setAttribute('width', w);
  canv.setAttribute('height', h);
  return canv;
}


switch(qs.p) {
  /*
  case undefined: 
    document.body.appendChild(buildDiv('portfolio', 'portfolio'));
    ReactDOM.render(<Portfolio />, document.getElementById('portfolio'));
    break;
  */
  case 'mastermind':
    document.title = 'Mastermind. The classic game, made with React.';
    document.body.appendChild(buildDiv('mastermind', 'mastermind'));
    ReactDOM.render(<Mastermind />, document.getElementById('mastermind'));
    document.body.classList.add('remove');
    break;
  case 'quotes': 
    document.body.appendChild(buildDiv('quotes', 'quotes'));
    ReactDOM.render(<Quotes />, document.getElementById('quotes'));
    document.body.classList.add('quotes');
    break;
  case 'tetris': 
    document.title = 'Tetris, from a tutorial by https://github.com/javascriptteacher';
    document.body.appendChild(buildDiv('score', 'score'));
    document.body.appendChild(buildCanv('tetris', 'tetris', 240, 400));
    Tetris();
    document.body.classList.add('tetris');
    break;
  default: 
    document.title = loadTitle;
    document.body.appendChild(buildDiv('portfolio', 'portfolio'));
    ReactDOM.render(<Portfolio />, document.getElementById('portfolio'));
    document.body.classList.add('portfolio');
    break;
}

document.body.classList.add('bodyLoaded');


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();