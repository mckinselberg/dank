import React from 'react';
import logo from './splash_logo.png';
import './App.css';
import './animate.css';
import RandomAnimations from './components/RandomAnimations.js';



function App() {
  return (
    <div className="App">
      <header className="App-header">
      <RandomAnimations />
      </header>
    </div>
  );
}

export default App;
