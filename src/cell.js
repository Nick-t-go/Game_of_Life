import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleCell } from './actions/';
//import {  } from '../actions';


class Cell extends Component {
  constructor(props) {
    super(props);
  }

  clickTest = () => {
    const {
      toggle,
      id,
      alive
    } = this.props;
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
