import { combineReducers } from 'redux';
import cells from './cellReducer';
import game from './gameReducer';


export default combineReducers({
  cells,
  game,
});
