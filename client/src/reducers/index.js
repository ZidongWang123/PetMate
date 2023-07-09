import { combineReducers } from "redux";
import auth from "./auth";
import service from "./service";
import groups from "./group";
import createdService from "./createdService";

export default combineReducers({ auth, groups, service, createdService});