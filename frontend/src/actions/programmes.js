import axios from "axios";
import {
  GET_COHORTS,
  GET_COHORTS_FAIL,
  GET_PROGRAMMES,
  GET_PROGRAMMES_FAIL,
} from "./types";

export const getProgrammes = () => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .get("/api/programmes", config)
    .then((res) => {
      dispatch({
        type: GET_PROGRAMMES,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_PROGRAMMES_FAIL,
      });
    });
};

export const getCohorts = () => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .get("/api/cohorts", config)
    .then((res) => {
      dispatch({
        type: GET_COHORTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_COHORTS_FAIL,
        paylod: err,
      });
    });
};
