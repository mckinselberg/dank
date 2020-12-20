import React, { useState, useRef } from 'react';
import '../../css/audio-player.css';
//import ReactDOM from 'react-dom';

// initialize audio context outside of function component scope
const AudioContext = window.AudioContext || window.webkitAudioContext; // <-- for legacy browsers
// instantiate audio context in app
const audioContext = new AudioContext();
// create audio element on the fly or use document.querySelector('audio');
let audioElement = document.createElement('audio');
audioElement.crossOrigin = "anonymous";
audioElement.src = "/music/boombap.mp3";

if (audioContext.state === 'suspended') {
  audioContext.resume();
}

const songs = [
  {
    name: 'reset',
    url: 'fx/reset.mp3'
  },
  {
    name: 'saturday',
    url: '201213 Saturday.mp3'
  },
  {
    name: 'run',
    url: 'experimental/run.mp3'
  },
  {
    name: 'crazy drums',
    url: 'experimental/crazy-drums.mp3',
    album: '',    
  },
  {
    name: 'more',
    url: 'more.mp3'
  },
  {
    name: 'more extended',
    url: 'more-extended.mp3'
  },
  {
    name: "drive",
    url:"unpro/drive-004.mp3"
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
    url: 'experimental/noir.mp3'
  },
  {
    name: 'noir too',
    url: 'experimental/noir2.mp3'
  },
  {
    name: 'noir 3',
    url: 'experimental/170206-noir-3.mp3'
  },
  {
    name: 'quarantine',
    url: 'Quarantine.mp3'
  },
  {
    name: 'yamahahaha',
    url: '181102-001.mp3'
  }
];

export default function AudioPlayerComponent() {
  const [playState, setPlayState] = useState('is paused');
  const [currentSong, setSong] = useState("boombap");
  const [songDuration, setSongDuration] = useState(null);
  const [songCurrentTime, setSongCurrentTime] = useState(null);
  //const refAudioElement = useRef(audioElement);
  //const [audioElState, setAudioElState] = useState(refAudioEl.current);
  //const refAudioContext = useRef(audioContext);
  //const [audioContextState, setAudioContextState] = useState(refAudioContext)
  

  function pressPlay() {
    // control audio element 
    if (audioElement.paused) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
    // control ui
    if (playState === 'is paused' || playState === 'has ended') {
      setPlayState('is playing');
    } else {
      setPlayState('is paused');
    }
    //setAudioContextState(refAudioContext);
  }

  function changeSong(song, url) {
    audioElement.src = `/music/${url}`;
    setSongDuration(audioElement.duration);
    setSong(song);
    //setAudioElState(refAudioEl.current);
    //setAudioContextState(refAudioContext.current);
    setPlayState('is playing');
    audioElement.play();
  }

  function formatTime(secs, format) {
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600)) / 60);
    var sec = Math.floor(secs - (hr * 3600) - (min * 60));
    if (sec < 10) {
      sec = "0" + sec;
    }
    return min + ':' + sec;
  }

  // gain node
  const gainNode = audioContext.createGain();
  // gainNode.gain.value = 0;
  // connect gain node to audioContext.destination
  // track.connect(gainNode).connect(audioContext.destination);

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
      {(()=>{
        //console.clear();
        //console.log(refAudioEl.current);
        console.log(audioElement.currentTime);
        //console.log(songDuration);
        //console.log(refAudioContext.current)
      })()}

      {audioElement.onloadedmetadata = (e) => {
        console.log(e);
        setSongDuration(audioElement.duration);
      }}

      {audioElement.ontimeupdate = (e) => {
        console.log(e);
        setSongCurrentTime(audioElement.currentTime);
      }}

      {audioElement.onended, (e) => {
        console.log(e);
        setPlayState('has ended');
      }}
      
      <button className="play-button" onClick={pressPlay}>{playState === 'is paused' || playState === 'has ended' ? 'Play' : 'Pause'}</button>
      <br/>
      <h1 className={`current-song`}>{`"${currentSong}" ${playState}`}</h1>
      <p style={{textAlign:'center'}}>{formatTime(songCurrentTime)} of {formatTime(songDuration)}</p>
      <p style={{textAlign:'center'}}></p>
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