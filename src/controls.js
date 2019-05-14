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
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Power from '@material-ui/icons/Power';
import SkipNext from '@material-ui/icons/SkipNext';
import Pause from '@material-ui/icons/Pause';
import Replay from '@material-ui/icons/Replay';
import Switch from '@material-ui/core/Switch';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';

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
      // let nextSequence = this.getNextSequence(sequences[current]);
      this.props.addSequence(cells);
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

  seqChange = event => {
    this.props.changeSequence(event.target.value)
  }

  render() {
    const { game } = this.props;

    return (
      <div className='control'>
        <Button
          onClick={this.start}
          size="small" 
          variant="contained"
          color="primary"
          disabled={game.started && this.props.intervalOn}
          className='controls'
          >
          Start
          <Power>start</Power>
        </Button>
        <Button
          onClick={this.tick} 
          variant="contained"
          color="primary"
          className='controls'
          size="small"
          >
          Tick
          <SkipNext>start</SkipNext>
        </Button>
        <Button
          onClick={this.pause} 
          variant="contained"
          color="primary"
          className='controls'
          size="small"
          >
          {game.pause ? "Resume" : "Pause"}
          {game.pause ? <PlayArrow>Plau</PlayArrow> : <Pause>Pause</Pause> }
        </Button>
        <Button
          onClick={this.reset} 
          variant="contained"
          color="primary"
          className='controls'
          size="small"
          >
          Reset
          <Replay>Reset</Replay>
        </Button>
        <FormControlLabel
          control={
            <Switch
              disabled={game.started}
              checked={game.wrap}
              onChange={this.wrapToggle}
              color="primary"
            />
          }
          label="Wrap"
        />
       
        <IconButton
        className='controls'
        aria-label="Decrement" 
        onClick={this.decrement}
        disabled={!game.started || game.current === 0}
        >
          <ArrowBackIos fontSize="small" />
        </IconButton>
        <div className="controls slidecontainer">
          <Chip 
         label={`Sequence: ${this.props.game.current}`}
         color='primary' />
          <input
          type='range'
          min='0'
          max={game.sequences.length - 1}
          value={game.current}
          onChange={this.seqChange}
          />
        </div>
        <IconButton
        className='controls'
        aria-label="Decrement" 
        onClick={this.increment}
        disabled={!game.started || game.sequences.length === game.current + 1}
        >
          <ArrowForwardIos fontSize="small" />
        </IconButton>     
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
    addSequence: cells => dispatch(addNextSequence(cells)),
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