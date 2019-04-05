import { combineReducers } from 'redux';
import cell from './cellReducer';
import game from './gameReducer';


export default combineReducers({
	cell,
	game
})