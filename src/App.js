import React from 'react';
import logo from './splash_logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        <img src={logo} className="App-logo" alt="logo" />
        <p>hi.</p>
        <p>my name is dan kinsley. I used to play in a band called <a href="http://www.theunpronounceable.com">the unpronounceable</a?. Now, I'm a web developer and classical guitarist. </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
      </header>
    </div>
  );
}

export default App;
