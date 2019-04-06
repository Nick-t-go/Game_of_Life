import { actionTypes } from '../actions';
import produce from "immer";

export default (state={active:false, current:0, sequences: [], started: false, pause: false}, action ) => 
	produce(state, draft => {
		switch(action.type){
			case actionTypes.INITIALIZE_SEQUENCE: 
				draft.current = 0;
				draft.sequences = [action.sequence];
				return
			case actionTypes.TOGGLE_CELL:
				draft.sequences[0][action.cell] = action.value;
				return
			case actionTypes.ADD_SEQUENCE:
				draft.sequences.push(action.sequence)
				return
			case actionTypes.CHANGE_SEQUENCE:
				draft.current = action.value;
				return
			case actionTypes.SET_GAME_START:
				draft.started = true;
				return
			case actionTypes.TOGGLE_PAUSE:
				draft.pause = action.value;
				return
			case actionTypes.RESET_GAME:
				draft.started = false;
				return
			default:
				return state;
		}
	})
