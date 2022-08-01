import axios from "axios";
import {
  ADD_KID,
  ADD_KID_FAIL,
  GET_ALL_KIDS,
  GET_KID,
  GET_ALL_KIDS_FAIL,
  GET_KID_FAIL,
  UPDATE_KID,
  UPDATE_KID_FAILED,
  ENROLL_KID,
  ENROLL_KID_FAILED,
} from "./types";

export const getAllKids = () => (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const token = getState().auth.token;

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .get("/api/kids/", config)
    .then((res) => {
      dispatch({
        type: GET_ALL_KIDS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ALL_KIDS_FAIL,
        payload: err,
      });
    });
};

export const addKid =
  ({ fullname, dob }) =>
  (dispatch, getState) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const token = getState().auth.token;

    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }

    const body = JSON.stringify({ fullname, dob });

    axios
      .post("/api/kids/", body, config)
      .then((res) => {
        dispatch({
          type: ADD_KID,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: ADD_KID_FAIL,
          payload: err,
        });
      });
  };

export const getKid = (id) => (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const token = getState().auth.token;

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .get(`/api/kids/${id}/`, config)
    .then((res) => {
      dispatch({
        type: GET_KID,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_KID_FAIL,
        payload: err,
      });
    });
};

export const updateKid =
  ({ id, fullname, dob }) =>
  (dispatch, getState) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const token = getState().auth.token;

    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }

    const body = JSON.stringify({ fullname, dob });

    axios
      .patch(`/api/kids/${id}/`, body, config)
      .then((res) => {
        dispatch({
          type: UPDATE_KID,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_KID_FAILED,
          payload: err,
        });
      });
  };

export const enrollKid =
  ({ id, fullname, dob, programme_id, cohort_id }) =>
  (dispatch, getState) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const token = getState().auth.token;

    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }

    const body = JSON.stringify({ fullname, dob, programme_id, cohort_id });

    axios
      .patch(`/api/kids/${id}/`, body, config)
      .then((res) => {
        dispatch({
          type: ENROLL_KID,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: ENROLL_KID_FAILED,
          payload: err,
        });
      });
  };
