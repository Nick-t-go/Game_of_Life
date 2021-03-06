export const actionTypes = {
  INITIATE_GRID: 'INITIATE_GRID',
  PLAY_GAME: 'PLAY_GAME',
  PAUSE_GAME: 'PAUSE_GAME',
  CHANGE_SEQUENCE: 'CHANGE_SEQUENCE',
  INITIALIZE_SEQUENCE: 'INITIALIZE_SEQUENCE',
  TOGGLE_CELL: 'TOGGLE_CELL',
  ADD_SEQUENCE: 'ADD_SEQUENCE',
  RESET_GAME: 'RESET_GAME',
  SET_GAME_START: 'SET_GAME_START',
  TOGGLE_PAUSE: 'TOGGLE_PAUSE',
  TOGGLE_WRAP: 'TOGGLE_WRAP',

};

export const initializeGrid = grid => ({
  grid,
  type: actionTypes.INITIATE_GRID,
});

export const initializeSequence = sequence => ({
  sequence,
  type: actionTypes.INITIALIZE_SEQUENCE,
});

export const toggleCell = (cell, value) => ({
  cell,
  value,
  type: actionTypes.TOGGLE_CELL,
});

export const addNextSequence = cells => ({
  cells,
  type: actionTypes.ADD_SEQUENCE,
});

export const changeCurrentSequence = value => ({
  value,
  type: actionTypes.CHANGE_SEQUENCE,
});

export const resetGameGrid = () => ({
  type: actionTypes.RESET_GAME,
});

export const setStartGame = () => ({
  type: actionTypes.SET_GAME_START,
});

export const toggleGamePause = value => ({
  value,
  type: actionTypes.TOGGLE_PAUSE,
});

export const toggleGameWrap = value => ({
  value,
  type: actionTypes.TOGGLE_WRAP,
});
