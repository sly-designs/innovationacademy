import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { kidsReducer } from "./kidsReducer";
import programmesReducer from "./programmesReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  kidsreducer: kidsReducer,
  programmesReducer: programmesReducer,
});

export default rootReducer;
