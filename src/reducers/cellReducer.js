import produce from 'immer';
import { actionTypes } from '../actions';

export default (state = {
  set: false,
}, action) => produce(state, (draft) => {
  switch (action.type) {
    case actionTypes.INITIATE_GRID:
      draft = action.grid;
      return draft;
    default:
      return state;
  }
});
