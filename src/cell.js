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
    if (e.buttons == 1 || e.buttons == 3 || e.type === 'click') {
      toggle(id, !alive);
    }
  }

  autoPlay = () => {
    const {intervalOn, alive, pause} = this.props;
    return intervalOn && alive && !pause
  }

  render(){
    const {alive, intervalOn } = this.props;
  	return (
      <div 
      className={
        `item ${alive ? 'item--alive' : ''} 
        ${ this.autoPlay() ? 'autoplay' : ''}`
      }
      onClick={this.cellChange}
      onMouseEnter={this.cellChange}
      >
      </div>
  	)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    toggle: (id, value)=> dispatch(toggleCell(id, value)),
  }
}

export default connect(null,
  mapDispatchToProps
)(Cell)
