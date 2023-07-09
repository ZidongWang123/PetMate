import {
  FETCH_ALLGROUPS,
  CREATE_GROUP,
  FETCH_GROUP,
  FETCH_MY_GROUPS,
  JOIN_GROUP,
  DELETE_GROUP,
  UPDATE_GROUP,
} from "../constant/actionTypes";
import * as api from "../api/index.js";
export const getGroups = () => async (dispatch) => {
  try {
    const { data } = await api.fetchGroups();
    console.log(data);
    /* console.log(data); */
    dispatch({ type: FETCH_ALLGROUPS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getGroup = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchGroup(id);

    dispatch({ type: FETCH_GROUP, payload: data });
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};

export const getMyGroups = () => async (dispatch) => {
  try {
    console.log("group here");
    const { data } = await api.fetchMyGroups();
    console.log(data);
    dispatch({ type: FETCH_MY_GROUPS, payload: data });
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};

export const createGroup = (group) => async (dispatch) => {
  try {
    console.log("group here");
    const { data } = await api.createGroup(group);

    console.log("api create succeed", data);
    dispatch({ type: CREATE_GROUP, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const joinGroup = (id, newMemberData) => async (dispatch) => {
  try {
    const { data } = await api.joinGroup(id, newMemberData);
    console.log("api request sends", data);
    dispatch({ type: JOIN_GROUP, payload: data });
    console.log("dispatch succeed");
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteGroup = (id) => async (dispatch) => {
  try {
    await api.deleteGroup(id);
    dispatch({ type: DELETE_GROUP, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const updateGroup = (id, groupData) => async (dispatch) => {
  try {
    const { data } = await api.updateService(id, groupData);
    dispatch({ type: UPDATE_GROUP, payload: data });
  } catch (error) {
    console.log(error);
  }
};
