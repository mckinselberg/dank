import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Portfolio from './Portfolio';
import Mastermind from './components/Mastermind/Game';
import Quotes from './components/Quotes/QuotesComponent';
import qs from './utilities/qs';
import * as serviceWorker from './serviceWorker';


let buildDiv = (id, component) => {
  let div = document.createElement('div');
  div.setAttribute('id', component);
  return div;
}


switch(qs.p) {
  /*
  case undefined: 
    document.body.appendChild(buildDiv('portfolio', 'portfolio'));
    ReactDOM.render(<Portfolio />, document.getElementById('portfolio'));
    break;
  */
  case 'mastermind': 
    document.body.appendChild(buildDiv('mastermind', 'mastermind'));
    ReactDOM.render(<Mastermind />, document.getElementById('mastermind'));
    document.body.classList.add('remove');
    break;
  case 'quotes': 
    document.body.appendChild(buildDiv('quotes', 'quotes'));
    ReactDOM.render(<Quotes />, document.getElementById('quotes'));
    document.body.classList.add('quotes');
    break;
  default: 
    document.body.appendChild(buildDiv('portfolio', 'portfolio'));
    ReactDOM.render(<Portfolio />, document.getElementById('portfolio')); 
    document.body.classList.add('remove');
    break;
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();