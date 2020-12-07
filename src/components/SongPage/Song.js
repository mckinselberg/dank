import React from 'react';

export default function Song({ name, url }) {

    return(
        <div className="song" id={name}>
            <span>{name}</span>
            <audio src={`/music/${url}`} controls></audio>    
        </div>    
    );
}