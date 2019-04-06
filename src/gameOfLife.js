import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cell from './cell';
import { 
  initializeGrid,
  initializeSequence,
  addNextSequence,
  changeCurrentSequence,
  toggleGamePause,
  setStartGame,
  resetGameGrid
} from './actions/'

// Any live cell with 
//    fewer than two live neighbours dies, as if by underpopulation.
//    two or three live neighbours lives on to the next generation.
//    more than three live neighbours dies, as if by overpopulation.
// Any dead cell with 
//    exactly three live neighbours becomes a live cell, as if by reproduction.

class GameOfLife extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 10,
      columns: 10,
    };
  }

  componentDidMount(){
    this.initialize()
    this.stepper;
    //registerGrid(this.state.columns, this.state.rows)
  }

  collectNeighbors = (x, y) => {
    let neighbors = [];
    for (let i = x-1; i <= x+1; i++){
      for(let j = y-1; j <= y+1; j++){
        if( i !== x || j !== y){
          neighbors.push(i+'-'+j)
        }
      }
    }
    return neighbors
  }

  initialize = () => {
    const { cells, sequence } = this.createCells();
    let initialCellsGrid = {set:true, grid: cells}
    this.props.initSequence(sequence);
    this.props.initGrid(initialCellsGrid);
  }

  createCells = () => {
    let cells = {}
    let sequence = {}
    for (let y = 0; y <= this.state.rows; y++) {
      for (let x = 0; x <= this.state.columns; x++) {
        let key = x+'-'+y
        cells[key] = {
          neighbors: this.collectNeighbors(x,y),
        };
        sequence[key] = false
      }
    }
    return {cells, sequence}
  }

  createTable = () => {
    const { cells, game } = this.props
    let table = []
    // Outer loop to create parent
    for (let y = 0; y <= this.state.rows; y++) {
      let children = []
      //Inner loop to create children
      for (let x = 0; x <= this.state.columns; x++) {
        let key = x+'-'+y;
        children.push(
          <Cell 
          x={x}
          y={y}
          id={key}
          key={key} 
          alive={game.sequences[game.current][key]}
          />
        )
      }
      //Create the parent and add the children
      table.push(<div className="row" key={y}>{children}</div>)
    }
    return table
  }

  start = () => {
    this.props.startGame();
    this.tick();
    this.setStepper()
  }

  tick = () => {
    const { game, cells } = this.props;
    const { sequences, current } = game;
    let nextIdx = game.current+1
    if(!sequences[nextIdx]){
      let nextSequence = this.getNextSequence(sequences[current])
      this.props.addSequence(nextSequence)
    }
    this.props.changeSequence(nextIdx)
  }

  setStepper = () => {
    this.stepper = window.setInterval( () => {
      if(!this.props.game.pause){
        this.tick()
      }
    },500)  
  }


  getNextSequence(currentSequence){
    return Object.entries(currentSequence).reduce( (acc,[id, value])=>{
      acc[id] = this.getNextState(id, value)
      return acc
    }, {})
  }

  getNextState = (id, alive) => {
    const {game, cells} = this.props
    const sequnece = game.sequences[game.current]
    let neighbors = cells.grid[id].neighbors
    let aliveNeighbors = neighbors.filter( neighborID => sequnece[neighborID])
    if(!alive && aliveNeighbors.length === 3) return true;
    if (aliveNeighbors.length <= 1){
      return false;
    }else if(aliveNeighbors.length <= 3){
      return true;
    }else{
      return false;
    }
  } 

  pause = () => {
    const pause = !this.props.game.pause
    this.props.togglePause(pause)
  }

  reset = () => {
    this.initialize();
    this.props.resetGame();
    clearInterval(this.stepper);
  }

  render(){
    const { game } = this.props
  	return (
      <div>
        {game.sequences[0] && this.createTable()}
        <div className="control">
          { game.started ?
            <button
            onClick={this.pause}
            className="controls"
            >{game.pause ? 'Resume' : 'Pause'}
            </button> :
            <button
            onClick={this.start}
            className="controls"
            >Start
            </button> 
          }
          <button
          onClick={this.reset}
          className="controls"
          >Reset
          </button>
          <div
          className="controls"
          >{`Sequence: ${this.props.game.current}`}</div>
        </div>
      </div>
  	)
  }
}


function mapStateToProps ({ cells, game }) {
  return {
    cells,
    game,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    initGrid: (grid) => dispatch(initializeGrid(grid)),
    initSequence: (seq) => dispatch(initializeSequence(seq)),
    addSequence: (seq) => dispatch(addNextSequence(seq)),
    changeSequence: (val) => dispatch(changeCurrentSequence(val)),
    togglePause: (val) => dispatch(toggleGamePause(val)),
    startGame: () => dispatch(setStartGame()),
    resetGame: () => dispatch(resetGameGrid()),
  }
}
    
export default connect(mapStateToProps,
  mapDispatchToProps
)(GameOfLife)
