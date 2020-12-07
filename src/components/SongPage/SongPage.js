import React from 'react';
import Song from './Song';
import '../../css/songs.css';

export default function SongPage() {
  const songs = [
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
  ]
  return (
    <div className="songs">
      {songs.map((song,i) => <Song key={i} name={song.name} url={song.url} />)}
    </div>
  )
}