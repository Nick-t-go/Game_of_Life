import React, { Component } from "react";
import { connect } from "react-redux";
import { 
  changeCurrentSequence,
  addNextSequence,
  toggleGamePause,
  setStartGame,
  resetGameGrid,
  toggleGameWrap,
  initializeGrid,
 } from "./actions/";

export class Controls extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.stepper;
  }

  tick = () => {
    const { game, cells } = this.props;
    const { sequences, current } = game;
    let nextIdx = game.current + 1;
    if (!game.started) this.props.startGame();
    if (!sequences[nextIdx]) {
      let nextSequence = this.getNextSequence(sequences[current]);
      this.props.addSequence(nextSequence);
    }
    this.props.changeSequence(nextIdx);
  };

  decrement = () => {
    this.props.changeSequence(this.props.game.current - 1);
  };

  increment = () => {
    this.props.changeSequence(this.props.game.current + 1);
  };

  start = () => {
    this.props.startGame();
    this.tick();
    this.setStepper();
  };

  setStepper = () => {
    this.stepper = window.setInterval(() => {
      if (!this.props.game.pause) {
        this.tick();
      }
    }, 500);
    this.props.toggleInterval();
  };

  getNextSequence(currentSequence) {
    return Object.entries(currentSequence).reduce((acc, [id, value]) => {
      acc[id] = this.getNextState(id, value);
      return acc;
    }, {});
  }

  getNextState = (id, alive) => {
    const { game, cells } = this.props;
    const sequnece = game.sequences[game.current];
    let neighbors = cells.grid[id].neighbors;
    let aliveNeighbors = neighbors.filter(neighborID => sequnece[neighborID]);
    if (!alive) {
      if (aliveNeighbors.length === 3) return true;
      return false;
    }
    if (aliveNeighbors.length <= 1) {
      return false;
    } else if (aliveNeighbors.length <= 3) {
      return true;
    } else {
      return false;
    }
  };

  pause = () => {
    const pause = !this.props.game.pause;
    this.props.togglePause(pause);
  };

  reset = () => {
    this.props.initialize();
    this.props.resetGame();
    clearInterval(this.stepper);
    this.props.toggleInterval();
  };

  wrapToggle = event => {
    event.persist();
    this.props.toggleWrap(event.target.checked);
    const { cells } = this.props.createCells(event.target.checked);
    let cellsGrid = {
      set: true,
      grid: cells
    };
    this.props.initGrid(cellsGrid);
  };

  render() {
    const { game } = this.props;

    return (
      <div className='control'>
        <button 
          onClick={this.tick} 
          className='controls'>
          Tick
        </button>
        <button
          onClick={this.start}
          className='controls'
          disabled={game.started && this.props.intervalOn}>
          Start
        </button>
        <button
          disabled={!game.started || !this.props.intervalOn}
          onClick={this.pause}
          className='controls'>
          {game.pause ? "Resume" : "Pause"}
        </button>
        <button 
          onClick={this.reset}
          className='controls'>
          Reset
        </button>
        <div>
          Wrap
          <label className='switch'>
            <input
              type='checkbox'
              disabled={game.started}
              checked={game.wrap}
              onChange={this.wrapToggle}
            />
            <span className='slider round' />
          </label>
        </div>
        <div className='controls'>{`Sequence: ${this.props.game.current}`}</div>
        <button
          onClick={this.decrement}
          className='controls'
          disabled={!game.started || game.current === 0}>
          Step Back
        </button>
        <button
          onClick={this.increment}
          className='controls'
          disabled={
            !game.started || game.sequences.length === game.current + 1
          }>
          Step Forward
        </button>
      </div>
    );
  }
}

function mapStateToProps({ cells, game }) {
  return {
    cells,
    game
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeSequence: val => dispatch(changeCurrentSequence(val)),
    addSequence: seq => dispatch(addNextSequence(seq)),
    togglePause: val => dispatch(toggleGamePause(val)),
    startGame: () => dispatch(setStartGame()),
    resetGame: () => dispatch(resetGameGrid()),
    toggleWrap: val => dispatch(toggleGameWrap(val)),
    initGrid: grid => dispatch(initializeGrid(grid)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls);