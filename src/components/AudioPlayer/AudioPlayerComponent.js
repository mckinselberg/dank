import React, { useState, useRef } from 'react';
import '../../css/audio-player.css';
//import ReactDOM from 'react-dom';
//import Song from '../SongPage/Song';

// initialize audio context outside of function component scope
const AudioContext = window.AudioContext || window.webkitAudioContext; // <-- for legacy browsers
// instantiate audio context in your app
const audioContext = new AudioContext();
// get the audio element
//from doc
//const audioElement = document.querySelector('audio');
//or
//create on the fly
let audioElement = document.createElement('audio'); //document.querySelector('audio');
audioElement.crossOrigin = "anonymous";
audioElement.src = "/music/boombap.mp3";
// pass it into the audio context
//const track = audioContext.createMediaElementSource(audioElement);
//track.connect(audioContext.destination);

if (audioContext.state === 'suspended') {
  audioContext.resume();
}
  
/*
let i = 0;
audioElement.addEventListener('ended', () => {
  console.log(i); i++;
  console.log(`it's done playing`);
}, false);
*/

const songs = [
  {
    name: 'reset',
    url: 'fx/reset.mp3'
  },
  {
    name: 'crazy drums',
    url: 'crazy-drums.mp3'
  },
  {
    name: 'more',
    url: 'more.mp3'
  },
  {
    name: "drive",
    url:"drive-005.mp3"
  },
  {
    name: "boom bap",
    url:"boombap.mp3"
  },
  {
    name: "boom bap nope",
    url:"boombapnope.mp3"
  },
  {
    name: 'glory box',
    url: 'Glory Box.mp3'
  },
  {
    name: 'noir',
    url: 'noir.mp3'
  },
  {
    name: 'quarantine',
    url: 'Quarantine.mp3'
  },
  {
    name: 'run',
    url: 'run.mp3'
  },
  {
    name: 'yamahahaha',
    url: '181102-001.mp3'
  }
];

export default function AudioPlayerComponent() {
  const [playState, setPlayState] = useState('paused');
  const [currentSong, setSong] = useState("boombap");
  const refAudioEl = useRef(audioElement);
  const [audioElState, setAudioElState] = useState(refAudioEl.current);
  const refAudioContextState = useRef(audioContext);
  const [audioContextState, setAudioContextState] = useState(refAudioContextState)
  

  function pressPlay() {   
    // control audio element 
    if (audioElement.paused) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
    // control ui
    if (playState === 'paused') {
      setPlayState('playing');
    } else {
      setPlayState('paused');
    }
    setAudioContextState(refAudioContextState);
  }

  function changeSong(song, url) {
    audioElement.src = `/music/${url}`;
    setSong(song);
    setPlayState('playing');
    setAudioElState(refAudioEl.current);
    audioElement.play();
  }

  


  // gain node
  const gainNode = audioContext.createGain();
  // gainNode.gain.value = 0;
  // connect gain node to audioContext.destination
  //track.connect(gainNode).connect(audioContext.destination);

  const volumeControl = document.createElement('input');
  volumeControl.type="range";
  volumeControl.id="volume";
  volumeControl.min="0";
  volumeControl.max="2";
  volumeControl.vsalue="1";
  volumeControl.step="0.01";

  volumeControl.addEventListener('input', function() {
    gainNode.gain.value = this.value;
  }, false);

  return (
    <>
      {/* {playButton} */}
      {/* <Song name="more" url="more.mp3"  /> */}

      {(()=>{
        /*debugger*/;
        console.log(audioElState);
        console.log(audioContextState);
        Object.entries(audioElState);
      })()}

      {refAudioEl.current.addEventListener('ended', (e) => {
        console.log(e);
        console.log('component scope ended');
      })}
      
      <button className="play-button" onClick={pressPlay}>{playState === 'paused' ? 'Play' : 'Pause'}</button>
      <br/>
      <h1>{`"${currentSong}" is ${playState}`}</h1>
      <br/>
      <br/>
      <div className="songs">
        {songs.map((song,i) => {
          return (
            <button key={i} onClick={()=>{changeSong(song.name, song.url)}}>{song.name}</button>
          );
        })}
      </div>
    </>
  )
}