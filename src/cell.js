import React, { Component } from 'react';
import { connect } from 'react-redux';
//import {  } from '../actions';


class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      on: false,
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
)(Cell)
