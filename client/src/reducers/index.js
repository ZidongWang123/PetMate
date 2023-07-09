import { combineReducers } from "redux";
import auth from "./auth";
import service from "./service";
import groups from "./group";

export default combineReducers({ auth, groups, service });