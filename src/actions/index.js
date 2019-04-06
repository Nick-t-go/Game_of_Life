export const actionTypes = {
	INITIATE_GRID: 'INITIATE_GRID',
	PLAY_GAME: 'PLAY_GAME',
	PAUSE_GAME: 'PAUSE_GAME',
	CHANGE_SEQUENCE: 'CHANGE_SEQUENCE',
	INITIALIZE_SEQUENCE: 'INITIALIZE_SEQUENCE',
	TOGGLE_CELL: 'TOGGLE_CELL',
	ADD_SEQUENCE: 'ADD_SEQUENCE',
};

export const initializeGrid = (grid) => ({
	grid,
	type: actionTypes.INITIATE_GRID,
});

export const initializeSequence = (sequence) => ({
	sequence,
	type: actionTypes.INITIALIZE_SEQUENCE,
});

export const toggleCell = (cell, value) => ({
	cell,
	value,
	type: actionTypes.TOGGLE_CELL,
});

export const addNextSequence = (sequence) => ({
	sequence,
	type: actionTypes.ADD_SEQUENCE,
});

export const changeCurrentSequence = (value) => ({
	value,
	type: actionTypes.CHANGE_SEQUENCE,
});

