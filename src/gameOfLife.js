import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cell from './cell';
//import {  } from '../actions';


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
    

  }

  createCells = () => {
    let cells = {};
    for (let y = 0; y <= this.state.rows; y++) {
      for (let x = 0; x <= this.state.columns; x++) {
        cells[x+'-'+y] = {
          neighbors: this.collectNeighbors(x,y),
          alive: false,
        }
      }
    }
    return cells
  }

  createTable = () => {
    let table = []

    // Outer loop to create parent
    for (let y = 0; y <= this.state.rows; y++) {
      let children = []
      //Inner loop to create children
      for (let x = 0; x <= this.state.columns; x++) {
        let key = x+'-'+y;
        children.push(<Cell x={x} y={y} coord={key} key={key}/>)
      }
      //Create the parent and add the children
      table.push(<div className="row" key={y}>{children}</div>)
    }
    return table
  }

  render(){
  	return (
      <div>
        {this.createTable()}
      </div>
  	)
  }
}


function mapStateToProps ({ cell, game }) {
  return {
    cell,
    game,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps
)(GameOfLife)
