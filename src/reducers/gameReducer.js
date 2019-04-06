import { actionTypes } from '../actions';
import produce from "immer";

export default (state={active:false, current:0, sequences: []}, action ) => 
	produce(state, draft => {
		switch(action.type){
			case actionTypes.INITIALIZE_SEQUENCE: 
				console.log('here')
				draft.sequences = [action.sequence]
				return
			case actionTypes.TOGGLE_CELL:
				draft.sequences[0][action.cell] = action.value
				return
			case actionTypes.ADD_SEQUENCE:
				draft.sequences.push(action.sequence)
				return
			case actionTypes.CHANGE_SEQUENCE:
				draft.current = action.value
				return
			default:
				return state;
		}
	})