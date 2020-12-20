import React, { Component } from 'react';
import '../../css/audio-player.css';

//const AudioContext = window.AudioContext || window.webkitAudioContext;

export default class AudioPlayer extends Component{
  constructor() {
    super();
    this.songs = [
      {
        name: 'haunting',
        url: 'haunting.mp3'
      },
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
      song: this.songs[0],
      currentTime: null,
      songDuration: null
    }
    this.musicFolder = 'music/'
    this.audioElement = new Audio(`${this.musicFolder}${this.songs[0].url}`);
    this.audioElement.crossOrigin = 'anonymous';
  }
  
  pressPlay = () => {
    if (this.state.playState === 'is paused' || this.state.playState === 'has ended') {
      this.setState({playState:'is playing'});
      this.audioElement.play();
    } else {
      this.setState({playState:'is paused'});
      this.audioElement.pause();
    }
  }

  changeSong = (song) => {
    this.setState({
      playState:'is playing',
      song:song
    });
    this.audioElement.src = `/music/${song.url}`;
    this.audioElement.play();
  }

  componentDidMount() {
    this.audioElement.onended = () => {
      this.setState({
        playState: 'has ended'
      })
    }
    this.audioElement.ontimeupdate = () => {
      this.setState({currentTime: this.audioElement.currentTime});
      this.returnPosition();
    }
    this.audioElement.onloadedmetadata = () => {
      this.setState({songDuration: this.audioElement.duration});
    }
  }

  formatTime(secs) {
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600)) / 60);
    var sec = Math.floor(secs - (hr * 3600) - (min * 60));
    if (sec < 10) {
      sec = "0" + sec;
    }
    return min + ':' + sec;
  }

  returnPosition() {
    let indicatorPosition = this.state.currentTime / this.state.songDuration;
    if (isNaN(indicatorPosition)) {
        return {left: 0 + '%'}
    } else if (indicatorPosition < .5) {
      console.log(indicatorPosition)
      return {left: indicatorPosition  * 100  + '%'}
    } else if (indicatorPosition > .5) {
      console.log(indicatorPosition)
      return {right: ((1 - indicatorPosition) * 100)  + '%'}
    } else {
    }
  }

  render() {
    return (
    <>
      <button className="play-button" onClick={this.pressPlay}>{
        this.state.playState === 'is paused' || 
        this.state.playState === 'has ended' ? 
        'Play' : 'Pause'}
      </button>
      <div className="indicator-container">
        <div 
          className="indicator"
          style={this.returnPosition()}>
        </div>
        <p style={{textAlign:'center'}}>
          {this.formatTime(this.state.currentTime)} of {this.formatTime(this.state.songDuration)}
        </p>
      </div>
      <br/>
      <h1 className={`current-song`}>{`"${this.state.song.name}" ${this.state.playState}`}</h1>
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
