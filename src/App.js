import React, { Component } from 'react';
import './main.css';

import { TOAD } from "./patterns";

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Welcome to the Game... of Life!</h1>
        <div className="intro">
          <p>
            Hi! Thanks for taking the time to complete this challenge. When
            you're finished, please either fork this repo on GitHub and let us
            know (but please don't create a pull request to the original!) or
            simply zip up your folder and email it over.
          </p>
          <p>
            Good luck, and we're super excited to hear back from you!
          </p>
          <p>
            -Nowsta
          </p>
          <p>
            <button>
              Advance Generation
            </button>
          </p>
        </div>
        <div>
          <div className="row">
            <div className="item" />
            <div className="item item--alive" />
            <div className="item" />
            <div className="item item--alive" />
          </div>

          <div className="row">
            <div className="item item--alive" />
            <div className="item" />
            <div className="item item--alive" />
            <div className="item" />
          </div>

          <div className="row">
            <div className="item" />
            <div className="item item--alive" />
            <div className="item" />
            <div className="item item--alive" />
          </div>

          <div className="row">
            <div className="item item--alive" />
            <div className="item" />
            <div className="item item--alive" />
            <div className="item" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
