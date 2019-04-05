import React, { Component } from 'react';
import { connect } from 'react-redux';
//import {  } from '../actions';


class GameOfLife extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 20,
      columns: 20,
    };
  }
  componentDidMount(){
  
  }

  render(){
  	return (
      <div />
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
