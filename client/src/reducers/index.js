import { combineReducers } from "redux";
import auth from "./auth";
import service from "./service";
import groups from "./group";
import createdService from "./createdService";
import createdEvent from "./createdEvent";
import event from "./event";

export default combineReducers({ auth, groups, service, createdService, event, createdEvent});