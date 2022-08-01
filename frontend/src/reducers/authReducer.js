import {
  ADMIN_USER_LOADED,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  PARENT_USER_FAILED,
  PARENT_USER_LOADED,
  REGISTER_ADMIN_SUCCESS,
  REGISTER_PARENT_FAILED,
  REGISTER_PARENT_SUCCESS,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isAdmin: null,
  isLoading: false,
  user: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_ADMIN_SUCCESS:
    case REGISTER_PARENT_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isAdmin: action.payload.user.is_admin,
        isLoading: false,
      };

    case PARENT_USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isAdmin: false,
        user: action.payload,
      };

    case ADMIN_USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        isAdmin: true,
        user: action.payload,
      };

    case REGISTER_PARENT_FAILED:
    case LOGIN_FAILED:
      localStorage.removeItem("token");
      return {
        ...state,
        ...action.payload,
        token: null,
        isAdmin: null,
        isAuthenticated: false,
        isLoading: false,
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        isAdmin: action.payload.user ? action.payload.user.is_admin : null,
      };

    case PARENT_USER_FAILED:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isClient: null,
        isAuthenticated: false,
        isLoading: false,
      };

    default:
  }
  return state;
};
