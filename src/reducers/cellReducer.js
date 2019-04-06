import { actionTypes } from '../actions';
import produce from "immer";


export default (state={set:false}, action ) => 
  produce(state, draft => {
	switch(action.type){
		case actionTypes.INITIATE_GRID:
			draft = action.grid
			return draft;
		default:
			return state;
	}
  })