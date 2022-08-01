import { GET_COHORTS, GET_PROGRAMMES } from "../actions/types";

const initialState = {
  programmes: null,
  cohorts: null,
};

const programmesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROGRAMMES:
      return {
        programmes: action.payload,
      };

    case GET_COHORTS:
      return {
        ...state,
        cohorts: action.payload,
      };

    default:
  }
  return state;
};

export default programmesReducer;
