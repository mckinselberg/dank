import React from 'react';
import ReactDOM from 'react-dom';
//CSS
import './index.css';
import './css/Portfolio.css';
//import './css/animate.css';
//Components
import Portfolio from './components/Portfolio';
import Mastermind from './components/Mastermind/Game';
import Quotes from './components/Quotes/QuotesComponent';
import Tetris from './components/Tetris/Tetris';
import SongPage from './components/SongPage/SongPage';
import AudioPlayer from './components/AudioPlayer/AudioPlayerComponent';
import qs from './utilities/qs';
import ReactGA from 'react-ga';
import * as serviceWorker from './serviceWorker';
const loadTitle = document.title;
//const winLocPathName = window.location.pathname.split('/');
ReactGA.initialize('UA-18240989-1');

const buildDiv = (id, component) => {
  let div = document.createElement('div');
  div.setAttribute('id', component);
  return div;
}

function buildCanv(id, component, w, h) {
  let canv = document.createElement('canvas');
  canv.setAttribute('id', component);
  canv.setAttribute('width', w);
  canv.setAttribute('height', h);
  return canv;
}

//switch(winLocPathName[1]) {
switch(qs.p) {
  /*
  case undefined: 
    document.body.appendChild(buildDiv('portfolio', 'portfolio'));
    ReactDOM.render(<Portfolio />, document.getElementById('portfolio'));
    break;
  */
  case 'mastermind':
    document.title = "Dan Kinsley's Mastermind. The classic game, made with React.";
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
  case 'songs':
    document.body.appendChild(buildDiv('song-page', 'song-page'));
    document.body.classList.add('song-page');
    ReactDOM.render(<SongPage />, document.getElementById('song-page'));
    break;    
  case 'audio-player':
    document.title = "Dan Kinsley's Audio Player"
    document.body.appendChild(buildDiv('audio-player', 'audio-player'));
    document.body.classList.add('audio-player');
    ReactDOM.render(<AudioPlayer />, document.getElementById('audio-player'));
    ReactGA.pageview(window.location.pathname + window.location.search);
    break;
  default: 
    document.title = loadTitle;
    document.body.appendChild(buildDiv('portfolio', 'portfolio'));
    ReactDOM.render(<Portfolio />, document.getElementById('portfolio'));
    document.body.classList.add('portfolio');
    ReactGA.pageview(window.location.pathname + window.location.search);
    break;
}
//document.body.classList.add('bodyLoaded');


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();