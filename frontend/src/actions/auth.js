import axios from "axios";
import {
  PARENT_USER_LOADED,
  PARENT_USER_FAILED,
  REGISTER_PARENT_SUCCESS,
  REGISTER_PARENT_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
} from "../actions/types";

//check token and load parent user
export const getParentUser = () => (dispatch, getState) => {
  const token = getState().auth.token;
  const is_admin = getState().auth.isAdmin;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token && !is_admin) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .get("/api/parent/dashboard/", config)
    .then((res) => {
      dispatch({
        type: PARENT_USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PARENT_USER_FAILED,
      });
    });
};

//create a parent user
export const create_parentuser =
  ({ fullname, email, phone, password, password2 }) =>
  (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      fullname,
      email,
      phone,
      password,
      password2,
    });

    axios
      .post("/api/signup/parent/", body, config)
      .then((res) => {
        dispatch({
          type: REGISTER_PARENT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({ type: REGISTER_PARENT_FAILED });
      });
  };

export const login =
  ({ username, password }) =>
  (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ username, password });

    console.log(`logging body\n${body}`);

    axios
      .post("/api/login/", body, config)
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: LOGIN_FAILED,
          payload: err,
        });
      });
  };

export const logout = () => (dispatch, getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .post("/api/logout/", null, config)
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};
