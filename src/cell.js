import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleCell } from './actions/';
//import {  } from '../actions';


class Cell extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    
  }

  // If I am 5,5 I need to gather
// 4,4   |5,4  |6,4  |4,5  |6,5 | 4,6 | 5,6  | 6,6
// -1,-1 |0,-1 |+1,-1|-1,0 |+1,0|-1,+1| 0,+1 | +1,+1

  clickTest = ()=>{
    const {toggle, id, alive} = this.props;
    toggle(id, !alive)
  }

  render(){
    const {alive } = this.props;
  	return (
      <div 
      className={`item ${alive ? 'item--alive' : ''}`}
      onClick={this.clickTest}
      >{this.props.id}
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
    toggle: (id, value)=> dispatch(toggleCell(id, value)),
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps
)(Cell)
