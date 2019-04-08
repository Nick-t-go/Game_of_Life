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
  resetGameGrid,
  toggleGameWrap,
} from './actions/'

// Any live cell with 
//    fewer than two live neighbours dies, as if by underpopulation.
//    two or three live neighbours lives on to the next generation.
//    more than three live neighbours dies, as if by overpopulation.
// Any dead cell with 
//    exactly three live neighbours becomes a live cell, as if by reproduction.

export class GameOfLife extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows:  15,
      columns: 15,
    };
  }

  componentDidMount(){
    this.initialize()
    this.stepper;
    //registerGrid(this.state.columns, this.state.rows)
  }

  collectNeighbors = (x, y, wrap) => {
    const {columns, rows } = this.state;
    let neighbors = [];
    for (let i = x-1; i <= x+1; i++){
      for(let j = y-1; j <= y+1; j++){
        if( i !== x || j !== y){
          if(wrap){
             let checkedX = this.wrapCheck(i, columns)
             let checkedY = this.wrapCheck(j, rows)
             neighbors.push(checkedX+'-'+checkedY)
          }else{
            neighbors.push(i+'-'+j)
          }
        }
      }
    }
    return neighbors
  }

  wrapCheck = (val, limit) => {
    if(val === -1){
      return limit -1
    } else if(val === limit){
      return 0
    } else{
      return val
    }
  }

  initialize = () => {
    const { cells, sequence } = this.createCells();
    let initialCellsGrid = {set:true, grid: cells}
    this.props.initSequence(sequence);
    this.props.initGrid(initialCellsGrid);
  }

  createCells = () => {
    const {rows, columns } = this.state;
    const { wrap } = this.props.game
    let cells = {}
    let sequence = {}
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        let key = x+'-'+y
        cells[key] = {
          neighbors: this.collectNeighbors(x,y, wrap),
        };
        sequence[key] = false
      }
    }
    return {cells, sequence}
  }

  createTable = () => {
    const { cells, game } = this.props;
    const { rows, columns } = this.state;
    let table = []
    // Outer loop to create parent
    for (let y = 0; y < rows; y++) {
      let children = []
      //Inner loop to create children
      for (let x = 0; x < columns; x++) {
        let key = x+'-'+y;
        children.push(
          <Cell 
          x={x}
          y={y}
          total={rows * columns}
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
    console.log(id, alive, cells)
    let neighbors = cells.grid[id].neighbors
    let aliveNeighbors = neighbors.filter( neighborID => sequnece[neighborID])
    if(!alive){
      if(aliveNeighbors.length === 3) return true;
      return false
    } 
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

  decrement = () => {
    this.props.changeSequence(this.props.game.current-1)
  }

  increment = () => {
    this.props.changeSequence(this.props.game.current+1)
  }

  wrapToggle = (event) => {
    this.props.toggleWrap(event.target.checked)
    this.createCells();
  }

  render(){
    const { game } = this.props
  	return (
      <div data-test="component-game">
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
          <small>Wrap</small>
          <label 
          className="switch"
          > 
            <input 
            type="checkbox"
            disabled={game.started}
            
            onChange={this.wrapToggle}
            />
            <span
            className="slider round"
            ></span>
          </label>

          <button
          onClick={this.reset}
          className="controls"
          >Reset
          </button>
          <div
          className="controls"
          >{`Sequence: ${this.props.game.current}`}</div>
          { game.current > 0 &&
           <button
            onClick={this.decrement}
            className="controls"
            >Step Back
            </button> }
          { game.sequences.length > game.current+1 &&
           <button
            onClick={this.increment}
            className="controls"
            >Step Forward
            </button> }

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
    toggleWrap: (val) => dispatch(toggleGameWrap(val)),
  }
}
    
export default connect(mapStateToProps,
  mapDispatchToProps
)(GameOfLife)
