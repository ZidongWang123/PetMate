import {
  FETCH_ALL_SERVICE,
  FETCH_ALL_CREATED_SERVICE,
  FETCH_SERVICE_SORTING,
  FETCH_SERVICE,
  FETCH_BY_SEARCH_SERVICE,
  START_LOADING,
  END_LOADING,
  CREATE_SERVICE,
  UPDATE_SERVICE,
  DELETE_SERVICE,
  FETCH_USER_SERVICE,
} from "../constant/actionTypes";
import * as api from "../api";

export const getServiceByApplication = async (id) => {
    try {
        const { data } = await api.fetchService(id);
        return { data }
    } catch (error) {
        console.log(error);
    }
}

export const getService = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchService(id);
    dispatch({ type: FETCH_SERVICE, payload: { service: data } });
  } catch (error) {
    console.log(error);
  }
};

export const getServices = (page) => async (dispatch) => {
    try {
      const { data } = await api.fetchServices(page);
      dispatch({ type: FETCH_ALL_SERVICE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  export const getServicesByUser = (userId ) => async (dispatch) => {
    try {
      const { data } = await api.fetchServicesByUser(userId);
      dispatch({ type: FETCH_ALL_CREATED_SERVICE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const getServicesBySorting = (page, sorting) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchServicesBySorting(page, sorting);

    dispatch({ type: FETCH_SERVICE_SORTING, payload: data });
    dispatch({ type: END_LOADING });
    console.log("sorting successfully", sorting);
  } catch (error) {
    console.log(error);
  }
};

export const getServicesBySearch = (input) => async (dispatch) => {
    try {
      const { data } = await api.fetchServicesBySearch(input);
      dispatch({ type: FETCH_BY_SEARCH_SERVICE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const createService = (service) => async (dispatch) => {
  try {
    const { data } = await api.createService(service);
    dispatch({ type: CREATE_SERVICE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateService = (id, service) => async (dispatch) => {
  try {
    const { data } = await api.updateService(id, service);
    dispatch({ type: UPDATE_SERVICE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteService = (id) => async (dispatch) => {
  try {
    await api.deleteService(id);
    dispatch({ type: DELETE_SERVICE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const fetchPersonalInfo = (userId) => async (dispatch)=> {
  try {
    const { data } = await api.getPersonalInfo(userId);
    dispatch({ type: FETCH_USER_SERVICE, payload: data });
    return { data };
  } catch (error) {
    console.log(error);
  }
};
