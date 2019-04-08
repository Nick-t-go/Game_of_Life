import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleCell } from './actions/';
//import {  } from '../actions';


class Cell extends Component {
  constructor(props) {
    super(props);
  }

  cellChange = (e) => {
    const {
      toggle,
      id,
      alive
    } = this.props;
    e.persist();
    console.log(e.buttons, e.type)
    if (e.buttons == 1 || e.buttons == 3 || e.type === 'click') {
      toggle(id, !alive);
    }
  }

  render(){
    const {alive } = this.props;
  	return (
      <div 
      className={`item ${alive ? 'item--alive' : ''}`}
      onClick={this.cellChange}
      onMouseEnter={this.cellChange}
      >
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
