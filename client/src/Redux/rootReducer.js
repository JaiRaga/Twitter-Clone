import { combineReducers } from "redux";
import auth from "./reducers/auth";
import tweet from "./reducers/tweet";
import profile from "./reducers/profile";

const rootReducer = combineReducers({
  auth,
  tweet,
  profile
});

export default rootReducer;
