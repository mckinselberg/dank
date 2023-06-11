import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

import '../index.css';
import '../css/Portfolio.css';
//import './css/animate.css';
//Components
import Head from './Head/Head';
import Portfolio from './Portfolio/Portfolio';
import Mastermind from './Mastermind/Game';
import Quotes from './Quotes/QuotesComponent';
import Tetris from './Tetris/Tetris';
import SongPage from './SongPage/SongPage';
import AudioPlayer from './AudioPlayer/AudioPlayerComponent';
import Cats from './Cats/Cats.component';
//import qs from './utilities/qs';
import ReactGA from 'react-ga';

export default function App() {
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
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/tetris">
        {() => {
          document.title = 'Tetris, from a tutorial by https://github.com/javascriptteacher';
          document.body.appendChild(buildDiv('score', 'score'));
          document.body.appendChild(buildCanv('tetris', 'tetris', 240, 400));
          Tetris();
          return null
        }}
        </Route>
        <Route path="/cats">
          <Head title="Click to See a Cat"/>
          <Cats/>
        </Route>
        <Route path="/quotes">
          <Head title="Rob's Collected Quotes"/>
          <Quotes />
        </Route>
        <Route path="/mastermind">
          <Head title="Dan Kinsley's Mastermind. The classic game, made with React."/>
          <Mastermind />
        </Route>
        <Route path="/musicplayer">
          <Head title="Dan Kinsley's Audio Player"/>
          <AudioPlayer />
        </Route>
        <Route path="/songs">
          <Head title="Dan Kinsley's Audio Player"/>
          <SongPage />
        </Route>
        <Route path="/">
          <Portfolio />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}