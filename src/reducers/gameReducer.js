import produce from 'immer';

import {
  actionTypes,
} from '../actions';

// Object.entries(currentSequence).reduce((acc, [id, value]) => {
//       acc[id] = this.getNextState(id, value);
//       return acc;
//     }, {});

const getNextGameState = (cells, sequence, id, alive) => {
  console.log(cells, sequence, id, alive)
    let neighbors = cells.grid[id].neighbors;
    let aliveNeighbors = neighbors.filter(neighborID => sequence[neighborID]);
    if (!alive) {
      if (aliveNeighbors.length === 3) return true;
      return false;
    }
    if (aliveNeighbors.length <= 1) {
      return false;
    } else if (aliveNeighbors.length <= 3) {
      return true;
    } else {
      return false;
    }
  };

export default (state = {
  active: false,
  current: 0,
  sequences: [],
  started: false,
  pause: false,
  wrap: false,
  columns: 50,
  rows: 50,
}, action) => produce(state, (draft) => {
  switch (action.type) {
    case actionTypes.INITIALIZE_SEQUENCE:
      draft.current = 0;
      draft.sequences = [action.sequence];
      return;
    case actionTypes.TOGGLE_CELL:
      draft.sequences[draft.current][action.cell] = action.value;
      return;
    case actionTypes.ADD_SEQUENCE:
      const newSequence = Object.entries(draft.sequences[draft.current]).reduce(( acc, [id, value]) => {
         acc[id] = getNextGameState(action.cells, draft.sequences[draft.current], id, value);
         return acc;
      },{});
      draft.sequences.push(newSequence);
      return;
    case actionTypes.CHANGE_SEQUENCE:
      draft.current = action.value;
      return;
    case actionTypes.SET_GAME_START:
      draft.started = true;
      return;
    case actionTypes.TOGGLE_PAUSE:
      draft.pause = action.value;
      return;
    case actionTypes.RESET_GAME:
      draft.started = false;
      draft.wrap = false;
      return;
    case actionTypes.TOGGLE_WRAP:
      draft.wrap = action.value;
      return;
    default:
      return
  }
});

