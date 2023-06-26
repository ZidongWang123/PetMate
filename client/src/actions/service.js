import { FETCH_ALL, FETCH_SERVICE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, CREATE_SERVICE, UPDATE_SERVICE, DELETE_SERVICE } from '../constant/actionTypes';
import * as api from '../api';

export const getService = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchService(id);
        dispatch({ type: FETCH_SERVICE, payload: { post: data } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const getServices = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        /* const { data: { data, currentPage, numberOfPages } } = await api.fetchServices(page);
        dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } }); */

        const { data } = await api.fetchServices(page);
        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const getServicesBySearch = ({tags}) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchServicesBySearch({tags});
        dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const createService = (service) => async (dispatch) => {
    try {
        const { data } = await api.createService(service);
        dispatch({ type: CREATE_SERVICE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updateService = (id, service) => async (dispatch) => {
    try {
        const { data } = await api.updateService(id, service);
        dispatch({ type: UPDATE_SERVICE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteService = (id) => async (dispatch) => {
    try {
        await api.deleteService(id);
        dispatch({ type: DELETE_SERVICE, payload: id });
    } catch (error) {
        console.log(error);
    }
}