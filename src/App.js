import React, { Component } from 'react';
import './main.css';
import GameOfLife from './gameOfLife'

import { TOAD } from "./patterns";

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Welcome to the Game... of Life!</h1>
         <GameOfLife />
      </div>
    );
  }
}

export default App;
