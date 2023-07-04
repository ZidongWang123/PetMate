import { combineReducers } from "redux";
import auth from "./auth";
import service from "./service";

export default combineReducers({ auth, service });
