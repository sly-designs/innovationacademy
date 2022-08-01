import {
  ADD_KID,
  GET_ALL_KIDS,
  GET_ALL_KIDS_FAIL,
  GET_KID,
  GET_KID_FAIL,
  UPDATE_KID,
  UPDATE_KID_FAILED,
} from "../actions/types";

const initialState = {
  kids: null,
  kid: null,
  error: null,
};

export const kidsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_KIDS_FAIL:
    case UPDATE_KID_FAILED:
    case GET_KID_FAIL:
      return {
        ...action.payload,
        kids: null,
        kid: null,
        error: action.payload,
      };

    case GET_ALL_KIDS:
      return {
        kids: action.payload,
        kid: null,
      };

    case ADD_KID:
    case UPDATE_KID:
      return {
        kids: state.kids.concat(action.payload),
        kid: action.payload,
      };

    case GET_KID:
      return {
        kid: action.payload,
      };

    default:
  }
  return state;
};
