import { combineReducers } from "redux";
import modalReducer from "./modalReducer";
import postReducer from "./postReducer";

export default combineReducers({
  modal: modalReducer,
  post: postReducer
});
