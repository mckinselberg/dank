import React, { useState, useRef, Component } from 'react';
import '../../css/audio-player.css';
//import ReactDOM from 'react-dom';


const AudioContext = window.AudioContext || window.webkitAudioContext; // <-- for legacy browsers
// instantiate audio context in app
//const audioContext = new AudioContext();


export default class AudioPlayer extends Component{
  constructor() {
    super();
    this.songs = [
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
    this.state = {
      playState: 'is paused',
      song: this.songs[0]
    }
    this.musicFolder = 'music/'
    this.audioElement = new Audio(`${this.musicFolder}boombap.mp3`);
    this.audioElement.crossOrigin = 'anonymous';
  }
  
  pressPlay = () => {
    this.audioElement.play();
    if (this.audioElement.paused) {
      this.audioElement.play();
    } else {
      this.audioElement.pause();
    }
    // control ui
    if (this.state.playState === 'is paused' || this.state.playState === 'has ended') {
      this.setState({playState:'is playing'});
    } else {
      this.setState({playState:'is paused'});
    }
    //debugger;
  }

  changeSong = (song, url) => {
    console.log('change song pressed');
    this.audioElement.src = `/music/${url}`;
    //setSongDuration(audioElement.duration);
    this.setState({
      playState:'is playing',
      song:song
    });
    //setAudioElState(refAudioEl.current);
    //setAudioContextState(refAudioContext.current);
    //setPlayState('is playing');
    this.audioElement.play();
  }

  render() {
    return (
    <>
      {console.log(this.audioElement)}
      
      <button className="play-button" onClick={this.pressPlay}>{
        this.state.playState === 'is paused' || 
        this.state.playState === 'has ended' ? 
        'Play' : 'Pause'}</button>
      <br/>
      <h1 className={`current-song`}>{`"${this.state.song.name}" ${this.state.playState}`}</h1>
      {/* <p style={{textAlign:'center'}}>{reskinTime(songCurrentTime)} of {reskinTime(songDuration)}</p> */}
      <div className="songs">
        {this.songs.map((song,i) => {
          return (
            <button key={i} onClick={()=>{this.changeSong(this.songs[i])}}>{song.name}</button>
          );
        })}
      </div>
    </>
    );
  }

}

