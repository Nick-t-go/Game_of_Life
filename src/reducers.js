import { actionTypes } from "./actions";

const initialState = {
  grid: [],
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADVANCE_GENERATION:
      return state;

    default:
      return state;
  }
};

export default reducers;
