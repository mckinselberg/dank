import React from 'react';
import ReactDOM from 'react-dom';

export default function AudioPlayerComponent() {
  // for legacy browsers
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  // instantiate audio context in your app
  const audioContext = new AudioContext();
  // get the audio element
  //from doc
  //const audioElement = document.querySelector('audio');
  //or
  //create on the fly
  let audioElement = document.createElement('audio'); //document.querySelector('audio');
  audioElement.crossOrigin = "anonymous";
  audioElement.src = "/music/drive-004.mp3";
  // pass it into the audio context
  const track = audioContext.createMediaElementSource(audioElement);
  //track.connect(audioContext.destination);



  audioElement.addEventListener('ended', () => {
    playButton.dataset.playing = 'false';
    alert(`it's done playing`);
  }, false);


  const playButton = document.createElement('button');

  playButton.addEventListener('click', function() {

    // check if context is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // play or pause track depending on state
    if (this.dataset.playing === 'false') {
        audioElement.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        audioElement.pause();
        this.dataset.playing = 'false';
    }

  }, false);


  // gain node
  const gainNode = audioContext.createGain();
  // gainNode.gain.value = 0;
  // connect gain node to audioContext.destination
  track.connect(gainNode).connect(audioContext.destination);

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
    <div>
      {playButton}
    </div>
  )
}