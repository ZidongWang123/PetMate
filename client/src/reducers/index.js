import { combineReducers } from "redux";
import auth from "./auth";
import groups from "./group";

export default combineReducers({ auth, groups });
