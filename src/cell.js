import React, { Component } from 'react';
import { connect } from 'react-redux';
//import {  } from '../actions';


class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      neighbors: [],
    };
  }
  componentDidMount(){
    
  }

  // If I am 5,5 I need to gather
// 4,4   |5,4  |6,4  |4,5  |6,5 | 4,6 | 5,6  | 6,6
// -1,-1 |0,-1 |+1,-1|-1,0 |+1,0|-1,+1| 0,+1 | +1,+1

  clickTest = ()=>{
    console.log(this.state.neighbors)
  }

  render(){
  	return (
      <div 
      className={`item ${this.state.alive ? 'item--alive' : ''}`}
      onClick={this.clickTest}
      >
      {`${this.props.x},${this.props.y}`}
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
)(Cell)
