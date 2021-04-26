import { combineReducers } from "redux";
import { UserReducer } from "./reducers/user";

const rootReducer = combineReducers({
  UserReducer,
});

export default rootReducer;
