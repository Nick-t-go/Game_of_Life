import React, { Component } from "react";
import { connect } from "react-redux";
import Cell from "./cell";
import Controls from "./controls";
import {
  initializeGrid,
  initializeSequence,
  toggleGamePause,
  setStartGame,
  resetGameGrid,
  toggleGameWrap
} from "./actions/";

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
      intervalOn: false,
    };
  }

  componentDidMount() {
    this.initialize();
    this.stepper;
  }

  toggleInterval = () =>{
    this.setState({ intervalOn: !this.state.intervalOn})
  }

  collectNeighbors = (x, y, wrap) => {
    const { columns, rows } = this.props.game;
    let neighbors = [];
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (i !== x || j !== y) {
          if (wrap) {
            let checkedX = this.wrapCheck(i, columns);
            let checkedY = this.wrapCheck(j, rows);
            neighbors.push(checkedX + "-" + checkedY);
          } else {
            neighbors.push(i + "-" + j);
          }
        }
      }
    }
    return neighbors;
  };

  wrapCheck = (val, limit) => {
    if (val === -1) {
      return limit - 1;
    } else if (val === limit) {
      return 0;
    } else {
      return val;
    }
  };

  initialize = () => {
    const { cells, sequence } = this.createCells();
    let initialCellsGrid = { set: true, grid: cells };
    this.props.initSequence(sequence);
    this.props.initGrid(initialCellsGrid);
  };

  createCells = (wrap = false) => {
    const { rows, columns } = this.props.game;
    let cells = {};
    let sequence = {};
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        let key = x + "-" + y;
        cells[key] = {
          neighbors: this.collectNeighbors(x, y, wrap)
        };
        sequence[key] = false;
      }
    }
    return { cells, sequence };
  };

  createTable = () => {
    const { cells, game } = this.props;
    const { rows, columns } = game;
    let table = [];
    // Outer loop to create parent
    for (let y = 0; y < rows; y++) {
      let children = [];
      //Inner loop to create children
      for (let x = 0; x < columns; x++) {
        let key = x + "-" + y;
        children.push(
          <Cell
            id={key}
            key={key}
            intervalOn={this.state.intervalOn}
            alive={game.sequences[game.current][key]}
            pause={game.pause}
          />
        );
      }
      //Create the parent and add the children
      table.push(
        <div className='row' key={y}>
          {children}
        </div>
      );
    }
    return table;
  };

  

  render() {
    const { game } = this.props;
    return (
      <div className='gameContainer' data-test='component-game'>
        <div className='gridContainer'>
          {game.sequences[0] && this.createTable()}
        </div>
        <Controls
        toggleInterval={this.toggleInterval}
        intervalOn={this.state.intervalOn}
        createCells={this.createCells}
        initialize={this.initialize}/>
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
    initGrid: grid => dispatch(initializeGrid(grid)),
    initSequence: seq => dispatch(initializeSequence(seq))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameOfLife);