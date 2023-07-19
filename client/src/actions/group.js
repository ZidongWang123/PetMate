import {
  FETCH_ALLGROUPS,
  CREATE_GROUP,
  FETCH_GROUP,
  FETCH_MY_GROUPS,
  FETCH_GROUPS_BY_SEARCH,
  JOIN_GROUP,
  DELETE_GROUP,
  UPDATE_GROUP,
  START_LOADING,
  END_LOADING,
} from "../constant/actionTypes";
import * as api from "../api/index.js";
export const getGroups = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchGroups();
    dispatch({ type: FETCH_ALLGROUPS, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getGroup = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchGroup(id);
    dispatch({ type: START_LOADING });
    dispatch({ type: FETCH_GROUP, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getMyGroups = () => async (dispatch) => {
  try {
    const { data } = await api.fetchMyGroups();
    dispatch({ type: FETCH_MY_GROUPS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getGroupsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchGroupsBySearch(searchQuery);
    dispatch({ type: FETCH_GROUPS_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createGroup = (group) => async (dispatch) => {
  try {
    const { data } = await api.createGroup(group);
    const groupId = data._id;
    dispatch({ type: CREATE_GROUP, payload: data });
    return groupId;
  } catch (error) {
    console.log("action", error);
    throw error;
  }
};

export const joinGroup = (id, newMemberData) => async (dispatch) => {
  try {
    const { data } = await api.joinGroup(id, newMemberData);
    dispatch({ type: JOIN_GROUP, payload: data });
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
    const { data } = await api.updateGroup(id, groupData);

    dispatch({ type: UPDATE_GROUP, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const addGroupPassword = (id, password) => async (dispatch) => {
  try {
    const { data } = await api.addGroupPassword(id, password);

    dispatch({ type: UPDATE_GROUP, payload: data });
  } catch (error) {
    console.log(error);
  }
};
